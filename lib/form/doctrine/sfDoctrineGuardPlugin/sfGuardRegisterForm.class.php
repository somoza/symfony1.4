<?php

/**
 * sfGuardRegisterForm for registering new users
 *
 * @package    sfDoctrineGuardPlugin
 * @subpackage form
 * @author     Jonathan H. Wage <jonwage@gmail.com>
 * @version    SVN: $Id: BasesfGuardChangeUserPasswordForm.class.php 23536 2009-11-02 21:41:21Z Kris.Wallsmith $
 */
class sfGuardRegisterForm extends BasesfGuardRegisterForm
{
  /**
   * @see sfForm
   */
  public function configure()
  {
  }
  
  public function bind(array $taintedValues = null, array $taintedFiles = null)
    {
       
       //Solo si queremos que el usuario sea el email.
       //$taintedValues['username'] = $taintedValues['email_address'];

       parent::bind($taintedValues, $taintedFiles);
    }
}