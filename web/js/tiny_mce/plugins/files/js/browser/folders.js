<?php

/** This file is part of KCFinder project
  *
  *      @desc Folder related functionality
  *   @package KCFinder
  *   @version 2.1
  *    @author Pavel Tzonkov <pavelc@users.sourceforge.net>
  * @copyright 2010 KCFinder Project
  *   @license http://www.opensource.org/licenses/gpl-2.0.php GPLv2
  *   @license http://www.opensource.org/licenses/lgpl-2.1.php LGPLv2
  *      @link http://kcfinder.sunhater.com
  */?>

browser.initFolders = function() {
    $('#folders').scroll(function() {
        browser.hideDialog();
    });
    $('div.folder > a').unbind();
    $('div.folder > a').bind('click', function() {
        browser.hideDialog();
        return false;
    });
    $('div.folder > a > span.brace').unbind();
    $('div.folder > a > span.brace').click(function() {
        if ($(this).hasClass('opened') || $(this).hasClass('closed'))
            browser.expandDir($(this).parent());
    });
    $('div.folder > a > span.folder').unbind();
    $('div.folder > a > span.folder').click(function() {
        browser.changeDir($(this).parent());
    });
    $('div.folder > a > span.folder').rightClick(function(e) {
        browser.menuDir($(this).parent(), e);
    });

    if ($.browser.msie && $.browser.version &&
        (parseInt($.browser.version.substr(0, 1)) < 8)
    ) {
        var fls = $('div.folder').get();
        var body = $('body').get(0);
        var div;
        $.each(fls, function(i, folder) {
            div = document.createElement('div');
            div.style.display = 'inline';
            div.style.margin = div.style.border = div.style.padding = '0';
            div.innerHTML='<table style="border-collapse:collapse;border:0;margin:0;width:0"><tr><td nowrap="nowrap" style="white-space:nowrap;padding:0;border:0">' + $(folder).html() + "</td></tr></table>";
            body.appendChild(div);
            $(folder).css('width', $(div).innerWidth() + 'px');
            body.removeChild(div);
        });
    }
};

browser.setTreeData = function(xml, path) {
    if (!path)
        path = "";
    else if (path.length && (path.substr(path.length - 1, 1) != '/'))
        path += '/';
    var data = {
        name: xml.getElementsByTagName('name')[0].childNodes[0].nodeValue,
        readable: xml.getAttribute('readable') == 'yes',
        writable: xml.getAttribute('writable') == 'yes',
        removable: xml.getAttribute('removable') == 'yes',
        hasDirs: xml.getAttribute('hasDirs') == 'yes',
        current: xml.getAttribute('current') ? true : false
    };
    path += data.name;
    var selector = '#folders a[href="kcdir:/' + _.htmlValue(path) + '"]';
    $(selector).data({
        name: data.name,
        path: path,
        readable: data.readable,
        writable: data.writable,
        removable: data.removable,
        hasDirs: data.hasDirs
    });
    $(selector + ' span.folder').addClass(data.current ? 'current' : 'regular');
    if (xml.getElementsByTagName('dirs').length) {
        $(selector + ' span.brace').addClass('opened');
        var dirs = xml.getElementsByTagName('dirs')[0];
        $.each(dirs.childNodes, function(i, cdir) {
            browser.setTreeData(cdir, path + '/');
        });
    } else if (data.hasDirs)
        $(selector + ' span.brace').addClass('closed');
};

browser.buildTree = function(xml, path) {
    if (!path) path = "";
    var name = xml.getElementsByTagName('name')[0].childNodes[0].nodeValue;
    var hasDirs = xml.getAttribute('hasDirs') == 'yes';
    path += name;
    var html = '<div class="folder"><a href="kcdir:/' + _.htmlValue(path) + '"><span class="brace">&nbsp;</span><span class="folder">' + name + '</span></a>';
    if (xml.getElementsByTagName('dirs').length) {
        var dirs = xml.getElementsByTagName('dirs')[0];
        html += '<div class="folders">';
        $.each(dirs.childNodes, function(i, cdir) {
            html += browser.buildTree(cdir, path + '/');
        });
        html += '</div>';
    }
    html += '</div>';
    return html;
};

browser.expandDir = function(dir, callBack) {
    var path = dir.data('path');
    if (dir.children('.brace').hasClass('opened')) {
        dir.parent().children('.folders').hide(500, function() {
            if (path == browser.dir.substr(0, path.length))
                browser.changeDir(dir);
        });
        dir.children('.brace').removeClass('opened');
        dir.children('.brace').addClass('closed');
        if (callBack) callBack();
    } else {
        if (dir.parent().children('.folders').get(0)) {
            dir.parent().children('.folders').show(500);
            dir.children('.brace').removeClass('closed');
            dir.children('.brace').addClass('opened');
            if (callBack) callBack();
        } else if (!$('#loadingDirs').get(0)) {
            dir.parent().append('<div id="loadingDirs">' + this.label("Cargando carpetas...") + '</div>');
            $('#loadingDirs').css('display', 'none');
            $('#loadingDirs').show(200, function() {
                $.ajax({
                    type: 'POST',
                    url: browser.baseGetData('expand'),
                    data: {dir:path},
                    async: false,
                    success: function(xml) {
                        $('#loadingDirs').hide(200, function() {
                            $('#loadingDirs').detach();
                        });
                        if (browser.errors(xml)) return;
                        var dirs = xml.getElementsByTagName('dir');
                        var html = '';
                        var pth, name, hadDirs;
                        $.each(dirs, function(i, cdir) {
                            name = cdir.getElementsByTagName('name')[0].childNodes[0].nodeValue;
                            hasDirs = cdir.getAttribute('hasDirs') == 'yes';
                            pth = path + '/' + name;
                            html += '<div class="folder"><a href="kcdir:/' + _.htmlValue(pth) + '"><span class="brace">&nbsp;</span><span class="folder">' + name + '</span></a></div>';
                        });
                        if (html.length) {
                            dir.parent().append('<div class="folders">' + html + '</div>');
                            var folders = $(dir.parent().children('.folders').first());
                            folders.css('display', 'none');
                            $(folders).show(500);
                            $.each(dirs, function(i, cdir) {
                                browser.setTreeData(cdir, path, true);
                            });
                        }
                        if (dirs.length) {
                            dir.children('.brace').removeClass('closed');
                            dir.children('.brace').addClass('opened');
                        } else {
                            dir.children('.brace').removeClass('opened');
                            dir.children('.brace').removeClass('closed');
                        }

                        browser.initFolders();
                        if (callBack) callBack(xml);
                    },
                    error: function(request, error) {
                        $('#loadingDirs').detach();
                        alert(browser.label("Error desconocido."));
                    }
                });
            });
        }
    }
};

browser.changeDir = function(dir) {
    if (dir.children('span.folder').hasClass('regular')) {
        $('div.folder > a > span.folder').removeClass('current');
        $('div.folder > a > span.folder').removeClass('regular');
        $('div.folder > a > span.folder').addClass('regular');
        dir.children('span.folder').removeClass('regular');
        dir.children('span.folder').addClass('current');
        $('#files').html(browser.label("Cargando archivos..."));
        $.ajax({
            type: 'POST',
            url: browser.baseGetData('chDir'),
            data: {dir:dir.data('path')},
            async: false,
            success: function(xml) {
                if (browser.errors(xml)) return;
                var files = xml.getElementsByTagName('file');
                browser.loadFiles(files);
                browser.orderFiles();
                browser.dir = dir.data('path');
                var dirWritable =
                    xml.getElementsByTagName('files')[0].getAttribute('dirWritable');
                browser.dirWritable = (dirWritable == 'yes');
                var title = "KCFinder: /" + browser.dir;
                document.title = title;
                if (browser.opener.TinyMCE)
                    tinyMCEPopup.editor.windowManager.setTitle(window, title);
                browser.statusDir();
            },
            error: function(request, error) {
                $('#files').html(browser.label("Error desconocido."));
            }
        });
    }
};

browser.statusDir = function() {
    for (var i = 0, size = 0; i < this.files.length; i++)
        size += parseInt(this.files[i].size);
    size = this.humanSize(size);
    $('#fileinfo').html(this.files.length + ' ' + this.label("files") + ' (' + size + ')');
};

browser.menuDir = function(dir, e) {
    var data = dir.data();
    var html = '<div class="menu">';
    if (this.clipboard && this.clipboard.length) html +=
        '<a href="kcact:cpcbd"' + (!data.writable ? ' class="denied"' : '') + '>' + this.label("Copiar {count} archivos", {count: this.clipboard.length}) + '</a>' +
        '<a href="kcact:mvcbd"' + (!data.writable ? ' class="denied"' : '') + '>' + this.label("Mover {count} archivos", {count: this.clipboard.length}) + '</a>' +
        '<div class="delimiter"></div>';
    html +=
        '<a href="kcact:refresh">' + this.label("Recargar") + '</a>' +
        '<div class="delimiter"></div>';
    if (this.support.zip) html+=
        '<a href="kcact:download">' + this.label("Descargar") + '</a>' +
        '<div class="delimiter"></div>';
    html +=
        '<a href="kcact:mkdir"' + (!data.writable ? ' class="denied"' : '') + '>' + this.label("Nueva subcarpeta...") + '</a>' +
        '<a href="kcact:mvdir"' + (!data.removable ? ' class="denied"' : '') + '>' + this.label("Renombrar...") + '</a>' +
        '<a href="kcact:rmdir"' + (!data.removable ? ' class="denied"' : '') + '>' + this.label("Eliminar") + '</a>' +
    '</div>';
    $('#dialog').html(html);
    this.showMenu(e);
    $('div.folder > a > span.folder').removeClass('context');
    if (dir.children('span.folder').hasClass('regular'))
        dir.children('span.folder').addClass('context');

    if (this.clipboard && this.clipboard.length && data.writable) {

        $('.menu a[href="kcact:cpcbd"]').click(function() {
            browser.hideDialog();
            browser.copyClipboard(data.path);
            return false;
        });

        $('.menu a[href="kcact:mvcbd"]').click(function() {
            browser.hideDialog();
            browser.moveClipboard(data.path);
            return false;
        });
    }

    $('.menu a[href="kcact:refresh"]').click(function() {
        browser.hideDialog();
        browser.refreshDir(dir);
        return false;
    });

    $('.menu a[href="kcact:download"]').click(function() {
        browser.hideDialog();
        browser.post(browser.baseGetData('downloadDir'), {dir:data.path});
        return false;
    });

    $('.menu a[href="kcact:mkdir"]').click(function(e) {
        if (!data.writable) return false;
        browser.hideDialog();
        browser.fileNameDialog(
            e, {dir: data.path},
            'newDir', '', browser.baseGetData('newDir'), {
                title: "Nombre de la carpeta nueva:",
                errEmpty: "Por favor ingrese el nombre de la nueva carpeta.",
                errSlash: "Caracteres no soportados en el nombre de la carpeta.",
                errDot: "El nombre de la carpeta no puede comenzar con '.'"
            }, function(xml) {
                browser.refreshDir(dir);
                if (!data.hasDirs) {
                    dir.data('hasDirs', true);
                    dir.children('span.brace').addClass('closed');
                }
            }
        );
        return false;
    });

    $('.menu a[href="kcact:mvdir"]').click(function(e) {
        if (!data.removable) return false;
        browser.hideDialog();
        browser.fileNameDialog(
            e, {dir: data.path},
            'newName', data.name, browser.baseGetData('renameDir'), {
                title: "Nombre de nueva carpeta:",
                errEmpty: "Por favor ingrese el nombre de la nueva carpeta.",
                errSlash: "Caracteres no soportados en el nombre de la carpeta.",
                errDot: "El nombre de la carpeta no puede comenzar con '.'"
            }, function(xml) {
                if (!xml.getElementsByTagName('name').length) {
                    alert(browser.label("Error desconocido."));
                    return;
                }
                var name = xml.getElementsByTagName('name')[0].childNodes[0].nodeValue;
                dir.children('span.folder').html(name);
                dir.data('name', name);
                dir.data('path', _.dirname(data.path) + '/' + name);
                if (data.path == browser.dir)
                    browser.dir = dir.data('path');
            }
        );
        return false;
    });

    $('.menu a[href="kcact:rmdir"]').click(function() {
        if (!data.removable) return false;
        browser.hideDialog();
        if (confirm(browser.label(
            "Esta seguro que desea eliminar esta carpeta y todos sus contenidos?"
        ))) {
            $.ajax({
                type: 'POST',
                url: browser.baseGetData('deleteDir'),
                data: {dir:data.path},
                async: false,
                success: function(xml) {
                    if (browser.errors(xml)) return;
                    dir.parent().hide(500, function() {
                        var folders = dir.parent().parent();
                        var pDir = folders.parent().children('a').first();
                        dir.parent().detach();
                        if (!folders.children('div.folder').get(0)) {
                            pDir.children('span.brace').first().removeClass('opened');
                            pDir.children('span.brace').first().removeClass('closed');
                            pDir.parent().children('.folders').detach();
                            pDir.data('hasDirs', false);
                        }
                        if (pDir.data('path') == browser.dir.substr(0, pDir.data('path').length))
                            browser.changeDir(pDir);
                    });
                },
                error: function(request, error) {
                    alert(browser.label("Error desconocido."));
                }
            });
        }
        return false;
    });
};

browser.refreshDir = function(dir) {
    var path = dir.data('path');
    if (dir.children('.brace').hasClass('opened') || dir.children('.brace').hasClass('closed')) {
        dir.children('.brace').removeClass('opened');
        dir.children('.brace').addClass('closed');
    }
    dir.parent().children('.folders').first().detach();
    if (path == browser.dir.substr(0, path.length))
        browser.changeDir(dir);
    browser.expandDir(dir);
    return true;
};