<?php

/**
 * consultation actions.
 *
 * @package    dragones
 * @subpackage consultation
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 23810 2009-11-12 11:07:44Z Kris.Wallsmith $
 */
class ajaxActions extends sfActions
{
    public function executeUser(sfWebRequest $request)
    {
	$this->getResponse()->setContentType('application/json');
	$user = sfGuardUserTable::getInstance()->findUser($request->getParameter('q'), $request->getParameter('limit'));
    	return $this->renderText(json_encode($user));
		
    }    
}
