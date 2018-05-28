<?php
class acWebDebugPanelReport extends sfWebDebugPanel
{
	public function getTitle()
	{
		return '<img src="/images/report.png" alt="Report Shortcuts" height="16" width="16" /> Reportar bug';
	}

	public function getPanelTitle()
	{
		return 'Reportar un error';
	}

	public function getPanelContent()
	{
		$parameters = $this->webDebug->getOption('request_parameters');
		$form = new BugForm();
		$context = sfContext::getInstance();
		
		$content = '<div id="bug_content">Descripción del error o corrección:<br/>';
		$content .= '<form action="" method="post" id="sf_form_bug">';
		$content .= $form['comment'];
		$content .= $form['_csrf_token']->render();
		$content .= '<input type="hidden" name="bug[module]" value="'.$context->getModuleName().'" />';
		$content .= '<input type="hidden" name="bug[action]" value="'.$context->getActionName().'" />';
		$content .= '<input type="hidden" name="bug[url]" value="'.$_SERVER['REQUEST_URI'].'" />';
		$content .= '<br/><input type="button" value="Enviar reporte" id="sf_enviar_bug" /></form></div>';
		
		$content .= '
		<script>
		if(!window.jQuery)
		{
		   var script = document.createElement("script");
		   script.type = "text/javascript";
		   script.src = "/sfJqueryReloadedPlugin/js/jquery-1.3.2.min.js";
		   document.getElementsByTagName("head")[0].appendChild(script);
		}

		$("#sf_enviar_bug").click(function()
		{
		  $.post("/'.sfContext::getInstance()->getConfiguration()->getApplication().'_dev.php/send-bug", $("#sf_form_bug").serialize());
		  $("#bug_content form").fadeOut();
		  $("#bug_content").html("<b>Error enviado con éxito, muchas gracias!</b><br/><br/>Si olvido reportar otro error en esta sección presion F5<br/><br/>");
		});
		</script>
		';
		return $content;
	}
	
	public static function listenToLoadDebugWebPanelEvent(sfEvent $event)
	{
		$event->getSubject()->setPanel(
				'report',
				new self($event->getSubject())
		);
	}
}