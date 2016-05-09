/****************************/
/****  AF THOMAS MIKKEL  ****/
/****    tho@ishoj.dk    ****/
/****************************/


// Debouncing ensures that exactly one signal is sent for an event that may be happening several times 
// http://paulirish.com/2009/throttled-smartresize-jquery-event-handler/
(function ($, sr) {
 
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;
 
      return function debounced() {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null; 
          };
 
          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);
 
          timeout = setTimeout(delayed, threshold || 100); 
      };
  }
	// smartresize 
	jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
 
})(jQuery,'smartresize');



(function($) {

  $(document).ready(function() {

    /*********************/
    /*** SET STRUCTURE ***/
    /*********************/
    function setStructure() {

      var windowWidth = $(window).width();


      if(windowWidth >= 768) {
        // DEL PÅ SOCIALE MEDIER
        if($(".delsiden")[0]) {
          $(".delsiden").appendTo(".social-desktop");
        }
      }
      else {
        // DEL PÅ SOCIALE MEDIER
        if($(".delsiden")[0]) {            
          $(".delsiden").appendTo(".social-mobile");
        }
      }

      if(windowWidth >= 960) { 
        if(menuStatus) {
          // MENUKNAP
          $(".btn-mobilmenu").removeClass("hide-me");
          $(".btn-mobilmenu-hide").addClass("hide-me");
          $("[data-role='mobilenav']").removeClass("animate");
          $(".arrow").removeClass("left");
          menuStatus = false;
          // SØGEBAR
          $(".arrow").removeClass("action");
        }

        // DEL PÅ SOCIALE MEDIER
        if($(".delsiden")[0] && !$(".sprite-printer")[0]) {
          $(".delsiden").prepend("<a class=\"sprite sprite-printer\" href=\"#\" title=\"Print siden\"><span><span class=\"screen-reader\">Print siden</span></span></a>");
        }
      }
      else {

        // DEL PÅ SOCIALE MEDIER
        if($(".sprite-printer")[0]) {
          $(".sprite-printer").remove();
        }
      }
    }


    /*************/
    /*** INITS ***/
    /*************/
    setStructure();		


    /********************/
    /*** SMART RESIZE ***/
    /********************/
    $(window).smartresize(function() {
      setStructure();
      
    }); 


    /************************/
    /*** KLIK PÅ MENUKNAP ***/
    /************************/
    var menuStatus = false;

    // Når der klikkes på mobilmenu-knappen
    $(".btn-mobilmenu").click(function() {
      if(!menuStatus) { 
        $(this).addClass("hide-me");
        $(".btn-mobilmenu-hide").removeClass("hide-me");
        $("[data-role='mobilenav']").addClass("animate");
        $(".arrow").addClass("left");
        menuStatus = true;

        // SØGEBAR 
        $(".soegebar").removeClass("animate");
        $(".arrow").addClass("action");
        removeSearchResults(2);
        setTimeout(function(){
          $( ".soegebar form > div > input" ).val("");
        },300);
        searchBarStatus = false;
      }
    });	
    // Når der klikkes på skjul-mobilmenu-knappen
    $(".btn-mobilmenu-hide").click(function() {
      if(menuStatus) {
        $(".btn-mobilmenu").removeClass("hide-me");
        $(this).addClass("hide-me");
        $("[data-role='mobilenav']").removeClass("animate");
        $(".arrow").removeClass("left");
        menuStatus = false;

        // SØGEBAR
        $(".arrow").removeClass("action");
        removeSearchResults(2);
        setTimeout(function(){
          $( ".soegebar form > div > input" ).val("");
        },300);
      }
    });
      

    /************************/
    /*** KLIK PÅ SØGEKNAP ***/
    /************************/    
    var searchBarStatus = false;      
    if($("body").hasClass("front")) { // Tilføj drupals page-klasser for de tre forsider (.front er en af dem)
        $(".soegebar input[type=submit]").removeAttr("disabled");
        setTimeout(function(){
          $(".soegebar form > div > input").focus();
        },300);
        searchBarStatus = true;
    }
    else {
      $(".soegebar input[type=submit]").attr("disabled","disabled");
    }
    
    $(".btn-search").click(function() {
      // NÅR DEN SKAL VISES
      if(!searchBarStatus) {
        $(".soegebar").addClass("animate");
        $(".arrow").addClass("action");
        $(".soegebar input[type=submit]").removeAttr("disabled");
        setTimeout(function(){
          $(".soegebar form > div > input").focus();
        },300);
        searchBarStatus = true;
        
        // MENUKNAP
        $(".btn-mobilmenu").removeClass("hide-me");
        $(".btn-mobilmenu-hide").addClass("hide-me");
        $("[data-role='mobilenav']").removeClass("animate");
        $(".arrow").removeClass("left");
        // FJERN SØGERESULTATER
        $(".soegeresultat").remove();
        $(".soegeresultat").removeClass("show");
		menuStatus = false;
      }
      // NÅR DEN SKAL SKJULES
      else {
        $(".soegebar").removeClass("animate");
        removeSearchResults(2);
        $(".arrow").removeClass("action");
        $(".soegebar input[type=submit]").attr("disabled","disabled");
        setTimeout(function(){
          $( ".soegebar form > div > input" ).val("");
        },300);      
        searchBarStatus = false;
      }
    });    

    /****************************/
    /**** VIS SØGERESULTATER ****/
    /****************************/

    var searchString = "";
    var showMoreResults = true;
    var moreResultsWasShown = false;

    // Midlertid testfunktion. showMoreResults skal genereres fra koden og ikke som her i testfunktionen 
    $(".klik-mig").click(function() {
      if(showMoreResults) {
        showMoreResults = false;
      }
      else {
        showMoreResults = true;
      }
    });
      
    function searchChanged(val){
      if(searchString == val){
        return false;
      }
    }
      
    // NÅR DER INDTASTES I SØGEFELTET
    $( ".soegebar form > div > input" ).keyup(function() {
      if(searchString == $(this).val()){
        return false;
      }
      searchString = $(this).val();
      getSearchResultsval($(this).val());
    });
      
    // NÅR DER SUBMITTES (KLIK PÅ ENTER-TASTEN ELLER PÅ SUBMIT-KNAPPEN)
    $( ".soegebar form" ).submit(function( event ) {
      event.preventDefault();
      if(searchString == $(".soegebar form > div > input").val()){
        return false;
      }
      getSearchResultsval($( ".soegebar form > div > input" ).val());
    });

    // FJERNER SØGERESULTATER
    function removeSearchResults(i) {
      if(i == 2) {
        $(".soegeresultat, .search-more").removeClass("show");
        setTimeout(function() {
          $(".soegeresultat, .search-more").remove();
        }, 200);
        
        return false;
      }
      // Når søgeresultaterne lukker sig helt sammen, skal den fjerne hele elementet
      $(".soegeresultat").removeClass("show");
      $(".soegeresultat ul").children().remove();
      $(".search-more .grid-full").children().remove();
      if(i == 1) {
        $(".search-more").removeClass("show");
      }
    }
      
    // VISER SØGERESULTATER
    function getSearchResultsval(val) {
      if(val.length < 2) { // Min. to tegn, før der foretages en søgning 
        removeSearchResults(1);
        return false;
      }            
      var sStart = '<div class="row soegeresultat"><ul class="list-unstyled">';
      var sEnd   = '</ul></div><div class=\"row search-more\"><div class=\"grid-full\"></div></div>';
      var s      = '';

      // http://api.jquery.com/jQuery.getJSON/
      // Assign handlers immediately after making the request, and remember the jqxhr object for this request
      // JSON-parser: http://jsonviewer.stack.hu/
      // http://77.247.77.43:8983/solr
      // http://77.247.77.43:8983/solr/ishoj_dk/select?q=borgmester*&rows=12&wt=json&indent=true
      var jqxhr = $.getJSON( "/json-output.json?val=" + val, function() {
//            var jqxhr = $.getJSON( "http://77.247.77.43:8983/solr/ishoj_dk/select?q=borgmester*&rows=12&wt=json&indent=true", function() {
        console.log( "success" );
      })
        .done(function(data) {
          console.log( "second success\n\n" );
          
          $.each( data.response.docs, function( i, item ) {

            s += '<li class="grid-fourth"><a href="' + item.url + '" title="' + item.label + '"><h3><span>' + item.label + '</span></h3></a><li>';

          });

          if($(".soegeresultat")[0]) { // Der er allerede vist et søgeresultat
            removeSearchResults();
            $(".soegeresultat ul").append(s);
          }
          else {
            $(".soegebar .container").append(sStart + s + sEnd); 
          }
          
          // Hvis der er flere end 12 søgeresultater
          if(showMoreResults) {     
            moreResultsWasShown = 1;
//            $(".search-more .grid-full").append("<p><a class=\"btn btn-large btn-outline flere-resultater\" href=\"#\"><span class=\"sprites-sprite sprite-arrow-right\"></span>" + encodeURIComponent(val) + "</a></p>");
            $(".search-more .grid-full").append("<p><a class=\"btn btn-large btn-outline flere-resultater\" href=\"#\">" + encodeURIComponent(val) + "</a></p>");
          }
//          console.log("\nmoreResultsWasShown = " + moreResultsWasShown);
//          console.log($(".search-more .grid-full").html());      
          


          setTimeout(function(){
            $(".soegeresultat").addClass("show");
            if(showMoreResults) {
              $(".search-more").addClass("show");
            }
          },10);  
          


        })
        .fail(function() {
          console.log( "error" );
        })
        .always(function() {
          console.log( "complete" );
        });

    }
      
      
    // Se http://stackoverflow.com/questions/15620303/trouble-animating-div-height-using-css-animation
    // og http://css3.bradshawenterprises.com/animating_height/
//    function searchBoxHeight() {
//      console.log( "soegeresultat højde: " + $(".soegeresultat").height() );
//    }
    
    
    /*************************************/
    /**** MIKROARTIKLER FRA BORGER.DK ****/
    /*************************************/
    $(".microArticle div.mArticle").hide();
    $(".microArticle").wrapAll("<div class=\"microArticleContainer\" />");	

    $(".microArticle h2.mArticle").click(function(){
        $(this).parent().find("div.mArticle").slideToggle('fast');
        if($(this).parent().hasClass("active")){
            $(this).parent().removeClass("active");
            $(this).removeClass("active");
            $(this).find("span").removeClass("sprite-minus");
        }
        else {
            $(this).parent().addClass("active");
            $(this).addClass("active");
            $(this).find("span").addClass("sprite-minus");
        }
    });		
    
      
    /********************/
    /**** GOOGLE MAP ****/
    /********************/
    $(".map-btn").click(function(){
        if($("#map-canvas").hasClass("active")){
            $("#map-canvas").removeClass("active");
    $(this).text("Vis kort");
        }
        else {
            $("#map-canvas").addClass("active");
    $(this).text("Skjul kort");
        }
    });
    
    
    /********************/
    /**** DEL SIDEN ****/
    /********************/
    var popupCenter = function(url, title, w, h) {
      // Fixes dual-screen position                         Most browsers      Firefox
      var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
      var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;
      var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
      var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
      var left = ((width / 2) - (w / 2)) + dualScreenLeft;
      var top = ((height / 3) - (h / 3)) + dualScreenTop;
      var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
      // Puts focus on the newWindow
      if (window.focus) {
        newWindow.focus();
      }
    };
//    $(".delsiden a:not(.sprite-share, .sprite-printer)").click(function(e){
    $(".dimmer-delsiden a:not(.sprite-link)").click(function(e){
      e.stopPropagation();
      popupCenter($(this).attr("href"), $(this).attr("title"), 580, 470);
      e.preventDefault();
    });  
    // DEL-KNAPPEN
    $(".sprite-share").click(function(e){
      $(".dimmer-delsiden").removeClass("hidden");
      $(".dimmer-delsiden ul").addClass("show");
      e.preventDefault();
    });  
    // LINK URL-KNAPPEN
    $(".sprite-link").click(function(e){
      e.stopPropagation();
      $(".link-url").addClass("show");
      e.preventDefault();
    });  
    // URL TEKST
    $(".link-url textarea").click(function(e){
      e.stopPropagation();
      e.preventDefault();
      $(this).focus().select().toggleClass("show-bg");
    });  
    
    
    // DIMMER-DELSIDEN
    $(".dimmer-delsiden").click(function(e){
      $(this).addClass("hidden").children("> ul").removeClass(".show");
      $(".dimmer-delsiden ul").removeClass("show");
      $(".link-url textarea").removeClass("show-bg");
//      e.preventDefault();
      $(".link-url").removeClass("show");
      $(".link-url span").removeClass("show-bg");

    });  
      
    /*********************/
    /**** PRINT SIDEN ****/
    /*********************/
    $(document).on('click', '.sprite-printer', function(e) { 
      window.print();
      e.preventDefault();
    });
      

    /*************************************/
    /**** ANDRE KOMMUNALE HJEMMESIDER ****/
    /*************************************/
    if ($("#hjemmesider")[0]) {
      $(function() {
        // bind change event to select
        $("#hjemmesider").bind("change", function() {
          if($(this).val() != "0") {
            selIndex = $(this).val();
            if(selIndex.substr(0,7) != 'http://'){
              selIndex = 'http://' + selIndex;
            }
            $("#hjemmesider option:first-child").attr("selected", true);
            window.location = selIndex;
          }
          return false;
        });
      });
    }
    
    
    
//		function dimmer(i) {
//			if(i) {
//				$("[data-role='page'] .dimmer").fadeIn(250);
//      }
//			else {
//				$("[data-role='page'] .dimmer").fadeOut(300);
//			}
//		}



		/* DIVERSE SMÅ-RETTELSER/ÆNDRINGER */
//		$("#searchContainer input[type='text']").attr('title', 'Hvad søger du?');
	
	});

  
$(window).load(function() {
  
  /********************/
  /**** FLEXSLIDER ****/
  /********************/
  // https://github.com/woothemes/FlexSlider/wiki/FlexSlider-Properties
  if ($(".flexslider")[0]) {
    
    $(".flexslider").flexslider({
//      startAt: 0,
      animation: "slide",
      slideshowSpeed: 7000,
      prevText: "",
      nextText: ""
    });
    $(".flex-direction-nav a.flex-prev").removeClass("flex-prev").addClass("icon").addClass("flex-prev"); // swapper klasserne
    $(".flex-direction-nav a.flex-next").removeClass("flex-next").addClass("icon").addClass("flex-next");
  }
  
  
});
  
})(jQuery);








