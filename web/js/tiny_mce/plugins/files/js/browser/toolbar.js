<?php

/** This file is part of KCFinder project
  *
  *      @desc Toolbar functionality
  *   @package KCFinder
  *   @version 2.1
  *    @author Pavel Tzonkov <pavelc@users.sourceforge.net>
  * @copyright 2010 KCFinder Project
  *   @license http://www.opensource.org/licenses/gpl-2.0.php GPLv2
  *   @license http://www.opensource.org/licenses/lgpl-2.1.php LGPLv2
  *      @link http://kcfinder.sunhater.com
  */?>

browser.initToolbar = function() {
    $('#toolbar a').click(function() {
        browser.hideDialog();
    });

    if (!_.kuki.isSet('displaySettings'))
        _.kuki.set('displaySettings', 'off');

    if (_.kuki.get('displaySettings') == 'on') {
        $('#toolbar a[href="kcact:settings"]').addClass('selected');
        $('#settings').css('display', 'block');
        browser.resize();
    }

    $('#toolbar a[href="kcact:settings"]').click(function () {
        if ($('#settings').css('display') == 'none') {
            $(this).addClass('selected');
            _.kuki.set('displaySettings', 'on');
            $('#settings').css('display', 'block');
            browser.fixFilesHeight();
        } else {
            $(this).removeClass('selected');
            _.kuki.set('displaySettings', 'off');
            $('#settings').css('display', 'none');
            browser.fixFilesHeight();
        }
        return false;
    });

    $('#toolbar a[href="kcact:refresh"]').click(function() {
        browser.refresh();
        return false;
    });

//     if (window.opener || this.opener.TinyMCE || $('iframe', window.parent.document).get(0))
        $('#toolbar a[href="kcact:maximize"]').click(function() {
	    var iframe = $('iframe');
	    //Calculo la carpeta y archivo seleccionada para armar la ruta.
	    var strCarpeta = $("span.current").parent('a').attr("href");
	    strCarpeta = strCarpeta.replace("kcdir:/", "");

	    var strArchivo = $("div.selected div.name").text();

	    //Chequeo si el archivo es una imagen, para saber que tipo de link realizar...
	    arrExtension = strArchivo.split(".");
	    
	    //En caso que sea un archivo de tipo imagen...
	    var extension = arrExtension[arrExtension.length-1];

	    if( extension == "png" || extension == "jpg" || extension == "jpeg" || extension == "gif" || extension == "bmp")
	    {
		//Pregunto al usuario el nombre que quiere ponerle al alt.
		
		var alt_text =prompt('Ingrese un texto descriptivo de la imagen o deje vacio si no desea asignar ninguno.','');
		var strRuta = "<br/><img src='/uploads/content/"+$('#folder').val()+"/"+strCarpeta+"/"+strArchivo+"' alt='"+alt_text+"' />";
	    }
	    //En caso de que sea un archivo cualquiera.
	    else
	    {
		//Pregunto al usuario el nombre que quiere ponerle al anchor text.
		var anchor_text =prompt('Ingrese el nombre del link al archivo seleccionado.','');
		if(anchor_text == null) { anchor_text = strArchivo}
		//Pregunto si desea que el link se abra en una nueva ventana:
		var strBlank = "";
		if (confirm("¿Desea que el link se abra en una nueva ventana?\n Esto es practico en caso que el visitante tenga plugin para ver PDF o en el caso de links a imagenes.")) 
		{ 
		    strBlank = "target='_blank'";
		}

		var strRuta = "<br/><a href='/uploads/content/"+$('#folder').val()+"/"+strCarpeta+"/"+strArchivo+"' "+strBlank+">"+anchor_text+"</a>";
	    }
	    iframe = $('.mceIframeContainer iframe', window.parent.document);
	    var ed = tinyMCEPopup.editor;
	    ed.execCommand('mceInsertContent', false, strRuta, {skip_undo : 1});
	    //$(iframe).find('body').append(strRuta);
	    
	    tinyMCEPopup.close();
            return false;
        });
//     else
//         $('#toolbar a[href="kcact:maximize"]').css('display', 'none');

	$('#toolbar a[href="kcact:about"]').click(function() {
        var html = '<div class="box about">' +$('iframe', window.parent.document).contents()+
            '<div class="title">Sistema desarrollado por KCFinder e implementado en TinyMCE por <a href="http://animus.com.ar" target="_blank">ANIMUS powered by KCFinder</a></div>' +
            '<div>Licensia: GPLv2 & LGPLv2</div>' +
            '<div>Copyright &copy;2010 Pavel Tzonkov</div>' +
            '<button>' + _.htmlValue(browser.label("OK")) + '</button>' +
        '</div>';
        $('#dialog').html(html);
        browser.showDialog();
        $('#dialog button').get(0).focus();
        var close = function() {
            browser.hideDialog();
            browser.unshadow();
        }
        $('#dialog button').click(close);
        $('#dialog button').keypress(function(e) {
            if (e.keyCode == 27) close();
        });
        $('#dialog').unbind();
        return false;
    });

    this.initUploadButton();
};

browser.initUploadButton = function() {
    var btn = $('#toolbar a[href="kcact:upload"]');
    var top = btn.get(0).offsetTop;
    var width = btn.outerWidth();
    var height = btn.outerHeight();
    $('#toolbar').prepend('<div id="upload" style="top:' + top + 'px;width:' + width + 'px;height:' + height + 'px">' +
        '<form enctype="multipart/form-data" method="post" target="uploadResponse" action="' + browser.baseGetData('upload') + '">' +
            '<input type="file" name="upload" onchange="browser.uploadFile(this.form)" style="height:' + height + 'px" />' +
            '<input type="hidden" name="dir" value="" />' +
        '</form>' +
    '</div>');
    $('#upload input').css('margin-left', "-" + ($('#upload input').outerWidth() - width) + "px");
    $('#upload').mouseover(function() {
        $('#toolbar a[href="kcact:upload"]').addClass('hover');
    });
    $('#upload').mouseout(function() {
        $('#toolbar a[href="kcact:upload"]').removeClass('hover');
    });
};

browser.uploadFile = function(form) {
    if (!this.dirWritable) {
        alert(this.label("No se puede subir el archivo."));
        $('#upload').detach();
        browser.initUploadButton();
        return;
    }
    form.elements[1].value = browser.dir;
    $('<iframe id="uploadResponse" name="uploadResponse" src="javascript:;"></iframe>').prependTo(document.body);
    $('#loading').html(this.label("Subiendo archivo..."));
    $('#loading').css('display', 'inline');
    form.submit();
    $('#uploadResponse').load(function() {
        var response = $(this).contents().find('body').html();
        $('#loading').css('display', 'none');
        if (response.length && response.substr(0, 1) != '/')
            alert(response);
        else
            browser.refresh(response.substr(1, response.length - 1));
        $('#upload').detach();
        setTimeout(function() {
            $('#uploadResponse').detach();
        }, 1);
        browser.initUploadButton();
    });
};

browser.maximize = function(button) {
    if (window.opener) {
        window.moveTo(0, 0);
        width = screen.availWidth;
        height = screen.availHeight;
        if ($.browser.opera)
            height -= 50;
        window.resizeTo(width, height);

    } else if (browser.opener.TinyMCE) {
        var win, ifr, id;

        $('iframe', window.parent.document).each(function() {
            if (/^mce_\d+_ifr$/.test($(this).attr('id'))) {
                id = parseInt($(this).attr('id').replace(/^mce_(\d+)_ifr$/, "$1"));
                win = $('#mce_' + id, window.parent.document);
                ifr = $('#mce_' + id + '_ifr', window.parent.document);
            }
        });

        if ($(button).hasClass('selected')) {
            $(button).removeClass('selected');
            win.css('left', browser.maximizeMCE.left + 'px');
            win.css('top', browser.maximizeMCE.top + 'px');
            win.css('width', browser.maximizeMCE.width + 'px');
            win.css('height', browser.maximizeMCE.height + 'px');
            ifr.css('width', browser.maximizeMCE.width - browser.maximizeMCE.Hspace + 'px');
            ifr.css('height', browser.maximizeMCE.height - browser.maximizeMCE.Vspace + 'px');

        } else {
            $(button).addClass('selected')
            browser.maximizeMCE = {
                width: _.nopx(win.css('width')),
                height: _.nopx(win.css('height')),
                left: win.position().left,
                top: win.position().top,
                Hspace: _.nopx(win.css('width')) - _.nopx(ifr.css('width')),
                Vspace: _.nopx(win.css('height')) - _.nopx(ifr.css('height'))
            };
            var width = $(window.parent).width();
            var height = $(window.parent).height();
            win.css('left', $(window.parent).scrollLeft() + 'px');
            win.css('top', $(window.parent).scrollTop() + 'px');
            win.css('width', width + 'px');
            win.css('height', height + 'px');
            ifr.css('width', width - browser.maximizeMCE.Hspace + 'px');
            ifr.css('height', height - browser.maximizeMCE.Vspace + 'px');
        }

    } else if ($('iframe', window.parent.document).get(0)) {
        var ifrm = $('iframe[name="' + window.name + '"]', window.parent.document);
        var parent = ifrm.parent();
        var width, height;
        if ($(button).hasClass('selected')) {
            $(button).removeClass('selected');
            if (browser.maximizeThread) {
                clearInterval(browser.maximizeThread);
                browser.maximizeThread = null;
            }
            if (browser.maximizeW) browser.maximizeW = null;
            if (browser.maximizeH) browser.maximizeH = null;
            $.each($('*', window.parent.document).get(), function(i, e) {
                e.style.display = browser.maximizeDisplay[i];
            });
            ifrm.css('display', browser.maximizeCSS.display);
            ifrm.css('position', browser.maximizeCSS.position);
            ifrm.css('left', browser.maximizeCSS.left);
            ifrm.css('top', browser.maximizeCSS.top);
            ifrm.css('width', browser.maximizeCSS.width);
            ifrm.css('height', browser.maximizeCSS.height);
            $(window.parent).scrollLeft(browser.maximizeLest);
            $(window.parent).scrollTop(browser.maximizeTop);

        } else {
            $(button).addClass('selected');
            browser.maximizeCSS = {
                display: ifrm.css('display'),
                position: ifrm.css('position'),
                left: ifrm.css('left'),
                top: ifrm.css('top'),
                width: ifrm.outerWidth() + 'px',
                height: ifrm.outerHeight() + 'px'
            };
            browser.maximizeTop = $(window.parent).scrollTop();
            browser.maximizeLeft = $(window.parent).scrollLeft();
            browser.maximizeDisplay = [];
            $.each($('*', window.parent.document).get(), function(i, e) {
                browser.maximizeDisplay[i] = $(e).css('display');
                $(e).css('display', 'none');
            });

            ifrm.css('display', 'block');
            ifrm.parents().css('display', 'block');
            var resize = function() {
                width = $(window.parent).width();
                height = $(window.parent).height();
                if (!browser.maximizeW || (browser.maximizeW != width) ||
                    !browser.maximizeH || (browser.maximizeH != height)
                ) {
                    browser.maximizeW = width;
                    browser.maximizeH = height;
                    ifrm.css('width', width + 'px');
                    ifrm.css('height', height + 'px');
                    browser.resize();
                }
            }
            ifrm.css('position', 'absolute');
            if ((ifrm.offset().left == ifrm.position().left) &&
                (ifrm.offset().top == ifrm.position().top)
            ) {
                ifrm.css('left', '0');
                ifrm.css('top', '0');
            } else {
                ifrm.css('left', - ifrm.offset().left +'px');
                ifrm.css('top', - ifrm.offset().top + 'px');
            }
            resize();
            browser.maximizeThread = setInterval(resize, 250);
        }
    }
};

browser.refresh = function(selected) {
    this.fadeFiles();
    $.ajax({
        type: 'POST',
        url: browser.baseGetData('chDir'),
        data: {dir:browser.dir},
        async: false,
        success: function(xml) {
            if (browser.errors(xml)) return;
            var files = xml.getElementsByTagName('file');
            var dirWritable =
                xml.getElementsByTagName('files')[0].getAttribute('dirWritable');
            browser.dirWritable = (dirWritable == 'yes');
            browser.loadFiles(files);
            browser.orderFiles(null, selected);
            browser.statusDir();
        },
        error: function(request, error) {
            $('#files > div').css({opacity:'', filter:''});
            $('#files').html(browser.label("Error desconocido."));
        }
    });
};
