<?php
/**
 * @file
 * ishoj_info_side.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function ishoj_info_side_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "field_group" && $api == "field_group") {
    return array("version" => "1");
  }
  list($module, $api) = func_get_args();
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function ishoj_info_side_node_info() {
  $items = array(
    'info_side' => array(
      'name' => t('Info-side'),
      'base' => 'node_content',
      'description' => t('Indholdstype til info-tv'),
      'has_title' => '1',
      'title_label' => t('Overskrift'),
      'help' => '',
    ),
  );
  return $items;
}
