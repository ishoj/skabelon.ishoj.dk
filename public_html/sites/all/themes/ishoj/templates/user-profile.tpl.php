    <!-- PAGE START -->
    <div data-role="page"> 
      
      <!-- CONTENT START -->
      <div data-role="content"> 
                
        <!-- ARTIKEL START -->
        <section class="artikel">
          <div class="container">
            <div class="row">
              <div class="grid-two-thirds">
                <h1>Velkommen 
                <?php 

                  global $user;
                  $user_fields = user_load($user->uid);

                  if($user_fields->field_fornavn) {
                    $fornavn = $user_fields->field_fornavn['und'][0]['value'];
                    if(strpos($fornavn, " ") !== false) {
                      print strstr($fornavn, " ", true);
                    }
                    else {
                      print $fornavn;
                    }
//                    print substr($fornavn, 0, 6);
                  }

                  ?>
                  </h1>
              </div>
              <div class="grid-third">
              <?php
                
                print "<div class=\"artikel-boks\">";
                  print "<h2>Kontakt os, når du har brug for hjælp til hjemmesiden</h2>";
                  print "<h3>Når du har brug for hjælp til indhold, fx tekster, placering af indhold, struktur, menuer mv.</h3>";
                  print "<ul style=\"margin-top:0;\">";
                  print "<li>Thomas Aagaard Kjeldsen<br />Tlf. 43 57 62 29<br /><a href=\"mailto:thk@ishoj.dk\" title=\"Send en e-mail til Thomas Aagaard Kjeldsen\">thk@ishoj.dk</a></li>";
                  print "<li>Henrik Alexandersen<br />Tlf. 43 57 62 34<br /><a href=\"mailto:39456@ishoj.dk\" title=\"Send en e-mail til Henrik Alexandersen\">39456@ishoj.dk</a></li>";
                  print "</ul>";
    
                  print "<h3>Når du har spørgsmål til teknikken, fx funktionalitet, fejlmeddelelser mv.</h3>";

                  print "<ul>";
                    print "<li>Thomas Mikkel Jensen<br />Tlf. 43 57 62 04<br /><a href=\mailto:tho@ishoj.dk\" title=\"Send en e-mail til Thomas Mikkel Jensen\">tho@ishoj.dk</a></li>";
                    print "<li>Jsper Vig Meyer<br />Tlf. 43 57 62 03<br /><a href=\mailto:jvm@ishoj.dk\" title=\"Send en e-mail til Jesper Vig Meyer\">jvm@ishoj.dk</a></li>";
                  print "</ul>";

                print "</div>";
              ?>       
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

//dsm($user);


  
  
?>