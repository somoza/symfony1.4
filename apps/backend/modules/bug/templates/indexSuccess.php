<?php use_helper('I18N', 'Date') ?>
<?php include_partial('bug/assets') ?>

<div id="sf_admin_container">
  <?php include_partial('bug/flashes') ?>

  <div id="sf_admin_header">
    <?php include_partial('bug/list_header', array('pager' => $pager)) ?>
  </div>

      <div id="sf_admin_bar ui-helper-hidden" style="display:none">
      <?php include_partial('bug/filters', array('form' => $filters, 'configuration' => $configuration)) ?>
    </div>
  
  <div id="sf_admin_content">
          <form action="<?php echo url_for('bug_collection', array('action' => 'batch')) ?>" method="post" id="sf_admin_content_form">
    
      <div class="sf_admin_actions_block floatleft">
      	<a tabindex="0" href="#sf_admin_actions_menu" class="fg-button fg-button-icon-right ui-widget ui-state-default ui-corner-all" id="sf_admin_actions_button">
      	  <span class="ui-icon ui-icon-triangle-1-s"></span>
      	  <?php echo __('Actions') ?>
      	</a>
      	<div id="sf_admin_actions_menu" class="ui-helper-hidden fg-menu fg-menu-has-icons">
      		<ul class="sf_admin_actions" id="sf_admin_actions_menu_list">
      			<?php include_partial('bug/list_actions', array('helper' => $helper)) ?>
      		</ul>
      	</div>
      </div>

      <?php include_partial('bug/list', array('pager' => $pager, 'sort' => $sort, 'helper' => $helper, 'hasFilters' => $hasFilters)) ?>

      <ul class="sf_admin_actions">
        <?php include_partial('bug/list_batch_actions', array('helper' => $helper)) ?>
      </ul>

          </form>
      </div>

  <div id="sf_admin_footer">
    <?php include_partial('bug/list_footer', array('pager' => $pager)) ?>
  </div>

  <?php include_partial('bug/themeswitcher') ?>
</div>
<script>
$('.solve').click(function()
{
    var id = $(this).attr('id').split('-');
    id = id[1];
    var clicked = $(this);
    $.ajax({
      type: "POST",
      url: "<?php echo url_for('@bug_solve') ?>",
      data: "status=1&id="+id,
      success: function(msg)
      {
	  $(clicked).parent().parent().fadeOut();
      }
    });
});
</script>
