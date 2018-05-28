<?php

/**
 * Project filter form base class.
 *
 * @package    Project Name
 * @subpackage filter
 * @author     Your name here
 * @version    SVN: $Id: sfDoctrineFormFilterBaseTemplate.php 23810 2009-11-12 11:07:44Z Kris.Wallsmith $
 */
abstract class BaseFormFilterDoctrine extends sfFormFilterDoctrine
{
	  public function setup()
	  {
	  		unset($this['created_at'], $this['updated_at'], $this['file']);
	  		
	  		$this->widgetSchema->setLabels(array(
	  				"content"	=>	"Contenido"
	  		));
	  		
	  		if($this->widgetSchema['sf_guard_user_id'])
	  		{
			  		$this->widgetSchema['sf_guard_user_id']->setOption(
			  				'renderer_class',
			  				'sfWidgetFormDoctrineJQueryAutocompleter'
			  		);
			  		
			  		$this->widgetSchema['sf_guard_user_id']->setOption('renderer_options', array(
			  				'model' => 'SfGuardUser',
			  				'url'   => 'ajax/user',
			  		));
			  		
			  		$this->widgetSchema->setLabels(array(
		  				"sf_guard_user_id"	=>	"Usuario"
			  		));
	  		}
	  }
}
