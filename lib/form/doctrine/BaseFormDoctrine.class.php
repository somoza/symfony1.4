<?php

/**
 * Project form base class.
 *
 * @package    Project Name
 * @subpackage form
 * @author     Your name here
 * @version    SVN: $Id: sfDoctrineFormBaseTemplate.php 23810 2009-11-12 11:07:44Z Kris.Wallsmith $
 */
abstract class BaseFormDoctrine extends ahBaseFormDoctrine
{
	public function setup()
	{
		      unset($this['created_at'], $this['updated_at']);
		      
		      $this->widgetSchema->setLabels(array(
			      "content"			=>	"Contenido",
			      "file"				=>	"Archivo",
			      "sf_guard_user_id"	=>	"Usuario"
		      ));
		      
		      if($this->widgetSchema['content'])
		      {
			      $this->widgetSchema['content'] = new sfWidgetFormTextareaTinyMCE(array(
				  'config' =>
				  'theme: "advanced",
				  theme_advanced_disable: "formatselect,styleselect,code,help,anchor, cleanup",
				  theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|, bullist,numlist,|,link,unlink",
				  theme_advanced_buttons2 : "",
				  theme_advanced_buttons3 : "",
				  theme_advanced_toolbar_location : "top",
				  theme_advanced_toolbar_align : "left",
				  theme_advanced_statusbar_location : "bottom",
				  theme_advanced_resizing : true,
				  language: "es"'
			      ));
		      }
	}
	
	public function getErrors()
	{
	      $errors = array();
	
	      // individual widget errors
	      foreach ($this as $form_field)
	      {
		      if ($form_field->hasError())
		      {
			      $error_obj = $form_field->getError();
			      if ($error_obj instanceof sfValidatorErrorSchema)
			      {
				      foreach ($error_obj->getErrors() as $error)
				      {
					      // if a field has more than 1 error, it'll be over-written
					      $errors[$form_field->renderId()] = $error->getMessage();
				      }
			      }
			      else
			      {
				      $errors[$form_field->renderId()] = $error_obj->getMessage();
			      }
		      }
	      }
	
	      // global errors
	      foreach ($this->getGlobalErrors() as $validator_error)
	      {
		      $errors[] = $validator_error->getMessage();
	      }
	      return $errors;
	}
}
