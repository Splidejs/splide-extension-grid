/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/js/utils/index.js
/**
 * Utility export functions.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * Apply styles to the given element.
 *
 * @param {HTMLElement} elm    - An element where styles are applied.
 * @param {Object}      styles - Object containing styles.
 */
function applyStyle(elm, styles) {
  Object.keys(styles).forEach(function (key) {
    elm.style[key] = styles[key];
  });
}
/**
 * Iterate an object like Array.forEach.
 *
 * @param {Object}   obj      - An object.
 * @param {function} callback - A export function handling each value. Arguments are value, property and index.
 */

function each(obj, callback) {
  Object.keys(obj).some(function (key, index) {
    return callback(obj[key], key, index);
  });
}
/**
 * Append px unit to the given subject if necessary.
 *
 * @param {number|string} value - A value that may not include an unit.
 *
 * @return {string} - If the value is string, return itself.
 *                    If number, do value + "px". An empty string, otherwise.
 */

function unit(value) {
  var type = typeof value;

  if (type === 'number' && value > 0) {
    return parseFloat(value) + 'px';
  }

  return type === 'string' ? value : '';
}
// CONCATENATED MODULE: ./src/js/constants/defaults.js
/**
 * Export default options.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */
var DEFAULTS = {
  /**
   * Number of rows.
   *
   * @type {number}
   */
  rows: 1,

  /**
   * Number of cols.
   *
   * @type {number}
   */
  cols: 1,

  /**
   * Collection of dimensions(rows and cols) as an array.
   * If the value is [ [ 1, 1 ], [ 2, 2 ] ], the first slide will be 1x1 and next all slides will be 2x2.
   * "rows" and "cols" options are ignored when this option is provided.
   *
   * @type {Array[]|boolean}
   */
  dimensions: false,

  /**
   * Gaps for rows or cols.
   *
   * @example
   * gap: {
   *   row: 1em,
   *   col: 1em,
   * }
   *
   * @type {Object}
   */
  gap: {}
};
// CONCATENATED MODULE: ./src/js/splide-extension-grid.js
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * The extension component for grid.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */


/**
 * The data attribute name for temporarily saving grid width.
 *
 * @type {string}
 */

var GRID_WIDTH_DATA_ATTRIBUTE_NAME = 'data-splide-grid-width';
/**
 * The extension component for grid.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - Extension object.
 */

/* harmony default export */ var splide_extension_grid = (function (Splide, Components) {
  /**
   * Hold the latest grid options.
   * 
   * @type {Object}
   */
  var options;
  /**
   * Hold the original slides.
   *
   * @type {Element[]|undefined}
   */

  var originalSlides;
  /**
   * Hold the Elements component.
   *
   * @type {Object}
   */

  var Elements = Components.Elements;
  /**
   * Class name for a slide.
   *
   * @type {string}
   */

  var slideClass = Splide.classes.slide.split(' ')[0];
  /**
   * Class name for rows.
   *
   * @type {string}
   */

  var rowClass = slideClass ? slideClass + '__row' : '';
  /**
   * Class name for cols.
   *
   * @type {string}
   */

  var colClass = slideClass ? slideClass + '--col' : '';
  /**
   * Grid extension object.
   *
   * @type {Object}
   */

  var Grid = {
    /**
     * Called when the extension is mounted.
     */
    mount: function mount() {
      var _this = this;

      this.initOptions();
      originalSlides = Elements.slides;
      options = Splide.options.grid;

      if (this.shouldActivate()) {
        this.init();
      }

      Splide.on('updated', function () {
        options = Splide.options.grid;

        if (_this.shouldActivate()) {
          _this.init();
        } else {
          _this.destroy();
        }
      });

      if (Splide.options.accessibility) {
        Splide.on('visible', function (Slide) {
          return _this.updateA11y(Slide, true);
        });
        Splide.on('hidden', function (Slide) {
          return _this.updateA11y(Slide, false);
        });
      }
    },

    /**
     * Destroy the extension.
     */
    destroy: function destroy() {
      if (originalSlides) {
        var list = Elements.list;
        var fragment = document.createDocumentFragment(); // Move slides to the fragment temporarily.

        originalSlides.forEach(function (slide) {
          fragment.appendChild(slide);
        });
        list.innerHTML = '';
        originalSlides.forEach(function (slide) {
          list.appendChild(slide);
          slide.classList.remove(colClass);
          slide.removeAttribute('style');
        });
        Elements.slides = originalSlides;
        this.toggleRootClassModifiers('grid', true);
        Splide.refresh();
      }
    },

    /**
     * Initialize options.
     */
    initOptions: function initOptions() {
      if (typeof Splide.options.grid !== 'object') {
        Splide.options.grid = {};
      }

      Splide.options.grid = _extends({}, DEFAULTS, {}, Splide.options.grid);
    },

    /**
     * Whether to activate the grid mode or not.
     *
     * @return {boolean} - True if th
     */
    shouldActivate: function shouldActivate() {
      var _Splide$options$grid = Splide.options.grid,
          rows = _Splide$options$grid.rows,
          cols = _Splide$options$grid.cols,
          dimensions = _Splide$options$grid.dimensions;
      return rows > 1 || cols > 1 || dimensions;
    },

    /**
     * Initialization.
     */
    init: function init() {
      if (originalSlides.length) {
        Elements.slides = this.buildGrid();
        originalSlides.forEach(function (slide) {
          slide.removeAttribute('id');
        });
        Splide.refresh();
        this.toggleRootClassModifiers('grid');
        this.setStyles();
      }
    },

    /**
     * Add or remove root class modifiers.
     *
     * @param {string|string[]} modifiers - Modifier(s).
     * @param {boolean}         remove    - Optional. Whether to ser or remove modifiers.
     */
    toggleRootClassModifiers: function toggleRootClassModifiers(modifiers, remove) {
      if (remove === void 0) {
        remove = false;
      }

      var rootClass = Splide.classes.root.split(' ')[0];

      if (rootClass) {
        if (!Array.isArray(modifiers)) {
          modifiers = [modifiers];
        }

        modifiers.forEach(function (modifier) {
          Splide.root.classList[remove ? 'remove' : 'add'](rootClass + "--" + modifier);
        });
      }
    },

    /**
     * Set styles to inner slide elements.
     */
    setStyles: function setStyles() {
      var _this2 = this;

      Elements.each(function (Slide) {
        var marginProp = Components.Layout.margin;
        each(Slide.slide.querySelectorAll("." + colClass), function (slide) {
          var _applyStyle;

          var _options$gap$col = options.gap.col,
              colGap = _options$gap$col === void 0 ? 0 : _options$gap$col;
          applyStyle(slide, (_applyStyle = {
            width: slide.getAttribute(GRID_WIDTH_DATA_ATTRIBUTE_NAME),
            height: '100%'
          }, _applyStyle[marginProp] = "" + unit(colGap), _applyStyle));
          slide.removeAttribute(GRID_WIDTH_DATA_ATTRIBUTE_NAME);

          _this2.cover(slide);
        });
        applyStyle(Slide.slide.lastElementChild, {
          marginBottom: '0'
        });
        each(Slide.slide.children, function (child) {
          var _applyStyle2;

          applyStyle(child.lastElementChild, (_applyStyle2 = {}, _applyStyle2[marginProp] = '0', _applyStyle2));
        });
      });
    },

    /**
     * Cover the slide with an inner image if available.
     *
     * @param {Element} slide - An inner slide element.
     */
    cover: function cover(slide) {
      if (Splide.options.cover) {
        var img = slide.querySelector('img');

        if (img && img.src) {
          applyStyle(slide, {
            background: "center/cover no-repeat url(\"" + img.src + "\")"
          });
          applyStyle(img, {
            display: 'none'
          });
        }
      }
    },

    /**
     * Build grid.
     * Create outerSlide, row, col elements and push them to specific arrays.
     *
     * @reeturn {Element[]} - Created outer slide elements.
     */
    buildGrid: function buildGrid() {
      var outerSlides = [];
      var outerSlide, rowElm, colElm;
      var r = 0,
          c = 0;

      for (var i = 0; i < originalSlides.length; i++) {
        var _this$getDimension = this.getDimension(i),
            rows = _this$getDimension.rows,
            cols = _this$getDimension.cols;

        var slide = originalSlides[i];

        if (c === 0) {
          if (r === 0) {
            outerSlide = document.createElement(slide.tagName);
            outerSlide.classList.add(Splide.classes.slide);
            outerSlides.push(outerSlide); // Elements.list.appendChild( outerSlide );
          }

          rowElm = this.createRow(rows);
          outerSlide.appendChild(rowElm);
        }

        colElm = this.createCol(cols, slide);
        rowElm.appendChild(colElm);
        c++;

        if (c >= cols) {
          r++;
          c = 0;
        }

        if (r >= rows) {
          r = 0;
          c = 0;
        }
      }

      Elements.list.innerHTML = '';
      outerSlides.forEach(function (slide) {
        Elements.list.appendChild(slide);
      });
      return outerSlides;
    },

    /**
     * Return dimension(rows and cols) according to the given index.
     *
     * @param {number} index - Slide index.
     *
     * @return {Object} - An object containing rows and cols.
     */
    getDimension: function getDimension(index) {
      var _options = options,
          rows = _options.rows,
          cols = _options.cols;
      var total = 0;

      if (options.dimensions) {
        each(options.dimensions, function (dimension) {
          rows = dimension[0] || 1;
          cols = dimension[1] || 1;
          total += rows * cols;
          return index < total;
        });
      }

      return {
        rows: rows,
        cols: cols
      };
    },

    /**
     * Create an element for a row.
     *
     * @param {number} rows - Number of rows.
     *
     * @return {Element} - A created element.
     */
    createRow: function createRow(rows) {
      var _options$gap$row = options.gap.row,
          rowGap = _options$gap$row === void 0 ? 0 : _options$gap$row;
      var slide = originalSlides[0];
      var rowElm = document.createElement(slide.tagName.toLowerCase() === 'li' ? 'ul' : 'div');
      rowElm.classList.add(rowClass);
      var height = "calc( " + 100 / rows + "%";

      if (rowGap) {
        height += " - " + unit(rowGap) + " * " + (rows - 1) / rows + " )";
      }

      applyStyle(rowElm, {
        height: height,
        display: 'flex',
        margin: "0 0 " + unit(rowGap) + " 0",
        padding: '0'
      });
      return rowElm;
    },

    /**
     * Create an element for a col.
     * Currently use the given slide itself as a col element.
     *
     * @param {number}  cols  - Number of cols.
     * @param {Element} slide - A slide element.
     *
     * @return {Element} - A created element.
     */
    createCol: function createCol(cols, slide) {
      var _options2 = options,
          _options2$gap$col = _options2.gap.col,
          colGap = _options2$gap$col === void 0 ? 0 : _options2$gap$col;
      var width = "calc( " + 100 / cols + "%";

      if (colGap) {
        width += " - " + unit(colGap) + " * " + (cols - 1) / cols + " )";
      }

      slide.classList.add(colClass);
      slide.setAttribute(GRID_WIDTH_DATA_ATTRIBUTE_NAME, width);
      return slide;
    },

    /**
     * Update attributes related with accessibility.
     *
     * @param {Object}  Slide     - A slide object.
     * @param {boolean} isVisible - True if the slide is made visible, or false otherwise.
     */
    updateA11y: function updateA11y(Slide, isVisible) {
      each(Slide.slide.querySelectorAll("." + colClass), function (slide) {
        slide.setAttribute('tabindex', isVisible ? 0 : -1);
      });
    },

    /**
     * Return generated class name for rows.
     *
     * @return {string} - Class name for rows.
     */
    get rowClass() {
      return rowClass;
    },

    /**
     * Return generated class name for cols.
     *
     * @return {string} - Class name for cols.
     */
    get colClass() {
      return colClass;
    }

  };
  return Grid;
});
// CONCATENATED MODULE: ./build/global/global.js
/**
 * Set the Grid extension to the global object.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

window.splide = window.splide || {};
window.splide.Extensions = window.splide.Extensions || {};
window.splide.Extensions.Grid = splide_extension_grid;

/***/ })
/******/ ]);