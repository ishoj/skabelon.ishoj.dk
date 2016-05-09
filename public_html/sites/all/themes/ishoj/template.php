<?php

/************************/
/*** PREPROCESS THEME ***/
/************************/
function ishoj_theme() {

  // Theming af user login, se http://dannyenglander.com/blog/customizing-user-login-page-drupal-7
  $items = array();
  // create custom user-login.tpl.php
  $items['user_login'] = array(
    'render element' => 'form',
    'path' => drupal_get_path('theme', 'ishoj') . '/templates',
      'template' => 'user-login',
      'preprocess functions' => array(
      'ishoj_preprocess_user_login'
      ),
    );
  return $items;
}


/***********************/
/*** PREPROCESS HTML ***/
/***********************/
function ishoj_preprocess_html(&$vars) {

}


/***********************/
/*** PREPROCESS PAGE ***/
/***********************/
function ishoj_preprocess_page(&$variables) {

  // Fjerner "There is currently no content classified with this term."
  if(isset($variables['page']['content']['system_main']['no_content'])) {
    unset($variables['page']['content']['system_main']['no_content']);
  }

  // Fjerner node-indlæsningen fra teaxonomier
  // http://www.wardontheweb.com/remove-node-lists-from-taxonomy-pages-in-drupal-7/
  if(arg(0) == "taxonomy" and arg(1) == "term") {
      $variables['page']['content']['system_main']['nodes'] = null;
  }

  // Hvis brugeren er logget på (webredaktør-rolle)
  if($variables['logged_in']) {
    // Indlæs editor.css
    drupal_add_css (path_to_theme() . '/dist/styles/editor.css', array('type' => 'file'));
    // Indlæs editor.js
    drupal_add_js(drupal_get_path('theme', 'ishoj') . '/static/scripts/editor.js');
  }

  $node = &$variables['node'];
  // MIKS MINIMAP
  // Tilføjer javascript på noder af typen, os2web_base_contentpage, hvor der er indtastet noget i feltet, Kort
  if($node->type == 'os2web_base_contentpage') {
    $field_items = field_get_items('node', $node, 'field_kort');
    if(isset($field_items[0])) {
      drupal_add_js('http://webkort.ishoj.dk/clientapi/minimap2/2.4.x/minimap.js', array(
        // 'group' => JS_THEME,
        // 'preprocess' => TRUE,
        'scope' => 'footer',
        'weight' => '9999',
        )
      );
    }
  }

}


/***********************/
/*** PREPROCESS NODE ***/
/***********************/
function ishoj_preprocess_node(&$variables) {

  // Tilføjer scripts for bestemte indholdstyper (https://www.drupal.org/node/2291369)
  $node = &$variables['node'];
  if(($node->type == 'thomas_tester') or
     ($node->type == 'os2web_base_contentpage') or
     ($node->type == 'os2web_borger_dk_article')){
    drupal_add_js(path_to_theme() . '/static//scripts/google-maps.js', array(
      'group' => JS_THEME,
      'preprocess' => TRUE,
      'scope' => 'footer',
      'weight' => '999',
      )
    );
  }
  $js  = &$variables['js'];
  $css = &$variables['css'];

}

/*************************/
/*** hook_form_alter() ***/
/*************************/
//https://api.drupal.org/api/drupal/modules%21system%21system.api.php/function/hook_form_alter/7
function ishoj_form_alter(&$form, &$form_state, $form_id) {
  if ($form['#id'] == 'user-login') {
    $form['name']['#description'] = t(''); // Clear the description of name
    $form['pass']['#description'] = t(''); // Clear the description of pass
  }
}


/************************/
/*** hook_css_alter() ***/
/************************/
function ishoj_css_alter(&$css) {
  unset($css[drupal_get_path('module', 'os2web_borger_dk') . '/css/os2web_borger_dk.css']);
}


/************************/
/*** hook_js_alter() ***/
/************************/
function ishoj_js_alter(&$javascript) {
  unset($javascript[drupal_get_path('module', 'os2web_borger_dk') . '/js/os2web_borger_dk.js']);
}


/*******************/
/*** BREADCRUMBS ***/
/*******************/
function ishoj_breadcrumb($variables) {
  $breadcrumb = $variables['breadcrumb'];

  if (!empty($breadcrumb)) {
//	$breadcrumb[0] = '<a href="/" title="Gå til forsiden">' . t("Service") . '</a>';
	$breadcrumb[0] = '<a href="/" title="Gå til forsiden">Forside</a>';
    //array_shift($breadcrumb); // Removes the Home item

    $output = implode(' / ', $breadcrumb);
    return $output;
  }
}

/**************/
/*** PANELS ***/
/**************/
function ishoj_panels_default_style_render_region($variables) {
  // Fjerner <div class="panel-separator"></div> i outputtet
    $output = '';
    $output .= implode('', $variables['panes']);
    return $output;
}
