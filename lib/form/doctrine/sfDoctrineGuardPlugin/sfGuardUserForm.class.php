<?php

/**
 * sfGuardUser form.
 *
 * @package    Bariloche.com.ar
 * @subpackage form
 * @author     julian[at]animus.com.ar
 * @version    SVN: $Id: sfDoctrinePluginFormTemplate.php 23810 2009-11-12 11:07:44Z Kris.Wallsmith $
 */
class sfGuardUserForm extends PluginsfGuardUserForm
{
	public function configure()
	{
		$this['groups_list']->getWidget()->setLabel('Grupos');
		$this['permissions_list']->getWidget()->setLabel('Permisos');
	}
}