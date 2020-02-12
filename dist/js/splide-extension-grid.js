(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Splide"] = factory();
	else
		root["Splide"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
 * @param {Element} elm    - An element where styles are applied.
 * @param {Object}  styles - Object containing styles.
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
 * The extension component for grid.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - Extension object.
 */

/* harmony default export */ var splide_extension_grid = __webpack_exports__["default"] = (function (Splide, Components) {
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
        list.innerHTML = '';
        Elements.slides = originalSlides;
        originalSlides.forEach(function (slide) {
          list.appendChild(slide);
          slide.classList.remove(colClass);
          slide.removeAttribute('style');
        });
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
          cols = _Splide$options$grid.cols;
      return rows > 1 || cols > 1;
    },

    /**
     * Initialization.
     */
    init: function init() {
      originalSlides.forEach(function (slide) {
        slide.removeAttribute('id');
      });
      Elements.list.innerHTML = '';
      Elements.slides = this.buildGrid();
      Splide.refresh();
      this.toggleRootClassModifiers('grid');
      this.setStyles();
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

          var _options = options,
              cols = _options.cols,
              _options$gap$col = _options.gap.col,
              colGap = _options$gap$col === void 0 ? 0 : _options$gap$col;
          var width = "calc( " + 100 / cols + "%";

          if (colGap) {
            width += " - " + unit(colGap) + " * " + (cols - 1) / cols + " )";
          }

          applyStyle(slide, (_applyStyle = {
            width: width,
            height: '100%'
          }, _applyStyle[marginProp] = "" + unit(colGap), _applyStyle));

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
     *
     * @return {Element[]} - New slide elements.
     */
    buildGrid: function buildGrid() {
      var _this3 = this;

      var _options2 = options,
          rows = _options2.rows,
          cols = _options2.cols;
      var newSlides = [];
      var newSlide, rowElm;
      originalSlides.forEach(function (slide, index) {
        if (index % (rows * cols) === 0) {
          newSlide = document.createElement(slide.tagName);
          newSlide.classList.add(Splide.classes.slide);
          newSlides.push(newSlide);
          Elements.list.appendChild(newSlide);
        }

        if (index % cols === 0) {
          rowElm = _this3.createRow();
          newSlide.appendChild(rowElm);
        }

        slide.classList.add(colClass);
        rowElm.append(slide);
      });
      return newSlides;
    },

    /**
     * Create an element for a row.
     *
     * @return {Element} - A created element.
     */
    createRow: function createRow() {
      var _options3 = options,
          rows = _options3.rows,
          _options3$gap$row = _options3.gap.row,
          rowGap = _options3$gap$row === void 0 ? 0 : _options3$gap$row;
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
     * Update attributes related with accessibility.
     *
     * @param {Object}  Slide     - A slide object.
     * @param {boolean} isVisible - True if the slide is made visible, or false otherwise.
     */
    updateA11y: function updateA11y(Slide, isVisible) {
      each(Slide.slide.querySelectorAll("." + colClass), function (slide) {
        slide.setAttribute('tabindex', isVisible ? 0 : -1);
      });
    }
  };
  return Grid;
});

/***/ })
/******/ ]);
});