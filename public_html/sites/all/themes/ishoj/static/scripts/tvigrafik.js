  (function($) {
	
	
      /*************************/
      /***** INFO-TV MOTOR *****/
      /*************************/
      $(window).load(function(){
        
        $(".slides").addClass("tvigrafik");

        /***************************************************/        
        var spacebarPlay = false;
        var firstSlide = 1;
        var isPaused = false;

        // Når der klikkes på 'spacebar'
        $("body").keypress(function( event ) {
          if (event.which == 32 ) {
            event.preventDefault();
            console.log("Du har klikket på mellemrumstasten.");
            console.log("\nindexCurrentSlide == " + indexCurrentSlide);
//          setCurrentSlide(indexCurrentSlide);
            if($(".flexslider .slides > li:nth-child(" + parseInt(indexCurrentSlide + 1) + ")").hasClass("currentSlide")) {
              if($(".flexslider .slides > li:nth-child(" + parseInt(indexCurrentSlide + 1) + ")").hasClass("reverse")) {
                removeCurrentSlideAndReverseClasses();
                $(".flexslider .slides > li:nth-child(" + parseInt(indexCurrentSlide + 1) + ")").addClass("currentSlide");
              }
              else {
                $(".flexslider .slides > li:nth-child(" + parseInt(indexCurrentSlide + 1) + ")").addClass("reverse");
              }
            }
            else { 
              $(".flexslider .slides > li:nth-child(" + parseInt(indexCurrentSlide + 1) + ")").addClass("currentSlide");
            }
          }
        });

        function setCurrentSlide(index) {
//          $(".flexslider .slides > li:nth-child(" + index + 1 + ")").addClass("currentSlide");
          $(".flexslider .slides > li:nth-child(" + parseInt(index + 1) + ")").addClass("currentSlide");
          
          if($(".flexslider .slides > li:nth-child(" + index + 1 + ")").hasClass("currentSlide")) {
            console.log("\nHar klassen .currentSlide");
          }
          
        }
 
//        function pauseIt() {
//          $('.flexslider').flexslider("pause");
//        }
//        function playIt() {
//          $('.flexslider').flexslider("play");
//        }
        /***************************************************/
        
        var durationArray = [];
        var durationDefault = 10000; 
        var indexCurrentSlide = 0;
        var timerDelay = false;
        var autoAdvancingTimeout = null;
        var autoAdvancing = false;
        var sliderCounts = 0;
        var animationStartArray = [];
        var animationEndArray = [];
        var fadeDuration = 1;
        var reloadMe = false;
        var reloadPageMinutes = 5;
        
        
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

        /***** FJERNER ALLE CURRENT SLIDE- OG REVERSE-KLASSER *****/
        function removeCurrentSlideAndReverseClasses() {
          $(".flexslider .slides > li").each(function(){
            $(this).removeClass("currentSlide").removeClass("reverse");
          });
        }

        /***** FLEXSLIDER *****/
        $('.flexslider').flexslider({
          slideshowSpeed: 0,
          directionNav: false,
          slideshow: false,
          animationLoop: true,
          controlNav: false,
          animationSpeed: fadeDuration,
          
          start: function(slider) {
            
            //sliderCounts = slider.count;
            console.log("\sliderCounts = " + slider.count);
            indexCurrentSlide = slider.currentSlide; 
            console.log("\indexCurrentSlide (start:) = " + slider.currentSlide);
                        
//            $(".flexslider .slides > li:nth-child(" + indexCurrentSlide + 1 + ")").addClass("currentSlide");
//            if(!animationStartArray[indexCurrentSlide]) {
//              pauseSlide();
//            }
            
            //reloadPageTimer();
          },
          
          after: function(slider){ // After bliver kaldt, når slideren har animeret ind
//            if(slider.currentSlide == 0) {
//              //alert("before");
//            }
           
            // Hvis der er blevet brugt piletaster for at skifte slide
//            if (!autoAdvancing) {
//              //clearTimeout(autoAdvancingTimeout); 
//              indexCurrentSlide = slider.currentSlide;    
//              $(".flexslider .slides > li:nth-child("+ parseInt(indexCurrentSlide + 1) + ")").find(".animationEnd").unbind('webkitAnimationEnd'); /* HER */              
//              $(".flexslider .slides > li:nth-child("+ parseInt(indexCurrentSlide) + ")").removeClass("reverse"); /* HER */
//            };            
            indexCurrentSlide = slider.currentSlide;     
            console.log("\indexCurrentSlide (after:) = " + slider.currentSlide);
            //Hvis der ikke er nogen animationStart-klasse
            console.log("spacebarPlay = false");
            spacebarPlay = false; 
//            if(!animationStartArray[indexCurrentSlide]) {
//              pauseSlide();
//            }
            //$('.current-slide').text(indexCurrentSlide + 1);            
            removeCurrentSlideAndReverseClasses();            
//            $(".flexslider .slides > li:nth-child(" + (indexCurrentSlide + 1) + ")").addClass("currentSlide");

          },
          
          before: function(slider) {
            //indexCurrentSlide = slider.currentSlide;   
            //removeCurrentSlideAndReverseClasses(); 
//            if(slider.currentSlide == (sliderCounts - 1)) {
              //reloadPage();
              //console.log("Det er nu!!!");
              //console.log("slider.currentSlide: " + slider.currentSlide);
//            }
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
        
   
        
/***********************/


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

        
/************ KV 2013 ***********/        
        
      });

	$(document).ready(function() {
    
    
    
		/*******************************************/
		/**** FORSIDE-RESULTAT (OG PÅ VALGSIDEN ****/
		/*******************************************/
    if($(".kv2013-resultat-data") && $(".kv2013-resultat-data-parti")) {
      var $procentArray = [];
      $(".kv2013-resultat-data-parti").each(function(index){
        
        $procent = $(this).data("procent");
        $procentStrippet = $procent.toString();
        // erstat , med .
        $procentStrippet = $procentStrippet.replace(/,/g, ".");
        // erstat % med ""
        $procentStrippet = $procentStrippet.replace(/%/g, "");
        // erstat " " med ""
        $procentStrippet = $procentStrippet.replace(/ /g, "");
        $procentOutput = $procentStrippet;
        // med parantes
        if($procentStrippet.indexOf("(") !== -1) {
          $procentSplittet = $procentStrippet.split("(");
          $procentOutput = $procentSplittet[0];
          //console.log("der er noteret en (\n$procentSplittet[0]=" + $procentSplittet[0] + ", $procentSplittet[1]=" + $procentSplittet[1] + "\n");
        } 
        else { 
        // ingen parantes
          $procentSplittet = "-1";
        }
        // Sørger for, at der kun er en decimal, fx 10.53 => 10.5 
        if(($procentSplittet[0].indexOf('.') !== -1) && ($procentSplittet !== -1)) {
          $procentDecimal  = $procentSplittet[0].split(".");
//          $procentSplittet[0] = $procentDecimal[0] + "." + $procentDecimal[1].charAt(0); 
          $procentOutput = $procentDecimal[0] + "." + $procentDecimal[1].charAt(0); 
        }        
          
        if(($procent == "0") || ($procent == "undefined") || ($procent == "") || ($procent == -1) || ($procent == undefined) || ($procent == null)) {
          $(".kv2013-resultat-data-parti-bar", this).height(0);
          $(".kv2013-resultat-data-parti-bar p", this).html(0 + "&nbsp;%");
          $procentArray[index] = 0;
        }
        else {
//          $(".kv2013-resultat-data-parti-bar", this).height(($procentSplittet[0] * 4) + 10);
          $(".kv2013-resultat-data-parti-bar", this).height(($procentOutput * 6.5));
          $(".kv2013-resultat-data-parti-bar p", this).html($procentOutput + "&nbsp;%");
          $procentArray[index] = $procentOutput;
        }
      });

//      $('.price').blur(function () { 
//        var sum = 0; 
//        $('.price').each(function() { 
//          sum += Number($(this).val()); 
//        }); // here, you have your sum 
//      });
                              
                              
      if($(".kv2013-valgforbund") && ($procentArray[0] !== "0" || $procentArray[0] !== 0)) {
        $(".vf1-bar").css("width", (parseFloat($procentArray[0]) + parseFloat($procentArray[2])) * 14);
        $(".vf2-bar").css("width", (parseFloat($procentArray[1]) + parseFloat($procentArray[3]) + parseFloat($procentArray[7])) * 14);
        $(".vf3-bar").css("width", (parseFloat($procentArray[4]) + parseFloat($procentArray[5]) + parseFloat($procentArray[6])) * 14);
        
//        $(".vf1-bar p span").html(parseFloat($procentArray[0]) + parseFloat($procentArray[2]) + " %");
//        $(".vf2-bar p span").html(parseFloat($procentArray[1]) + parseFloat($procentArray[3]) + parseFloat($procentArray[7]) + " %");
//        $(".vf3-bar p span").html(parseFloat($procentArray[4]) + parseFloat($procentArray[5]) + parseFloat($procentArray[6]) + " %");
        $(".vf1-bar p span").html((parseFloat($procentArray[0]) + parseFloat($procentArray[2])).toFixed(2) + " %");
        $(".vf2-bar p span").html((parseFloat($procentArray[1]) + parseFloat($procentArray[3]) + parseFloat($procentArray[7])).toFixed(2) + " %");
        $(".vf3-bar p span").html((parseFloat($procentArray[4]) + parseFloat($procentArray[5]) + parseFloat($procentArray[6])).toFixed(2) + " %");
      }

    }    
    
    
    
    var pctArray = [], 
        tal1Array = [], 
        tal2Array = [], 
        talTotal;
    
    $(".flexslider .slides > li").find(".doughnutContainer").each(function(index, element) {
      pctArray[index] = $("h5", this).text();
      pctArray[index] = pctArray[index].replace('%', '');
      pctArray[index] = pctArray[index].replace(' ', '');
      $("h5", this).text(pctArray[index] + "%");
      console.log($("h5", this).text());
      pctArray[index] = pctArray[index].replace(',', '.'); 
      talTotal = $(this).parent().parent().parent().parent().find(".valgstedDataBoks2 h5").text();
      talTotal = talTotal.replace('.', '');
      tal1Array[index] = parseInt((pctArray[index] * talTotal) / 100);
      tal2Array[index] = parseInt(((100 - pctArray[index]) * talTotal) / 100);
    });

    function AnimDoughnut() {
      var doughnutData1 = [ {value : tal1Array[0], color : "#f1f3f6"}, {value : tal2Array[0], color : "rgba(119,165,210,0)"} ];
      var doughnutData2 = [ {value : tal1Array[1], color : "#f1f3f6"}, {value : tal2Array[1], color : "rgba(119,165,210,0)"} ];
      var doughnutData3 = [ {value : tal1Array[2], color : "#f1f3f6"}, {value : tal2Array[2], color : "rgba(119,165,210,0)"} ];
      var doughnutData4 = [ {value : tal1Array[3], color : "#f1f3f6"}, {value : tal2Array[3], color : "rgba(119,165,210,0)"} ];
      var doughnutData5 = [ {value : tal1Array[4], color : "#f1f3f6"}, {value : tal2Array[4], color : "rgba(119,165,210,0)"} ];
      var doughnutData6 = [ {value : tal1Array[5], color : "#f1f3f6"}, {value : tal2Array[5], color : "rgba(119,165,210,0)"} ];
      
      var myOptions = { percentageInnerCutout : 70, segmentShowStroke : false, animationSteps : 65, animationEasing : "easeOutCubic" };

      if($("#doughnut_00").length)
        var myDoughnut1 = new Chart(document.getElementById("doughnut_00").getContext("2d")).Doughnut(doughnutData1, myOptions);      
      if($("#doughnut_01").length)
        var myDoughnut2 = new Chart(document.getElementById("doughnut_01").getContext("2d")).Doughnut(doughnutData2, myOptions);
      if($("#doughnut_02").length)
        var myDoughnut3 = new Chart(document.getElementById("doughnut_02").getContext("2d")).Doughnut(doughnutData3, myOptions);
      if($("#doughnut_03").length)
        var myDoughnut4 = new Chart(document.getElementById("doughnut_03").getContext("2d")).Doughnut(doughnutData4, myOptions);
      if($("#doughnut_04").length)
        var myDoughnut5 = new Chart(document.getElementById("doughnut_04").getContext("2d")).Doughnut(doughnutData5, myOptions);
      if($("#doughnut_05").length)
        var myDoughnut6 = new Chart(document.getElementById("doughnut_05").getContext("2d")).Doughnut(doughnutData6, myOptions);
    }

    //setTimeout(AnimDoughnut, 2000)
    if( $("#doughnut_00").length || $("#doughnut_01").length || $("#doughnut_02").length || $("#doughnut_03").length || $("#doughnut_04").length || $("#doughnut_05").length ) {
      AnimDoughnut();
    }
    // Hvis der er slides, der har elementer med klassen ".valgstedListe" 
    if($(".valgstedListe").length){
      $(".valgstedListe").last().addClass("last");
    }

    
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
