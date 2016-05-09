


    <!-- PAGE START -->
    <div data-role="page"> 
      
      <!-- CONTENT START -->
      <div data-role="content"> 
                
        <!-- ARTIKEL START -->
        <section class="artikel">
          <div class="container">
            <div class="row">
              <div class="grid-half">
                <h1>Login</h1>
              </div>
            </div>
            <div class="row">
              <div class="grid-half">
                <div class="bruger-login">
<?php

//    print drupal_render_children($form); 

    print drupal_render($form['name']);
    print drupal_render($form['pass']);
    print drupal_render($form['form_build_id']);
    print drupal_render($form['form_id']);
    print drupal_render($form['actions']);

?>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- ARTIKEL SLUT -->
        
      </div>
      <!-- CONTENT SLUT -->
      
    </div>
    <!-- PAGE SLUT -->


<?php

/* print the variables if needed to allow for 
  individual field theming or breaking them up. */
//  print '<pre>';
//  print_r($variables);
//  print '</pre>';


?>