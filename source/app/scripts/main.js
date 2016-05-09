

(function($) {


  'use strict';

  /***************************************/
  /****  D O C U M E N T   R E A D Y  ****/
  /***************************************/

  $(document).ready(function() {

    var isMenu = false;


    // BURGER MENU
    $('.burger a').click(function(){

      $(this).toggleClass('action');
      $('.dimmer').toggleClass('action');

      if(!isMenu) {
        isMenu = true;
        $('.nav-mobile').toggleClass('action');
        // setTimeout(function (){
        //   $('[data-role="page"]').toggleClass('action');
        // }, 200);
      }
      else {
        isMenu = false;
        $('.nav-mobile').toggleClass('action');
        // $('[data-role="page"]').toggleClass('action');
        // setTimeout(function (){
        //   $('.nav-mobile').toggleClass('action');
        // }, 100);
      }

    });


    // JQUERY-MATCH-HEIGHTS
    // https://github.com/liabru/jquery-match-height
    $(function() {
      $('[data-match-heights] > div').matchHeight();
    });


    $(window).resize(function() {

      var windowWidth = $(window).width();

      if(windowWidth >= 960) {
        if(isMenu) {
          // $('.burger a', '.dimmer', '[data-role="page"]').toggleClass('action');
          $('.burger a, .nav-mobile, .dimmer').toggleClass('action');
          // setTimeout(function (){
          //   $('.nav-mobile').toggleClass('action');
          // }, 100);
          isMenu = false;
        }
      }

    });





  });


  /*********************************/
  /****  W I N D O W   L O A D  ****/
  /*********************************/

  $(window).load(function() {



  });


})(jQuery);
