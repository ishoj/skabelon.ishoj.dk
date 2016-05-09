<?php
/**
 * @file
 * ishoj_info_side.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function ishoj_info_side_field_group_info() {
  $export = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_faner|node|info_side|form';
  $field_group->group_name = 'group_faner';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'info_side';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'FANER',
    'weight' => '0',
    'children' => array(
      0 => 'group_tekstindhold',
      1 => 'group_foto',
      2 => 'group_indstillinger',
    ),
    'format_type' => 'htabs',
    'format_settings' => array(
      'formatter' => '',
      'instance_settings' => array(
        'classes' => '',
      ),
    ),
  );
  $export['group_faner|node|info_side|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_foto|node|info_side|form';
  $field_group->group_name = 'group_foto';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'info_side';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_faner';
  $field_group->data = array(
    'label' => 'Foto/grafik',
    'weight' => '12',
    'children' => array(
      0 => 'field_infotv_foto',
    ),
    'format_type' => 'htab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_foto|node|info_side|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_indstillinger|node|info_side|form';
  $field_group->group_name = 'group_indstillinger';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'info_side';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_faner';
  $field_group->data = array(
    'label' => 'Indstillinger',
    'weight' => '13',
    'children' => array(
      0 => 'field_info_afspiller',
      1 => 'field_infotv_skabelon',
      2 => 'field_forside',
    ),
    'format_type' => 'htab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_indstillinger|node|info_side|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_tekstindhold|node|info_side|form';
  $field_group->group_name = 'group_tekstindhold';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'info_side';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_faner';
  $field_group->data = array(
    'label' => 'Tekstindhold',
    'weight' => '11',
    'children' => array(
      0 => 'body',
      1 => 'field_infotv_laes_mere',
      2 => 'title',
    ),
    'format_type' => 'htab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_tekstindhold|node|info_side|form'] = $field_group;

  return $export;
}
