<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <head>
     	<script type="text/javascript" src="/sfAdminThemejRollerPlugin/js/jquery.min.js"></script>
        <?php include_http_metas() ?>
        <?php include_metas() ?>
        <title><?php echo sfConfig::get('app_site_name') ?></title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <?php include_stylesheets() ?>
        <?php include_javascripts() ?>
    </head>
    <body id="login-bg">
        <?php include_component('sfAdminDash','header'); ?>
        <?php echo $sf_content ?>
        <?php include_partial('sfAdminDash/footer'); ?>
    </body>
</html>
