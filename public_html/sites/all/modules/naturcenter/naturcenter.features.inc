<?php
/**
 * @file
 * naturcenter.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function naturcenter_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function naturcenter_node_info() {
  $items = array(
    'ture_ish_j_naturcenter' => array(
      'name' => t('Ture Ishøj Naturcenter'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}
