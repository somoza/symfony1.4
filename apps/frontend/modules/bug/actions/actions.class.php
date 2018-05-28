<?php

/**
 * bug actions.
 *
 * @package    camaradecomercio
 * @subpackage bug
 * @author     $AUTHOR
 * @version    SVN: $Id: actions.class.php 23810 2009-11-12 11:07:44Z Kris.Wallsmith $
 */
class bugActions extends sfActions
{
 /**
  * Executes index action
  *
  * @param sfRequest $request A request object
  */
  public function executeSend(sfWebRequest $request)
  {
  		$form = new BugForm();
  		$form->bind($request['bug']);
  		
  		if(!$form->hasErrors())
  		{
  			$form->save();
  		}
    	die();
  }
}
