// menu
(function($) {
  $.fn.menumaker = function(options) {  
   var hmbrgMenu = $(this), settings = $.extend({
     format: "dropdown",
     sticky: false
   }, options);
   return this.each(function() {
     $(this).find(".o-hmbrg").on('click', function(){
       $(this).toggleClass('menu-opened');
       var mainmenu = $(this).next('ul');
       if (mainmenu.hasClass('open')) { 
         mainmenu.slideToggle().removeClass('open');
       }
       else {
         mainmenu.slideToggle().addClass('open');
         if (settings.format === "dropdown") {
           mainmenu.find('ul').show();
         }
       }
     });
     hmbrgMenu.find('li ul').parent().addClass('o-sub');
  multiTg = function() {
       hmbrgMenu.find(".o-sub").prepend('<span class="o-sub-btn"></span>');
       hmbrgMenu.find('.o-sub-btn').on('click', function() {
         $(this).toggleClass('submenu-opened');
         if ($(this).siblings('ul').hasClass('open')) {
           $(this).siblings('ul').removeClass('open').slideToggle();
         }
         else {
           $(this).siblings('ul').addClass('open').slideToggle();
         }
       });
     };
     if (settings.format === 'multitoggle') multiTg();
     else hmbrgMenu.addClass('dropdown');
     if (settings.sticky === true) hmbrgMenu.css('position', 'fixed');
  resizeFix = function() {
    var mediasize = 1023;
       if ($( window ).width() > mediasize) {
         hmbrgMenu.find('ul').show();
       }
       if ($(window).width() <= mediasize) {
         hmbrgMenu.find('ul').hide().removeClass('open');
       }
     };
     resizeFix();
     return $(window).on('resize', resizeFix);
   });
    };
  })(jQuery);
  
  (function($){
  $(document).ready(function(){
  $("#hmbrgMenu").menumaker({
     format: "multitoggle"
  });
  });
  })(jQuery);
  // finish