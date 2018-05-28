<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?php include_slot('title', 'ProjectName')?></title>
<?php include_metas() ?> 
<?php include_stylesheets() ?>
<?php include_javascripts() ?>
</head>

<body>
<?php echo $sf_content ?>
<?php 
if(has_slot('after_scripts'))
{
	include_slot('after_scripts');
}	
?>
</body>
</html>
