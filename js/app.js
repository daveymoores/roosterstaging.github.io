$(document).foundation();

$(function(){

   //navigation behaviours -------------------------

   var w = $(window).width();
   console.log(w);



   //deep linking on tabs
   var $tab = $('#jsTabsHook'),
       anchorScroll = new $.Deferred();

   function moveToAnchor(z){
      var ele = $('#'+z);
      $(window).scrollTop(ele.offset().top).scrollLeft(ele.offset().left);
   }

   function changeTab(x, y) {

      if(x=='parents') {
         $('#'+x).addClass('active').next().removeClass('active');
         $tab.find('.tab-title').eq(0).addClass('active').next().removeClass('active');
      } else if(x=='child'){
         $('#'+x).addClass('active').prev().removeClass('active');
         $tab.find('.tab-title').eq(1).addClass('active').prev().removeClass('active');
      }

   }

   var u = window.location.href,
       tabName = location.hash.split('#').slice(1);


   if(tabName[0] !== undefined) {
      var tabLocation = tabName[0].split('/');

      //resolve to allow page to finish animating
      anchorScroll.resolve(changeTab(tabLocation[0]));

      if(tabLocation[1] !== undefined) {

         anchorScroll.done(function() {
              setTimeout(function(){
                 moveToAnchor(tabLocation[1]);
              }, 150);
           });

      }

   }



       if(location.search !== '') {
          $('#jsLogoHook').hide();
          $('#jsNavParent').hide();
          $('#jsFooterHook').hide();
       }





   //end tab deep linking




   //test for touch devices
   if (/Mobi/.test(navigator.userAgent) !== true) { //if not do rollover behaviours


      //growing boxes...
      function grow(){

         var $this = $(this),
             $a = $(this).find('span'),
             $icon = $(this).find('.icon');


         if($this.hasClass('active') !== true) {

            if($this.parent().hasClass('disable') !== true) {

               $this.addClass('active');

               $icon.delay(50).velocity("stop", true).velocity({
                  opacity : 1,
                  top : '16px'
               }, 250, 'easeOutSine');

               $this.velocity("stop", true).velocity({
                  height : '120px'
               }, 250, 'easeOutSine', function(){});

            }

         }

      }


      //shrinking boxes...
      function shrink(){

         var $this = $(this),
             $a = $(this).find('a'),
             $icon = $(this).find('.icon');

         $this.removeClass('active');


         $this.delay(70).velocity("stop", true).velocity({
            height : '100%'
         }, 250, 'easeOutSine', function(){});

         $icon.velocity("stop", true).velocity({
            opacity : 0,
            top : '12px'
         }, 200, 'easeOutSine', function(){});

      }

      //using hover intent to avoid annoying movements...
      $('#jsNavigationHook').find('a').hoverIntent(grow, shrink);


   } //end test


   $('#jsMobHook').on('click', function(){

      var $this = $('#nav-icon');

      if($this.hasClass('open') !== true) {
         $this.addClass('open').parents('.toggle-topbar').addClass('active');
      } else {
         $this.removeClass('open').parents('.toggle-topbar').removeClass('active');
      }
   });

   // END navigation behaviours ----------------------




   $('#jsTabsHook').on('click', '.tab-title', function(event){
      event.preventDefault();
   });

});
