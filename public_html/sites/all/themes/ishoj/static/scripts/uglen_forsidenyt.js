  (function($) {
	
	
      $(window).load(function(){

        $('.flexslider').flexslider({
          animation: "fade",
slideshow: true,                //Boolean: Animate slider automatically
slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
animationSpeed: 600, 
pauseOnHover: true,           //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
controlNav: false,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
prevText: "",           //String: Set the text for the "previous" directionNav item
nextText: ""  

        });

        
      });


    
 })(jQuery);
