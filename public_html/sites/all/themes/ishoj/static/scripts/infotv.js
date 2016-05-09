  (function($) {
	
	
      /*************************/
      /***** INFO-TV MOTOR *****/
      /*************************/
      $(window).load(function(){

        var durationArray = [];
        var durationDefault = 10000; 
        var indexCurrentSlide = 0;
        var timerDelay = false;
        var autoAdvancingTimeout = null;
        var autoAdvancing = false;
        var sliderCounts = 0;
        var animationStartArray = [];
        var animationEndArray = [];
        var fadeDuration = 600;
        var reloadMe = false;
        var reloadPageMinutes = 0.05; // default = 5
        var slidesHTML = "";
        var slidesHTML_overlay = "";

        
        function reloadPage(i) {
          if(reloadMe || i) {
            // http://api.jquery.com/jquery.get/
            var jqxhr = $.get((window.location + '?hash=' + Math.random()), {timeout:5000, dataType:"json"},  function() {

//              if(jqxhr.responseText.indexOf('<div class="flexslider">') != -1) { // Hvis det returnerede indholder strengen, så reload indhold
//                location.reload(true);
//              }

            })
              // HVIS DET INGEN FEJL ER
              .done(function() {
                
                // Henter det nye indhold og stripper unødvendigt output 
                var res = jqxhr.responseText;
                
                // Info-tv indhold
                var s = res.substring(res.indexOf('<!-- info-tv start -->'));
                s = s.substr(0, s.indexOf('<!-- info-tv slut -->')) + '<!-- info-tv slut -->';
                
                // Overlay indhold
                var s_overlay = res.substring(res.indexOf('<!-- overlay-bottom start -->'));
                s_overlay = s_overlay.substr(0, s_overlay.indexOf('<!-- overlay-bottom slut -->')) + '<!-- overlay-bottom slut -->';
                
                // KUN FØRSTE GENNEMLØB 
                if(i) { 
                  slidesHTML = s;  
                  slidesHTML_overlay = s_overlay;  
//                  console.log("\n\nslidesHTML = " + slidesHTML);
//                  console.log("\n\nslidesHTML_overlay = " + slidesHTML_overlay);
                }
                
                // HVIS slideHTML OG s IKKE ER ENS 
                // ELLER HVIS slidesHTML_overlay OG s_overlay IKKE ER ENS, 
                // ER DER NYT INDHOLD (OGSÅ VED FØRSTE GENNEMLØB)
                if( (slidesHTML.localeCompare(s) != 0)  || (slidesHTML_overlay.localeCompare(s_overlay) != 0) || i ) {
//                if((slidesHTML.localeCompare(s) != 0) || i) {
                  /* stringA.localeCompare(stringB)
                  Returns:
                   0:  exact match
                  -1:  string_a < string_b
                   1:  string_b > string_b
                  */
                  
                  if(i) {
                    console.log("\n\nFlexslider starter op");
                    // FJERNER SPINNER
                    setTimeout(function (){ 
                      $(".spinner").remove();
                    }, 300);               
                  }
                  else {
                    console.log("\n\nÆndring af indhold - Flexslider starter forfra");
                  }
                  
                  // HVERT GENNEMLØB (DOG IKKE FØRSTE)
                  if(!i) {
                    // SLET FLEXSLIDER
                    deleteFlexslider();
                  }
                  
                  // START FLEXSLIDER
                  setTimeout(function (){ 

                    // INITIALISERING AF VARIABLER
                    initVars();
                    // TILFØJ INDHOLDET TIL KLASSEN .slides
                    $(".slides ").html(s);

                    setTimeout(function (){ 
                      // INITIALISERING AF SLIDES
                      initSlideArray();

                      setTimeout(function (){ 
                        // OPRET FLEXSLIDER
                        newFlexslider();
                        showSlider();
                        slidesHTML = s;  
                        
                        // TILFØJ OVERLAY-INDHOLDET TIL KLASSEN .overlay_bottom
                        $(".overlay_bottom ").html(s_overlay);
                        slidesHTML_overlay = s_overlay;  

                      }, 200);

                    }, 200);

                  }, 200);

                }
                else {
                  console.log("\n\nIngen ændring af indhold - Flexslider fortsætter");                
                }
                
                // SKJULER IKONET FOR NETVÆRKSFEJL
                if($(".error").hasClass("action")) {
                  $(".error").removeClass("action");
                }
                
              })
              // HVIS DER ER FEJL
              .fail(function() {
                
                if(jqxhr.status === 0) {
                  
                  // VISER IKONET FOR NETVÆRKSFEJL
                  if(!$(".error").hasClass("action")) {
                    $(".error").addClass("action");
                  }
                }
                
                console.log( "Fejl: " + jqxhr.status + " (ingen netværksforbindelse)"); 
                // Hvis jqxhr.status = 0, så er det en netværksfejl. 
                // Se http://www.unseenrevolution.com/jquery-ajax-error-handling-function/
              })
            
          }
        }
        
        /***** FUNKTION DER VISER SLIDEREN (fjerner .hide-klassen) *****/
        function showSlider() {
          $(".slider").removeClass("hide");
        }
        

        function reloadPageTimer() {
          setInterval(function(){
            reloadMe = true;
          }, (1000 * 60 * reloadPageMinutes)); //1000 milisekunder = 1 sek.   
        }
        
        
        /***** FUNKTION TIL AT RETURNERE EN VÆRDI UD FRA EN URL-PARAMETER-STRENG *****/ 
        function getURLParameter(sParam) {
          var sPageURL = window.location.search.substring(1);
          var sURLVariables = sPageURL.split('&');
          for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
              return sParameterName[1];
            }
          }
        }
        
        // tjekker URL'en for om der er angivet en fade=0
        if(getURLParameter('fade') == 0) {
          fadeDuration = 1;
          //alert(getURLParameter('fade'));
        }
        // tjekker URL'en for om der er angivet en t=0
        if(getURLParameter('t')) {
          reloadPageMinutes = getURLParameter('t');
          //reloadPageTimer();
          //alert("t er angivet");
        }
//        else {
//          reloadPageTimer();
//        }
        
        
        /*****  SLETTER VARIABLER OG ARRAYS *****/
        function initVars() {
          // sletning af arrays, se http://stackoverflow.com/questions/1232040/how-to-empty-an-array-in-javascript 
          durationArray.length = 0;
          animationStartArray.length = 0;
          animationEndArray.length = 0;
          
          indexCurrentSlide = 0;
          timerDelay = false;
          autoAdvancingTimeout = null;
          autoAdvancing = false;
          sliderCounts = 0;
          reloadMe = false;
          
        }
        
        
        /***** OPRETTER ET ARRAY MED VARIGHEDER PÅ SLIDES OG ET ARRAY MED 1/0 PÅ OM DER ER EN ANIMATIONSTART-KLASSE *****/    
        function initSlideArray() {
          
          $(".flexslider .slides > li").each(function(index, element) {
            // Finder varigheder
            durationArray[index] = $(this).data("duration")
            if(typeof durationArray[index] !== 'undefined') {
              durationArray[index] = $(this).data("duration") * 1000; // Fra sek. til millisek.
            }
            else {
              durationArray[index] = durationDefault; // Default varighed
            }
            // Finder animationStart
            if($(".animationStart", this).length != 0){
              animationStartArray[index] = 1;
              // Opretter eventhandler for .animationStart for den current slide
              $(".animationStart", this).bind('webkitAnimationEnd', function(e) {
                pauseSlide();
              }); 
            }
            else {
              animationStartArray[index] = 0;
            }     
            // Finder animationEnd
            if($(".animationEnd", this).length != 0){
              animationEndArray[index] = 1;
            }
            else {
              animationEndArray[index] = 0;
            }     
          });

        }
        
        
        
        function pauseSlide() {
          if (typeof(durationArray[indexCurrentSlide]) !== 'undefined') {
            timerDelay = durationArray[indexCurrentSlide];
          } else {
            timerDelay = durationArray[0];
            indexCurrentSlide = 0;
          };
          autoAdvancingTimeout = setTimeout(function(){            
            if(animationEndArray[indexCurrentSlide]) {
              $(".flexslider .slides > li:nth-child("+ parseInt(indexCurrentSlide + 1) + ")").addClass("reverse");
/*              if(animationStartArray[indexCurrentSlide]) {
                $(".flexslider .slides > li:nth-child("+ parseInt(indexCurrentSlide + 1) + ")").find(".animationStart").unbind('webkitAnimationEnd'); 
                $(".flexslider .slides > li:nth-child("+ parseInt(indexCurrentSlide + 1) + ")").find(".animationEnd").bind('webkitAnimationEnd', function(e) {
                  swapSlide();
                }); 
              }
              else {*/
                $(".flexslider .slides > li:nth-child("+ parseInt(indexCurrentSlide + 1) + ")").find(".animationEnd").bind('webkitAnimationEnd', function(e) {
                  swapSlide();
                }); 
//              }
            }
            else {
              swapSlide();
            }            
          }, timerDelay);
        }
        
        /***** SKIFT TIL NÆSTE SLIDE *****/
        function swapSlide() {
          autoAdvancing = true;
          jQuery('.flexslider').flexslider('next');            
          autoAdvancing = false;
          $(".flexslider .slides > li:nth-child("+ parseInt(indexCurrentSlide + 1) + ")").find(".animationEnd").unbind('webkitAnimationEnd'); 
        }        
        
        /***** FJERNER ALLE CURRENT SLIDE- OG REVERSE-KLASSER *****/
        function removeCurrentSlideAndReverseClasses() {
          $(".flexslider .slides > li").each(function(){
            $(this).removeClass("currentSlide").removeClass("reverse");
          });
        }

        /***** OPRET FLEXSLIDER *****/
        function newFlexslider() {
          
          $('.flexslider').flexslider({
            slideshowSpeed: 0,
            directionNav: false,
            slideshow: false,
            animationLoop: true,
            controlNav: false,
            animationSpeed: fadeDuration,

            start: function(slider) {
              
              
              sliderCounts = slider.count;
              //$('.total-slides').text(slider.count);            
              $(".flexslider .slides > li:nth-child(" + indexCurrentSlide + 1 + ")").addClass("currentSlide");
              if(!animationStartArray[indexCurrentSlide]) {
                pauseSlide();
              }

              reloadPageTimer();
            },

            after: function(slider){ // After bliver kaldt, når slideren har animeret ind
              if(slider.currentSlide == 0) {
                //alert("before");
              }

              // Hvis der er blevet brugt piletaster for at skifte slide
              if (!autoAdvancing) {
                clearTimeout(autoAdvancingTimeout); 
                indexCurrentSlide = slider.currentSlide;    
                $(".flexslider .slides > li:nth-child("+ parseInt(indexCurrentSlide + 1) + ")").find(".animationEnd").unbind('webkitAnimationEnd'); /* HER */              
                $(".flexslider .slides > li:nth-child("+ parseInt(indexCurrentSlide) + ")").removeClass("reverse"); /* HER */
              };            
              indexCurrentSlide = slider.currentSlide;            
              //Hvis der ikke er nogen animationStart-klasse
              if(!animationStartArray[indexCurrentSlide]) {
                pauseSlide();
              }
              //$('.current-slide').text(indexCurrentSlide + 1);            
              removeCurrentSlideAndReverseClasses();            
              $(".flexslider .slides > li:nth-child(" + (indexCurrentSlide + 1) + ")").addClass("currentSlide");
            },

            before: function(slider) {
              if(slider.currentSlide == (sliderCounts - 1)) {
                reloadPage();
                //console.log("Det er nu!!!");
                //console.log("slider.currentSlide: " + slider.currentSlide);
              }
            },

            end: function(slider) {

              //unbind'er og bind'er igen efter sidste slide
  /*            $(".flexslider .slides > li").each(function(index, element) {
                if(animationStartArray[index] == 1) {
                  $("animationStart", this).unbind('webkitAnimationEnd').bind('webkitAnimationEnd', function(e) {
                    pauseSlide();
                  });
                }
              });*/
            }
            /*  
            start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
            before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
            after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
            end: function(){},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
            added: function(){},            //{NEW} Callback: function(slider) - Fires after a slide is added
            removed: function(){}           //{NEW} Callback: function(slider) - Fires after a slide is removed
            */
          });

        }

        /***** SLET FLEXSLIDER *****/
        function deleteFlexslider() {
          
          if( $('.flexslider').eq(0).data('flexslider') ) {
            $('.flexslider').eq(0).flexslider('destroy');
          }
          
        }
        
        
        
        /***********************/

//        initSlideArray();
//        newFlexslider(); 
          reloadPage(1);
        /***********************/


        
        
		/*****************/
		/**** ADD-ONS ****/
		/*****************/

        

        /***** YOUTUBE VIDEO *****/  // Se i øvrigt https://developers.google.com/youtube/iframe_api_reference#Overview
        function playYoutubeVideo(currentSlideIndex) {
          /* Hvis den aktuelle li-child indeholder en youtube-video */          
          var currElement = $(".flexslider .slides > li:nth-child("+ currentSlideIndex + ") .youtubeVideo");
          if(currElement.length == 1){
            //$(".textMessage").text("Denne slide indeholder youtube-video");
            $(".youtubeVideo").attr('src', $(".youtubeVideo, parent").attr('src') + '?autoplay=1');
          }
          /*else {
            $(".textMessage").text(" ");          
          }*/
        }        

        
        
      });
    
    

    
    /************ KV 2013 ***********/        

	$(document).ready(function() {
    
      /****** UR *****/
      // Indsæt <div class="ur"></div>
      if($(".ur").length) {
        setInterval(function(){
          var clockDate = new Date;
          var clockMinutes = clockDate.getMinutes();
          if(clockMinutes < 10)
             clockMinutes = "0" + clockMinutes; 
          var clockHour = clockDate.getHours();
          if(clockHour < 10)
            clockHour = "0" + clockHour;
          $(".ur").html(clockHour + "<span>:</span>" + clockMinutes); 
        }, 1000); 
      }
   
    });  
 
    
    
    
    
 


    
 })(jQuery);
