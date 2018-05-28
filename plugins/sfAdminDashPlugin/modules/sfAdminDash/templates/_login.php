<?php 
use_helper('I18N'); 
?>
<div id="login-holder">

	<div id="logo-login">
		<img src="/images/logo.png"  height="40" alt="" />
	</div>
	
	<div class="clear"></div>
	
	<div id="loginbox">
	
		<div id="login-inner">
			<form name="login" action="" method="post">
				<table border="0" cellpadding="0" cellspacing="0">
					<tr>
						<th><?php echo $form['username']->renderLabel(__('Username', array(), 'sf_admin_dash')); ?></th>
						<td>
						<?php echo $form['username']->renderError(); ?>
		            	<?php echo $form['username']->render(array('class' => 'login-inp')); ?>
						</td>
					</tr>
					<tr>
						<th><?php echo $form['password']->renderLabel(__('Password', array(), 'sf_admin_dash')); ?></th>
						<td>
						<?php echo $form['password']->renderError(); ?>
		            	<?php echo $form['password']->render(array('class' => 'login-inp', 'onfocus'=>'this.value=""', 'value'=>'************')); ?>
						</td>
					</tr>
					<tr>
						<th></th>
						<td valign="top">
							<?php echo $form['remember']->renderError(); ?>
			            	<?php echo $form['remember']->render(array('class'=>'checkbox-size', 'id'=>'login-check')); ?>
							<?php echo $form['remember']->renderLabel(__('Remember me', array(), 'sf_admin_dash')); ?>
						</td>
					</tr>
					<tr>
						<th></th>
						<td><input id="login" type="submit" class="submit-login" value="<?php echo __('Login', array(), 'sf_admin_dash'); ?>"  /></td>
					</tr>
					<tr>
						<td colspan="2">
							<table id="loading">
								<tr>
									<td align="right"><img src="/images/ajax-loader.gif" /></td>
									<td><label><?php echo __('Working') ?></label></td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</form>
		</div>
	<div class="clear"></div>
	<!-- <a href="" class="forgot-pwd"><?php echo __('Forgot Password?'); ?></a> -->
 </div>
 
	<!--  <div id="forgotbox">
		<div id="forgotbox-text">Please send us your email and we'll reset your password.</div>
		<div id="forgot-inner">
		<table border="0" cellpadding="0" cellspacing="0">
		<tr>
			<th>Email address:</th>
			<td><input type="text" value=""   class="login-inp" /></td>
		</tr>
		<tr>
			<th> </th>
			<td><input type="button" class="submit-login"  /></td>
		</tr>
		</table>
		</div>
		<div class="clear"></div>
		<a href="" class="back-login">Back to login</a>
	</div>-->

</div>
<link rel="stylesheet" href="/css/screen.css" type="text/css" media="screen" title="default" />
<!--  jquery core -->
<script src="/js/jquery/jquery-1.4.1.min.js" type="text/javascript"></script>

<!-- Custom jquery scripts -->
<script src="/js/jquery/custom_jquery.js" type="text/javascript"></script>

<!-- MUST BE THE LAST SCRIPT IN <HEAD></HEAD></HEAD> png fix -->
<script src="/js/jquery/jquery.pngFix.pack.js" type="text/javascript"></script>
<script type="text/javascript">
$(document).pngFix();

document.login.onsubmit = function()
{
	var pass =  $('#signin_password').val();
	$('#signin_password').val('**********************');
	$('#loading').show();
	
	var remember = 0;
	if($('#login-check').attr('checked'))
	{
		remember = 1;
	}
	
	
	$.ajax(
	{
	  type: "POST",
	  url: "<?php echo url_for(sfAdminDash::getProperty('login_route', '@sf_guard_signin')); ?>",
	  data: { "signin[username]": $('#signin_username').val(), "signin[password]":pass, "signin[remember]": remember },
	  success : function( msg ) 
	  {
		if(msg == 'true')
		{
			$('#loading').html('<label><?php echo __('Redirecting') ?></label>');
			document.location = <?php echo url_for('@homepage') ?>
		}
		else
		{
			$('#loading').html('<label><?php echo __('Username or Password incorrect.') ?></label>');
		}
	  }
	});
	
  	return false;
}

$('#forgot').click(function()
{	
	$.ajax(
	{
	  type: "POST",
	  url: "<?php echo url_for(sfAdminDash::getProperty('login_route', '@sf_guard_forgot_password')); ?>",
	  data: { "signin[username]": $('#signin_username').val(), "signin[password]":pass, "signin[remember]": remember },
	  success : function( msg ) 
	  {
		if(msg == 'true')
		{
			$('#loading').html('<label><?php echo __('Redirecting') ?></label>');
			document.location = <?php echo url_for('@homepage') ?>
		}
		else
		{
			$('#loading').html('<label><?php echo __('Username or Password incorrect.') ?></label>');
		}
	  }
	});
});

$('#signin_username').focus();
</script>