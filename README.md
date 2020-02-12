# Grid - Splide Extension
This is an extension of the [Splide](https://github.com/Splidejs/splide) slider library for creating rows and cols in a slider.

![Sample Slider](./images/sample01.png)

* [Demo and Document](https://splidejs.com/extension-grid/)

## Installation
### NPM(Recommended)
1. Get the latest extension by NPM:
    ```bash
    $ npm install @splidejs/splide-extension-grid
    ```
1. Mount the extension to the Splide.
    ```javascript
    import Splide from '@splidejs/splide';
    import Grid from '@splidejs/splide-extension-grid';
    new Splide( '#splide' ).mount( { Grid } );
    ```
    
### CDN or Hosting Files
1. Visit [jsDelivr](https://www.jsdelivr.com/package/npm/@splidejs/splide-extension-grid) and get the links of the latest files or download files from the dist library.
1. Import minified JavaScript files on your site:
    ```html
    <script src="https://cdn.jsdelivr.net/npm/@splidejs/splide-extension-grid@0.1.2/dist/js/splide-extension-grid.min.js">
    ```
    Note that version numbers above are incorrect.
1. Mount the extension to the Splide.
    ```javascript
    new Splide( '#splide' ).mount( window.splide.Extensions );
    ```

## Available Options
Pass `grid` as an object to options:
```javascript
new Splide( '#splide', { grid: {
  rows: 2,
  cols: 2,
  gap : {
    row: '1rem',
    col: '1.5rem',
  }
} } ).mount( { Grid } );
```

* **rows**: Number of rows.
* **cols**: Number of columns.
* **dimensions**: Set of dimensions(rows and cols) such as `[ [ 1, 1 ], [ 2, 2 ] ]`. `rows` and `cols` are ignored when this option is provided.
* **gap**: An object containing gap size for rows and cols.

## License
Splide is released under the MIT license.  
© 2020 Naotoshi Fujita
