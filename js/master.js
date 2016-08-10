(function($){

    var $doc = $(document);
    var $win = $(window);

    $win.on('load', function() {
      $(".preloader").delay(200).fadeOut(500).remove();
    });


    // document is ready
    $doc.on('ready', function() {


      /*====================================
      Fixed Header
      ======================================*/

      function fixedHeader() {

        $win.on('scroll load', function() {
          var scroll = $win.scrollTop();
          var header = $("#header");

          if ( scroll >= 100 ) {
            header.addClass("is-active");
          } else {
            header.removeClass("is-active");
          }
        });

      }

      /*====================================
      Navigation
      ======================================*/

      // mobile navigation
      function mobileNav() {
        // cache elements
        var body = $('body');
        var burger = $('#burger');
        var navbarCollapse = $('#navbar-collapse');
        var navLink = $('.nav-link');



        function openNav () {
          burger.addClass("is-active");
          navbarCollapse.addClass("is-active");
          body.addClass("is-active");
        }

        function closeNav () {
          burger.removeClass("is-active");
          navbarCollapse.removeClass("is-active");
          body.removeClass("is-active");
        }

        burger.on('click', function() {
          if ( $(this).hasClass("is-active") ) {
            closeNav();
          } else {
            openNav();
          }
        });

        navLink.on('click', function() {
          if ( burger.hasClass('is-active') ) {
            closeNav();
          }
        });



      }


      /*====================================
      Scroll to section animation
      ======================================*/

      function scrollToSection() {
        // cache elements
        var section = $('section');
        var navLink = $('.nav-link');

        // add "is-active" class to "nav-link" for current section
        $win.on('scroll', function() {
          var curPos = $(this).scrollTop();

          section.each(function() {
            var top = $(this).offset().top - 100;
            var bottom = top + $(this).outerHeight();

            if ( curPos >= top && curPos <= bottom ) {
              navLink.removeClass("is-active");
              $('.nav-link[href="#' + $(this).attr('id') + '"]').addClass("is-active");

            }
          });
        });
        // scrol lto secton animation
        $('a[data-scroll]').on('click', function() {
          if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
              $('html,body').animate({
                scrollTop: target.offset().top - 40
              }, 900);
              return false;
            }
          }
        });
      }

      /*====================================
      Filter buttons & portfolio items
      ======================================*/

      function filterByCategory() {
        // cache elements
        var filterBtn = $('.filter-btn');
        var portfolioList = $('.portfolio-list');

        // init Isotope
        var $grid = portfolioList.imagesLoaded( function() {
          $grid.isotope({
            itemSelector: '.portfolio-item',
            percentPosition: true
          });
        });


        // filter portfolio items
        function filterItems() {
          var filterValue = $( this ).attr('data-filter');
          $grid.isotope({ filter: filterValue });

        }

        function activeFilterBtn() {
          // remove "is-active" class on filter button
          filterBtn.each( function() {
            var hasClass = $(this).hasClass("is-active");
            var removeClass = $(this).removeClass("is-active");
            if ( hasClass ) {
              removeClass;
            }
          });
          // add "is-active" class on clicked button
          $(this).addClass("is-active");
        }

        // event listeners
        filterBtn.on( 'click', filterItems);
        filterBtn.on('click', activeFilterBtn);
      }

        /*====================================
        init functions
        ======================================*/
        fixedHeader();
        mobileNav();
        scrollToSection();
        filterByCategory();

        // init wow.js
        new WOW().init();



    });



})(jQuery)
