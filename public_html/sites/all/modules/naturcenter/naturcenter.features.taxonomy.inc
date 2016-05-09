<?php
/**
 * @file
 * naturcenter.features.taxonomy.inc
 */

/**
 * Implements hook_taxonomy_default_vocabularies().
 */
function naturcenter_taxonomy_default_vocabularies() {
  return array(
    'ture_ish_j_naturcenter' => array(
      'name' => 'Ture Ishøj Naturcenter',
      'machine_name' => 'ture_ish_j_naturcenter',
      'description' => '',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => 0,
      'rdf_mapping' => array(
        'rdftype' => array(
          0 => 'skos:ConceptScheme',
        ),
        'name' => array(
          'predicates' => array(
            0 => 'dc:title',
          ),
        ),
        'description' => array(
          'predicates' => array(
            0 => 'rdfs:comment',
          ),
        ),
      ),
    ),
  );
}
