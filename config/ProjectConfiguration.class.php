<?php

require_once dirname(__FILE__).'/../lib/vendor/symfony/lib/autoload/sfCoreAutoload.class.php';
sfCoreAutoload::register();

class ProjectConfiguration extends sfProjectConfiguration
{
  public function setup()
  {
    $this->enablePlugins('sfDoctrinePlugin');
    $this->enablePlugins('sfThumbnailPlugin');
    $this->enablePlugins('sfAdminDashPlugin');

    sfValidatorBase::setDefaultMessage('required', 'This field is required');
    sfValidatorBase::setDefaultMessage('invalid', 'The value entered is invalid');
    $this->enablePlugins('csDoctrineActAsSortablePlugin');
    $this->enablePlugins('sfFormExtraPlugin');
    $this->enablePlugins('sfDoctrineGuardPlugin');
    $this->enablePlugins('sfAdminThemejRollerPlugin');
    $this->enablePlugins('sfImageTransformPlugin');
    $this->enablePlugins('ahDoctrineEasyEmbeddedRelationsPlugin');
    
    // $this->dispatcher->connect('debug.web.load_panels', array(
		  //   'acWebDebugPanelReport',
		  //   'listenToLoadDebugWebPanelEvent'
    // ));
  }
}
