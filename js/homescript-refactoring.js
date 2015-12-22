//homescript
var UI = UI || {};

UI.binds = (function($, window, document, undefined) {

    'use strict';

    var $fone = $('#jsPhoneHook'),
        $body = $('#body');


    var testConsole = function() {

      console.log('oi oi !!!');

    },
    pageSwipe = function(){

      $('#jsWipesHook').fullpage({
         menu: '#menu',
         slidesNavigation: true,
         slidesNavPosition: 'bottom',
         lockAnchors: false,
         scrollingSpeed: 2000,
         fitToSection: true,
         fitToSectionDelay: 5000,
         //anchors:['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage', 'sixthPage'],
         onLeave: function(index, nextIndex, direction){

            var $this = $(this),
                 col = $this.attr('data-color'); //get color

            colorChange(nextIndex);                     //change background colour
            screenSwipe(index, nextIndex, direction);   //change screen

         }
     });

    },
    colorChange = function(i) {

      switch (i) {
         case 1:
            $body.css('background-color', '#128ED8');
            break;
         case 2:
            $body.css('background-color', '#D12F4F');
            break;
         case 3:
            $body.css('background-color', '#4BABA0');
            break;
         case 4:
            $body.css('background-color', '#1E4C80');
            break;
         case 5:
            $body.css('background-color', '#EC633A');
            break;
         case 6:
            $body.css('background-color', '#128ED8');
            break;
         default:
            $body.css('background-color', '#128ED8');
         }
      }

   },
   screenSwipe = function(i, j, k) {

      if(i>=2) {

         if(i==5) {

            if(k=='down') {

               $fone.velocity({
                  marginTop: '20px',
                  opacity: '0'
               }, 350, 'easeInSine');

            } else if(k=='up') {

               setTimeout(function(){
                  $fone.find('.active').velocity({
                     bottom: '-455'
                  }, 550, 'easeInSine', function(){
                     $(this).prev().addClass('active');
                  });
               }, 1000);

            }

         } else if(i==6) {

            $fone.velocity({
               marginTop: '0px',
               opacity: '1'
            }, 450, 'easeInSine');

         } else {

            if(k=='down') {

               setTimeout(function(){
                  $fone.find('.active').removeClass('active');
                  $fone.find('.phone__img').eq(i-1).addClass('active').velocity({
                     bottom: '0'
                  }, 550, 'easeOutSine');
               }, 1000);

            } else if(k=='up'){

               if(i!==2) {

                  setTimeout(function(){
                     $fone.find('.active').velocity({
                        bottom: '-455'
                     }, 550, 'easeInSine', function(){
                        $(this).prev().addClass('active');
                     });
                  }, 1000);
               } else {

                  $fone.velocity({
                     marginTop: '20px',
                     opacity: '0'
                  }, 350, 'easeInSine');

               }

            }

         }

      } else {

         $fone.delay(800).velocity({
            marginTop: '0',
            opacity: '1'
         }, 500, 'easeOutSine');

      }

   };

   return {

     testConsole : testConsole,
     pageSwipe : pageSwipe,
     colorChange : colorChange,
     screenSwipe : screenSwipe

   };



})(jQuery, window, document);
