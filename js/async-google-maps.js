/******************************************************
*                                                     *
*   Async Google Maps - jQuery Plugin                 *
*                                                     *
*   Purpose: This project contains a simple and       *
*            full configurable jQuery plugin which    *
*            asynchronously loads one or multiple     *
*            Google Maps instances located on a       *
*            page. The load is triggered when the     *
*            map is scrolled into viewport.           *
*                                                     *
*   Author: Andreas Kar (thex) <andreas.kar@gmx.at>   *
*   Repository: https://git.io/JvD8G                  *
*                                                     *
******************************************************/

(function( $ ) {

    // retrieve all map container(s), check and execute async load
    function checkAndLoadMaps(opts) {
        $(opts.containers).each(function () {
            var $container = $(this);
       
            // only load Google Maps if container is in viewport, data-src attribute exists and the src attribute is not set
            // this prevents double loading of the same Google Maps iframe
            if (!$container.attr('src') && $container.attr('data-src')
                && opts.isInViewport.call($container, opts)) {

                // callback before load initiated
                opts.beforeLoad.call($container, opts);

                // load map
                $container.attr('src', $container.attr('data-src'));

                // callback after load initiated
                opts.afterLoad.call($container, opts);
            }
       });
    }

    // initialize plugin and create events(s)
    $.fn.asyncGoogleMaps = function(options) {
        var opts = $.extend({}, $.fn.asyncGoogleMaps.defaults, options);

        // set containers containing maps
        opts.containers = this;

        // add trigger event (scroll, resize)
        opts.triggerAsyncLoad(opts);

        // initial check, if already in viewport
        opts.checkAndLoad(opts); 
    };

   /* default values
    *
    * offset: Offset in pixel, a negative offset will trigger loading earlier, a postive value later.
    * isInViewport: Custom function to determine if container is in viewport (callback).
    * triggerAsyncLoad: Custom function to define when the async load check is performed (callback).
    * checkAndLoad: Custom function which calls the async load and check routine (callback).
    * beforeLoad: Custom function called before the async load was initiated (callback).
    * afterLoad: Custom function called after the async load was initiated (callback).
    *
    */
    $.fn.asyncGoogleMaps.defaults = {
        offset: 0,

        // determine if container is in viewport - can be user customized
        // credits @ https://stackoverflow.com/a/33979503/2379196
        isInViewport: function (opts) {
            
            // container bounds
            var containerTop = $(this).offset().top;
            var containerBottom = containerTop + $(this).outerHeight();

            // viewport bounds
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            // detect if container is in viewport
            return containerBottom > viewportTop && containerTop + opts.offset < viewportBottom;
        },

        // append trigger event - can be user customized
        triggerAsyncLoad: function (opts) {
            $(window).on('resize scroll', function() { opts.checkAndLoad(opts) });
        },

        // check and load map(s) - can be user customized
        checkAndLoad: function(opts) { checkAndLoadMaps(opts) },

        // before load initiated - can be user customized
        beforeLoad: function(opts) {},

        // after load initiated - can be user customized
        afterLoad: function(opts) {}
    };
 
})( jQuery );

// attach plugin to certain Google Maps containers, basic example
// $('.g-maps').toTopButton({});