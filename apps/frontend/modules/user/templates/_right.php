<?php
if(1==1)
{
?>
<h3>Acceder / Registrarse</h3>
<div class="ja-box-ct">


<div class="cd_moduletitle_logo">
	<div>

<form action="javascript:login()" method="post" name="login" id="cd_login_form_login">
<fieldset class="input">

<p id="form-login-username"><label for="modlgn_username">Usuario (DNI)</label>
<input id="modlgn_username" type="text" name="username" class="inputbox"
	title="Nombre de usuario" alt="username" size="18" value="" /></p>
<p id="form-login-password"><label for="modlgn_passwd">Contraseña</label>
<input id="modlgn_passwd" type="password" name="passwd" class="inputbox"
	size="18" title="Contraseña" alt="password" /></p>

<input type="submit" name="Submit"  title="Iniciar sesión" value="Ingresar" />
</fieldset>
	<div style="float:left; display:none " id="loader">
		<img src="images/ajax-loader.gif" /></div><div style="float:left; margin-top:10px " id="insert_response"></div>
	</div>
<br/>
<ul>
	<li><a href="usuarios/recordar" title="¿Olvidaste tus datos?">
	¿Olvidaste tus datos de acceso?</a></li>	
	<li><a href="./usuarios/registrar" title="Crear una cuenta"> Crear una
	cuenta</a></li>
</ul>
</div>

<div class="highslide-html-content" id="highslide-html-loginform">
	<div class="highslide-html-content-header">
		<div class="highslide-move" title="Mover"><a href="#" onclick="return hs.close(this)" class="control" title="Cerrar">Cerrar</a>
	</div>
</div>

</div>

</div>
</div>
<?php 
}
else
{
?>
<h3>Panel de usuario:</h3>
<div class="ja-box-ct">
	<table width="100%">
		<tr>
			<td align="center" colspan="2">
			<img  style="border: 2px solid #000000;" src="./thumbnail.php?i=images/thumbs/<?php echo ($arrUser['foto'] != "") ? $arrUser['foto'] : "no-imagen.jpg";?>&width=100&height=100&mod=file" />
			</td>
		</tr>
		<tr>
			<td width="20px"><img src="images/cd_logeado_moduletitle.png" /></td>
			<td align="left"><a href="usuarios/dashboard" title="Dashboard">Panel de control</a></td>
		</tr>
		<tr>
			<td colspan="2" height="1" style="background-color: #cccccc;"></td>
		</tr>
		<tr>
			<td><img src="images/edit.png" /></td>
			<td align="left"><a href="usuarios/perfil" title="Perfil">Mi perfil</a></td>
		</tr>
		<tr>
			<td colspan="2" height="1" style="background-color: #cccccc;"></td>
		</tr>
		<tr>
			<td><img src="images/key.png" /></td>
			<td align="left"><a href="usuarios/editar_clave" title="Modificar Clave">Modificar clave de acceso</a></td>
		</tr>
		<tr>
			<td colspan="2" height="1" style="background-color: #cccccc;"></td>
		</tr>
		<tr>
			<td><img src="images/exit.png" /></td>
			<td align="left"><a href="usuarios/salir" title="Salir del sistema">Salir</a></td>
		</tr>
		<tr>
			<td colspan="2" height="1" style="background-color: #cccccc;"></td>
		</tr>
		<tr>
			<td colspan="2"><span>Tu &uacute;ltimo login fue el <b>
			<?php 
			$oDb->query("SELECT `momento` FROM `orc_logs` WHERE `id_usuario` = ".$arrUser['id_usuario']." AND `descripcion` = 'ingresa al sistema con exito.' ORDER BY `momento` DESC LIMIT 1,2");
			$oDb->execute();
			$arrLast = $oDb->fetch();
			echo date("d-m-Y", strtotime($arrLast['momento'])); ?></b> a las <b><?php echo date("H:i", strtotime($arrLast['momento']));
			?></b> horas.</span></td>
		</tr>
	</table>
	</div>
</div>
<?php 
}
?>