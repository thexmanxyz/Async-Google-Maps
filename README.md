# Async Google Maps
This project contains a simple and full configurable jQuery plugin which asynchronously loads one or multiple Google Maps instances located on a page. The plugin is fully configurable and the loading is triggered when the map container is scrolled into viewport. If you want to try it yourself, simply download the latest version and follow the installation guide below. 

## Prerequisites
* Basic web frontend knowledge
* jQuery core library

## Download / Installation
1. [Download v1.2.0](https://github.com/thexmanxyz/Async-Google-Maps/archive/v1.2.0.zip) of Async Google Maps
2. Extract the files and copy them to your website folder
3. Define the CSS and JS resource files in your HTML page. You can also place the `<script>` tag after your `<body>` content. Basic resource import example:
   * **JS (< 3kB):**
   ```HTML
   <script src="js/async-google-maps.min.js"></script>
   ```
   * **CSS (< 2kB):** only necessary for spinner
   ```HTML
   <link href="css/async-google-maps.min.css" rel="stylesheet">
   ```
   * **SCSS (< 2kB):** if you want to use SCSS instead, only necessary for spinner
   ```SCSS
   @import 'async-google-maps.scss';
   ```
4. Initialize the plugin with basic values as follows:
   ```JS
   $('.g-maps').asyncGoogleMaps({});
   ```
   
   or

   ```JS
   jQuery('.g-maps').asyncGoogleMaps({});
   ```
5. If you want to further customize the appearance or behavior please take a closer look on the plugin parameters and their explanation listed in the next section.

## Resource Configuration
Please mind the following stylesheets resources and their explanation when you want to adjust the spinner type. This influences the footprint of your site but you can also omit the `<link>` tag completely if you don't need a spinner.

   * **CSS:**
       * `async-google-maps.min.css` for simple included spinner (< 2kB)
       * `async-google-maps-lio.min.css` for [Loading.io](https://loading.io/css/) pure CSS spinners
       * `async-google-maps-cl.min.css` for [CSS-Loader](https://projects.lukehaas.me/css-loaders/) pure CSS spinners
       * `async-google-maps-all.min.css` includes all spinners but bigger footsprint

   * **SCSS:**
       * `_async-google-maps.scss` for simple included spinner (< 2kB)
       * `_async-google-maps-lio.scss` for [Loading.io](https://loading.io/css/) pure CSS spinners
       * `_async-google-maps-cl.scss` for [CSS-Loader](https://projects.lukehaas.me/css-loaders/) pure CSS spinners
       * `_async-google-maps-all.scss` includes all spinners but bigger footsprint

## Configuration and Parameters
The plugin can be easily configured during the initialization and the following parameters are currently available. The listing contains the parameters together with their default values.

- `offset: 0,` | Offset in pixel. A negative offset will trigger loading earlier, a postive value later.
- `fixHeight: false,` | Fix height of Google Maps `<iframe>` in dependence of height attribute ([explanation](https://github.com/thexmanxyz/Async-Google-Maps#layout-reflow)).
- `spinner: {` | Spinner options
    - `attach: false,` | Defines whether a spinner should be attached automatically.
    - `remove: false,` | Defines whether a spinner should be removed automatically after load.
    - `type: 'included',` | The spinner type which should be used. The following values are supported:
        - `'included'` | simple build-in CSS spinner
        - `'bootstrap'` | Bootstrap spinner, requires version >= 4.2
        - `'custom'` | any custom spinner or library
    - `spinnerClass: 'async-gmaps-spinner',` | CSS class added to the spinner container or used for removal.
    - `bsSpinnerClass: 'spinner-border',` | The Bootstrap spinner class. Either `'spinner-border'` or `'spinner-grow'`.
    - `customSpinner: '',` | Any custom spinner container passed as HTML can be used here.
    - `delay: 10000},` | Time in milliseconds waited before the spinner is removed.
- `isInViewport: function(){ ... },` | Determines if container is in viewport.
- `setHeight: function(){ ... },` | Sets `min-height` for the Google Maps `<iframe>`.
- `attachSpinner: function() { ... },` |Defines the spinner attach behavior.
- `removeSpinner: function(){ ... },` | Defines the spinner removal behavior.
- `triggerAsyncLoad: function(){ ... },` | Defines when the maps should be loaded.
- `checkAndLoad: function(){ ... },` | Calls the async load and check routine.
- `beforeLoad: function(){ ... },` | Called before the async load was initiated.
- `afterLoad: function(){ ... }` | Called after the async load was initiated.

### Google Maps `<iframe>`
To make this plugin working for your Google Maps `<iframe>` please change the `src`-attribute to `data-src` and add the class `g-maps` e.g.:

```HTML
<iframe class="g-maps" data-src="{your-google-maps-url}" width="100%" height="400" frameborder="0" style="border:0" allowfullscreen></iframe>
```

### Examples
The following example shows how you can specify plugin parameters to change the default offset and remove a pre-defined spinner.

```Javascript
$('.g-maps').asyncGoogleMaps({
  offset: -100,
  spinner: {
    remove: true
  }
});
```

If you want to use the basic build-in spinner, configure the plugin with the following parameters:

```Javascript
$('.g-maps').asyncGoogleMaps({
  spinner: {
    attach: true, 
    remove: true
  }
});
```

### Advanced Spinner Usage
If you want to use a Bootstrap 4 spinner, configure the plugin with the following parameters:

```Javascript
$('.g-maps').asyncGoogleMaps({
  spinner: {
    attach: true, 
    remove: true, 
    type: 'bootstrap', 
    bsSpinnerClass: 'spinner-grow'
  }
});
```

Currently two spinner types are supported by Bootstrap `'spinner-border'` and `'spinner-grow'`. If you want to use the included Loading.io spinners, configure the plugin with the following paramters:

```Javascript
$('.g-maps').asyncGoogleMaps({
  spinner: {
    attach: true,
    remove: true,
    type: 'custom',
    customSpinner: '<div class="lds-dual-ring"></div>'
  }
});
```

Please visit [Loading.io](https://loading.io/css/) to find out more about the `customSpinner` parameter with is used to define each of the supported spinners. The following spinners are included:

**Circle:**
```HTML
<div class="lds-circle"><div></div></div>
```

**Dual Ring:**
```HTML
<div class="lds-dual-ring"></div>
```

**Facebook:**
```HTML
<div class="lds-facebook"><div></div><div></div><div></div></div>
```

**Heart:**
```HTML
<div class="lds-heart"><div></div></div>
```

**Ring:**
```HTML
<div class="lds-ring"><div></div><div></div><div></div><div></div></div>
```

**Roller:**
```HTML
<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
```

**Default:**
```HTML
<div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
```

**Ellipsis:**
```HTML
<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
```

**Grid:**
```HTML
<div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
```

**Hourglass:**
```HTML
<div class="lds-hourglass"></div>
```

**Ripple:**
```HTML
<div class="lds-ripple"><div></div><div></div></div>
```

**Spinner:**
```HTML
<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
```

You can also use e.g. `lds-circle-small` to scale the spinner down to 75% (~48px) of the original size (~64px). This works for every of the above outlined spinners. If you want to use the included CSS-Loader spinners, configure the plugin with the following parameters:

```Javascript
$('.g-maps').asyncGoogleMaps({
  spinner: {
    attach: true,
    remove: true,
    type: 'custom',
    customSpinner: '<div class="load1 loader">Loading...</div>'
  }
});
```

If you want a different appearance for the CSS-Loader spinners change `load1` to `load2` - `load8` or `load1-small` - `load8-small`. More information about the supported CSS-Loader spinners can be found [here](https://projects.lukehaas.me/css-loaders/). The following spinners are included:

```HTML
<div class="load1 loader">Loading...</div>
```

```HTML
<div class="load2 loader">Loading...</div>
```

```HTML
<div class="load3 loader">Loading...</div>
```

```HTML
<div class="load4 loader">Loading...</div>
```

```HTML
<div class="load5 loader">Loading...</div>
```

```HTML
<div class="load6 loader">Loading...</div>
```

```HTML
<div class="load7 loader">Loading...</div>
```

```HTML
<div class="load8 loader">Loading...</div>
```

With the class `load1-small` the spinner is scaled down to 50% of the original size (~110px) which equals ~ 55px in width and height. The included simple spinner occupies (~32px). Feel free to change the size for your desired spinner appropriately.

### Layout Reflow
If you load content and elements asynchronously please be aware that it is necessary to reserve space for the Google Maps container. This is necessary to prevent container resizing which leads to a unpleasant rearrangement of the page layout during loading. To counter this drawback please use the following plugin configuration:

```JS
$('.g-maps').asyncGoogleMaps({fixHeight: true});
```

or take a look at the following CSS:


```CSS
.g-maps { min-height: 400px; } // please take your default container height

```

## Features
* load Google Maps asynchronously to get better Google PageSpeed Insights rating
* offset to load Google Maps at the desired scroll position
* full-fledged spinner configuration used as placeholder while map loads
  * attach / remove spinner
  * use different spinner types
    * basic included spinner
    * Bootstrap spinners (requires version >= 4.2)
    * custom spinner appliance ([Loading.io](https://loading.io/css/) and [CSS-Loader](https://projects.lukehaas.me/css-loaders/) pure CSS spinners included)
    * or use any other pure CSS spinner you like
* option to prevent layout reflow by auto detecting Google Maps fixed height
* fully customizable through different callback methods at important execution points

## Future Tasks
- [ ] Create better scaling scheme for the Loading.io spinners (64/48px), the CSS-Loader spinners (110/55px) and the included simple spinner (32px).

## Known Issues
None

## Dependencies
* [jQuery](https://jquery.com/)
* [CSS-Loader](https://projects.lukehaas.me/css-loaders/)
* [Loading.io CSS-Spinner](https://loading.io/css/)

## Credits
Thanks to the jQuery team for this [great plugin tutorial](https://learn.jquery.com/plugins/basic-plugin-creation/).

Thanks to [Loading.io](https://loading.io) for providing a fancy [set of spinners](https://github.com/loadingio/css-spinner/).

Thanks to [Luke Haas](https://projects.lukehaas.me) for providing a fancy [set of spinners](https://github.com/lukehaas/css-loaders).

## by [thex](https://github.com/thexmanxyz)
Copyright (c) 2020, free to use in personal and commercial software as per the [license](/LICENSE).
