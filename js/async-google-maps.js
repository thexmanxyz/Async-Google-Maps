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
       
            // only load Google Maps if container is in viewport, 
            // data-src attribute exists and the src attribute is not set
            // this prevents double loading of the same Google Maps iframe
            if (!$container.attr('src') && $container.attr('data-src')
                && opts.isInViewport.call($container, opts)) {

                // callback before load initiated
                opts.beforeLoad.call($container, opts);

                // load map
                $container.attr('src', $container.attr('data-src'));

                // remove a predefined spinner if enabled
                if(opts.spinner.remove) {
                    opts.removeSpinner.call($container, opts);
                }

                // callback after load initiated
                opts.afterLoad.call($container, opts);
            }
       });
    }

    // initialize plugin and create events(s)
    $.fn.asyncGoogleMaps = function(options) {
        var opts = $.extend(true, {}, $.fn.asyncGoogleMaps.defaults, options);

        // set containers containing maps
        opts.containers = this;

        // attach spinner if necessary
        opts.attachSpinner(opts);

        // add trigger event (scroll, resize)
        opts.triggerAsyncLoad(opts);

        // initial check, if already in viewport
        opts.checkAndLoad(opts); 
    };

   /* default values
    *
    * offset: Offset in pixel. A negative offset will trigger loading earlier, a postive value later.
	* spinner.attach: Defines whether a spinner should be attached automatically.
    * spinner.remove: Defines whether a spinner should be removed automatically after load.
    * spinner.spinnerClass: CSS class added to the spinner container. 
	* spinner.type: The spinner type which should be used. The following values are supported:
	*  - 'bootstrap': Bootstrap spinner, requires version >= 4.2
	*  - 'included': simple build-in CSS spinner
	*  - 'custom': any custom spinner or library
	* spinner.bootstrapSpinner: The Bootstrap spinner used. Either 'spinner-border' or 'spinner-grow'.
    * spinner.delay: Time in milliseconds waited before the spinner is removed.
    * isInViewport: Custom function to determine if container is in viewport (callback).
	* attachSpinner: Custom function to define the spinner attach behavior (callback).
    * removeSpinner: Custom function to define the spinner removal behavior (callback).
    * triggerAsyncLoad: Custom function to define when the maps should be loaded (callback).
    * checkAndLoad: Custom function which calls the async load and check routine (callback).
    * beforeLoad: Custom function called before the async load was initiated (callback).
    * afterLoad: Custom function called after the async load was initiated (callback).
    *
    */
    $.fn.asyncGoogleMaps.defaults = {
        offset: 0,
        spinner: {
            attach: false,
            remove: false,
            spinnerClass: 'async-gmaps-spinner',
            type: 'bootstrap',
            bootstrapSpinner: 'spinner-border',
			customSpinner: '',
            delay: 10000
        },

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

        // remove a predefined spinner from the parent container of the map - can be user customized
        removeSpinner: function(opts) {

            // remove spinner within parent container
            var hFunc = function() { 
                $(this).parent().find('.' + opts.spinner.spinnerClass).remove();
            };

            // wait a specific time in milliseconds before removing spinner
            setTimeout(hFunc.bind(this), opts.spinner.delay);
        },

        // attach a predefined spinner to the parent container of the map - can be user customized
        attachSpinner: function(opts) {
            var spinner = opts.spinner;
			var $spinnerDiv;
			
            // if spinner should be attached
            if(spinner.attach) {
                
                // iterate over all map containers
                $(opts.containers).each(function () {

					// create bootstrap spinner
					if(spinner.type == 'bootstrap') {
						
						// create spinner container
						$spinnerDiv = $('<div>').addClass(spinner.bootstrapSpinner + ' ' + spinner.spinnerClass).attr('role', 'status');
						$spinnerDiv.prepend($('<span>').addClass('sr-only').html('Loading...'));
						

					// create included spinner
					}else if(spinner.type == 'included') {
						
						// create spinner container
						$spinnerDiv = $('<div>').addClass('simple-spinner' + ' ' + spinner.spinnerClass).attr('role', 'status');
					}
					
					// prepend spinner container
					$(this).parent().prepend($spinnerDiv);
               });
            }
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

// attach plugin to Google Maps containers, basic example
// $('.g-maps').asyncGoogleMaps({});