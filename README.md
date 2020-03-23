# Async Google Maps
This project contains a simple and full configurable jQuery plugin which asynchronously loads one or multiple Google Maps instances located on a page. The plugin is fully configurable and the loading is triggered when the map container is scrolled into viewport. If you want to try it yourself, simply download the latest version and follow the installation guide below. 

## Prerequisites
* Basic web frontend knowledge
* jQuery core library

## Download / Installation
1. [Download v1.0.0](https://github.com/thexmanxyz/Async-Google-Maps/archive/v1.0.0.zip) of Async Google Maps
2. Extract the files and copy them to your website folder
3. Define the JS resource file in your HTML page. You can also place the `<script>` tag after your `<body>` content. Basic resource import example:
   * **JS:** `<script src="js/async-google-maps.min.js"></script>`
4. Initialize the plugin with basic values as follows
   * **Plugin Initialization:** `$('.g-maps').asyncGoogleMaps({});` or `jQuery('.g-maps').asyncGoogleMaps({});`
5. If you want to further customize the appearance or behavior please take a closer look on the plugin parameters and their explanation listed in the next section.

## Configuration and Parameters
The plugin can be easily configured during the initialization and the following parameters are currently available. The listing contains the parameters together with their default values.

- `offset: '0',` | Offset in pixel. A negative offset will trigger loading earlier, a postive value later.
- `spinner: {` | Spinner options
	- `remove: false,` | Defines whether a spinner should be removed automatically after load.
	- `selector: '.spinner-border',` | CSS selector used to find the spinner container (starting at map parent element). 
    - `delay: 10000},` | Time in milliseconds waited before the spinner is removed.
- `isInViewport: function(opts){ ... },` | Custom function to determine if container is in viewport (callback).
- `removeSpinner: function(opts){ ... },` | Custom function to control and define the spinner removal behavior (callback).
- `triggerAsyncLoad: function(opts){ ... },` | Custom function to define when the load check is performed (callback).
- `checkAndLoad: function(opts){ ... },` | Custom function which calls the async load and check routine (callback).
- `beforeLoad: function(opts){ ... },` | Custom function called before the async load was initiated (callback).
- `afterLoad: function(opts){ ... }` | Custom function called after the async load was initiated (callback).

### Google Maps iframe

To make this plugin working for your Google Maps `<iframe>` please change the `src`-attribute to `data-src` and add the class `g-maps` e.g.:

```HTML
<iframe class="g-maps" data-src="{your-google-maps-url}" width="100%" height="400" frameborder="0" style="border:0" allowfullscreen></iframe>
```

### Example

The following example shows how you can specify plugin parameters to change the default offset and remove a pre-defined Boostrap 4 spinner.

```Javascript
$('.g-maps').asyncGoogleMaps({offset: -100, spinner: {remove: true}});
```

### Layout Reflow

If you load content and elements asynchronously please be aware that it is necessary to reserve space for the container (Google Maps container). This is necessary to prevent that the page layout will be rearranged during loading. To counter this please take a look at the following CSS:

```CSS
.g-maps { min-height: 400px; } // please take your default container height

```

## Features

* load Google Maps asynchronously to get better Google PageSpeed Insights rating
* offset to load Google Maps at the desired scroll position
* prepared to remove a pre-defined loading spinner (e.g. Bootstrap 4)
  * customizable CSS selector
  * delay spinner removal
* fully customizable through different callback methods at important execution points

## Future Tasks
- [ ] automatically attach spinner (Bootstrap 4 and classic)
- [ ] automatically determine padding to prevent reflow of layout

## Known Issues
None

## Dependencies
* [jQuery](https://jquery.com/)

## Credits

Thanks to the jQuery team for this [great plugin tutorial](https://learn.jquery.com/plugins/basic-plugin-creation/).

## by [thex](https://github.com/thexmanxyz)
Copyright (c) 2020, free to use in personal and commercial software as per the [license](/LICENSE).
