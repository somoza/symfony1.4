<?php

require_once dirname(__FILE__).'/../lib/bugGeneratorConfiguration.class.php';
require_once dirname(__FILE__).'/../lib/bugGeneratorHelper.class.php';

/**
 * bug actions.
 *
 * @package    Project Name
 * @subpackage bug
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 23810 2009-11-12 11:07:44Z Kris.Wallsmith $
 */
class bugActions extends autoBugActions
{
	public function executeSend(sfWebRequest $request)
	{
		$form = new BugForm();
		$form->bind($request['bug']);
		var_dump($form->getErrors());
		if(!$form->hasErrors())
		{
			$form->save();
		}
		die();
	}
	
	public function executeSolve(sfWebRequest $request)
	{
		$bug = BugTable::getInstance()->findOneById($request['id']);
		$bug->setIsSolved(1);
		$bug->save();
		
		die();
	}
	
	public function getBaseQuery()
	{
	      $bug = new Bug();
	      
	      return $bug->createQuery('b')
	      ->where('is_solved = 1');
	}
	
	protected function getPager()
	{
	  $pager = $this->configuration->getPager('bug');
	  $pager->setQuery($this->buildQuery()->addWhere('is_solved != 1'));
	  $pager->setPage($this->getPage());
	  $pager->init();

	  return $pager;
	}
}
