/*!
 * @splidejs/splide-extension-grid
 * Version  : 0.3.0
 * License  : MIT
 * Copyright: 2021 Naotoshi Fujita
 */
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) : factory();
})(function () {
  'use strict';

  var PROJECT_CODE = "splide";

  function isArray(subject) {
    return Array.isArray(subject);
  }

  function toArray(value) {
    return isArray(value) ? value : [value];
  }

  function forEach(values, iteratee) {
    toArray(values).forEach(iteratee);
  }

  var CLASS_SLIDE = PROJECT_CODE + "__slide";
  var CLASS_CONTAINER = CLASS_SLIDE + "__container";
  var EVENT_VISIBLE = "visible";
  var EVENT_HIDDEN = "hidden";
  var EVENT_REFRESH = "refresh";
  var EVENT_UPDATED = "undated";
  var EVENT_DESTROY = "destroy";

  function EventInterface(Splide4) {
    var event = Splide4.event;
    var key = {};
    var listeners = [];

    function on(events, callback, priority) {
      event.on(events, callback, key, priority);
    }

    function off(events) {
      event.off(events, key);
    }

    function bind(targets, events, callback, options) {
      forEachEvent(targets, events, function (target, event2) {
        listeners.push([target, event2, callback, options]);
        target.addEventListener(event2, callback, options);
      });
    }

    function unbind(targets, events) {
      forEachEvent(targets, events, function (target, event2) {
        listeners = listeners.filter(function (listener) {
          if (listener[0] === target && listener[1] === event2) {
            target.removeEventListener(event2, listener[2], listener[3]);
            return false;
          }

          return true;
        });
      });
    }

    function forEachEvent(targets, events, iteratee) {
      forEach(targets, function (target) {
        if (target) {
          events.split(" ").forEach(iteratee.bind(null, target));
        }
      });
    }

    function destroy() {
      listeners = listeners.filter(function (data) {
        return unbind(data[0], data[1]);
      });
      event.offBy(key);
    }

    event.on(EVENT_DESTROY, destroy, key);
    return {
      on: on,
      off: off,
      emit: event.emit,
      bind: bind,
      unbind: unbind,
      destroy: destroy
    };
  }

  function empty2(array) {
    array.length = 0;
  }

  function isObject2(subject) {
    return !isNull2(subject) && typeof subject === "object";
  }

  function isArray2(subject) {
    return Array.isArray(subject);
  }

  function isString2(subject) {
    return typeof subject === "string";
  }

  function isNull2(subject) {
    return subject === null;
  }

  function isHTMLElement2(subject) {
    return subject instanceof HTMLElement;
  }

  function toArray2(value) {
    return isArray2(value) ? value : [value];
  }

  function forEach2(values, iteratee) {
    toArray2(values).forEach(iteratee);
  }

  function push2(array, items) {
    array.push.apply(array, toArray2(items));
    return array;
  }

  var arrayProto2 = Array.prototype;

  function slice2(arrayLike, start, end) {
    return arrayProto2.slice.call(arrayLike, start, end);
  }

  function find2(arrayLike, predicate) {
    return slice2(arrayLike).filter(predicate)[0];
  }

  function toggleClass2(elm, classes, add) {
    if (elm) {
      forEach2(classes, function (name) {
        if (name) {
          elm.classList[add ? "add" : "remove"](name);
        }
      });
    }
  }

  function addClass2(elm, classes) {
    toggleClass2(elm, classes, true);
  }

  function append2(parent, children3) {
    forEach2(children3, parent.appendChild.bind(parent));
  }

  function matches2(elm, selector) {
    return (elm["msMatchesSelector"] || elm.matches).call(elm, selector);
  }

  function children2(parent, selector) {
    return parent ? slice2(parent.children).filter(function (child3) {
      return matches2(child3, selector);
    }) : [];
  }

  function child2(parent, selector) {
    return selector ? children2(parent, selector)[0] : parent.firstElementChild;
  }

  function forOwn2(object, iteratee) {
    if (object) {
      var keys = Object.keys(object);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        if (key !== "__proto__") {
          if (iteratee(object[key], key) === false) {
            break;
          }
        }
      }
    }

    return object;
  }

  function assign2(object) {
    for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      sources[_key - 1] = arguments[_key];
    }

    sources.forEach(function (source) {
      forOwn2(source, function (value, key) {
        object[key] = source[key];
      });
    });
    return object;
  }

  function removeAttribute2(elm, attrs) {
    if (elm) {
      forEach2(attrs, function (attr) {
        elm.removeAttribute(attr);
      });
    }
  }

  function setAttribute2(elm, attrs, value) {
    if (isObject2(attrs)) {
      forOwn2(attrs, function (value2, name) {
        setAttribute2(elm, name, value2);
      });
    } else {
      isNull2(value) ? removeAttribute2(elm, attrs) : elm.setAttribute(attrs, String(value));
    }
  }

  function create2(tag, attrs, parent) {
    var elm = document.createElement(tag);

    if (attrs) {
      if (isString2(attrs) || isArray2(attrs)) {
        addClass2(elm, attrs);
      } else {
        setAttribute2(elm, attrs);
      }
    }

    if (parent) {
      append2(parent, elm);
    }

    return elm;
  }

  function queryAll2(parent, selector) {
    return slice2(parent.querySelectorAll(selector));
  }

  function remove2(nodes) {
    forEach2(nodes, function (node) {
      if (node && node.parentNode) {
        node.parentNode.removeChild(node);
      }
    });
  }

  function removeClass2(elm, classes) {
    toggleClass2(elm, classes, false);
  }

  function unit2(value) {
    return isString2(value) ? value : value ? value + "px" : "";
  }

  function pad2(number) {
    return number < 10 ? "0" + number : "" + number;
  }

  var CLASS_SLIDE_ROW = CLASS_SLIDE + "__row";
  var CLASS_SLIDE_COL = CLASS_SLIDE + "--col";
  var DEFAULTS2 = {
    rows: 1,
    cols: 1,
    dimensions: [],
    gap: {}
  };

  function Dimension(options) {
    function get() {
      var dimensions = options.dimensions;
      return isArray2(dimensions) ? dimensions : [];
    }

    function getAt(index) {
      var rows = options.rows,
          cols = options.cols;
      var dimensions = get();
      return dimensions[index] || [rows, cols];
    }

    return {
      getAt: getAt
    };
  }

  function Style2() {
    var style3;
    var sheet;

    function mount() {
      style3 = create2("style", {}, document.head);
      sheet = style3.sheet;
    }

    function destroy() {
      remove2(style3);
      sheet = null;
    }

    function rule(selector, prop, value) {
      var _sheet = sheet,
          cssRules = _sheet.cssRules;
      var cssRule = find2(cssRules, function (cssRule2) {
        return isCSSStyleRule(cssRule2) && cssRule2.selectorText === selector;
      }) || cssRules[sheet.insertRule(selector + "{}", 0)];

      if (isCSSStyleRule(cssRule)) {
        cssRule.style[prop] = "" + value;
      }
    }

    function ruleBy(target, prop, value) {
      rule("#" + (isHTMLElement2(target) ? target.id : target), prop, value);
    }

    function isCSSStyleRule(cssRule) {
      return cssRule instanceof CSSStyleRule;
    }

    return {
      mount: mount,
      destroy: destroy,
      rule: rule,
      ruleBy: ruleBy
    };
  }

  function Layout2(Splide4, gridOptions, Dimension2) {
    var _EventInterface = EventInterface(Splide4),
        on = _EventInterface.on,
        destroyEvent = _EventInterface.destroy;

    var Components2 = Splide4.Components,
        options = Splide4.options;
    var resolve = Components2.Direction.resolve;
    var forEach3 = Components2.Slides.forEach;
    var Style3 = Style2();
    var rule = Style3.rule;

    function mount() {
      Style3.mount();
      layout();

      if (options.slideFocus) {
        on(EVENT_VISIBLE, onVisible);
        on(EVENT_HIDDEN, onHidden);
      }
    }

    function destroy() {
      forEach3(function (Slide2) {
        toggleTabIndex(Slide2.slide, false);
      });
      Style3.destroy();
      destroyEvent();
    }

    function layout() {
      forEach3(function (Slide2) {
        var slide = Slide2.slide;

        var _Dimension2$getAt = Dimension2.getAt(Slide2.index),
            rows = _Dimension2$getAt[0],
            cols = _Dimension2$getAt[1];

        var rowSelector = buildSelector(slide);
        layoutRow(rows, rowSelector);
        layoutCol(cols, buildSelector(slide, true));
        getColsIn(Slide2.slide).forEach(function (colSlide, index) {
          colSlide.id = Slide2.slide.id + "-col" + pad2(index + 1);
          cover(colSlide);
        });
      });
    }

    function layoutRow(rows, selector) {
      var rowGap = gridOptions.gap.row;
      var height = "calc(" + 100 / rows + "%" + (rowGap ? " - " + unit2(rowGap) + " * " + (rows - 1) / rows : "") + ")";
      rule(selector, "height", height);
      rule(selector, "display", "flex");
      rule(selector, "margin", "0 0 " + unit2(rowGap) + " 0");
      rule(selector, "padding", 0);
      rule(selector + ":last-child", "marginBottom", 0);
    }

    function layoutCol(cols, selector) {
      var colGap = gridOptions.gap.col;
      var width = "calc(" + 100 / cols + "%" + (colGap ? " - " + unit2(colGap) + " * " + (cols - 1) / cols : "") + ")";
      rule(selector, "width", width);
      rule(selector + ":not(:last-child)", resolve("marginRight"), unit2(colGap));
    }

    function cover(colSlide) {
      var container = child2(colSlide, "." + CLASS_CONTAINER);
      var img = child2(container || colSlide, "img");

      if (img && img.src) {
        var selector = "#" + colSlide.id + (container ? " > ." + CLASS_CONTAINER : "");
        rule(selector, "background", "center/cover no-repeat url(\"" + img.src + "\")");
        rule(selector + " > img", "display", "none");
      }
    }

    function buildSelector(slide, col) {
      return "#" + slide.id + " > ." + CLASS_SLIDE_ROW + (col ? " > ." + CLASS_SLIDE_COL : "");
    }

    function getColsIn(slide) {
      return queryAll2(slide.parentElement, buildSelector(slide, true));
    }

    function toggleTabIndex(slide, add) {
      getColsIn(slide).forEach(function (colSlide) {
        setAttribute2(colSlide, "tabindex", add ? 0 : null);
      });
    }

    function onVisible(Slide2) {
      toggleTabIndex(Slide2.slide, true);
    }

    function onHidden(Slide2) {
      toggleTabIndex(Slide2.slide, false);
    }

    return {
      mount: mount,
      destroy: destroy
    };
  }

  function Grid(Splide4, Components2, options) {
    var _EventInterface2 = EventInterface(Splide4),
        on = _EventInterface2.on,
        off = _EventInterface2.off;

    var Elements2 = Components2.Elements;
    var gridOptions = {};
    var Dimension2 = Dimension(gridOptions);
    var Layout3 = Layout2(Splide4, gridOptions, Dimension2);
    var modifier = CLASS_SLIDE + "--grid";
    var originalSlides = [];

    function setup() {
      options.grid = assign2({}, DEFAULTS2, options.grid || {});
    }

    function mount() {
      init();
      on(EVENT_UPDATED, init);
    }

    function init() {
      assign2(gridOptions, options.grid || DEFAULTS2);

      if (hasGrid()) {
        push2(originalSlides, Elements2.slides);
        addClass2(Splide4.root, modifier);
        append2(Elements2.list, build());
        on(EVENT_REFRESH, layout);
        refresh();
      } else if (originalSlides.length) {
        destroy();
        refresh();
      }
    }

    function destroy() {
      Layout3.destroy();
      originalSlides.forEach(function (slide) {
        removeClass2(slide, CLASS_SLIDE_COL);
        append2(Elements2.list, slide);
      });
      remove2(Elements2.slides);
      removeClass2(Splide4.root, modifier);
      empty2(originalSlides);
      off(EVENT_REFRESH);
    }

    function refresh() {
      Splide4.refresh();
    }

    function layout() {
      if (hasGrid()) {
        Layout3.mount();
      }
    }

    function build() {
      var outerSlides = [];
      var row = 0,
          col = 0;
      var outerSlide, rowSlide;
      Components2.Slides.forEach(function (Slide2) {
        var slide = Slide2.slide,
            index = Slide2.index;

        var _Dimension2$getAt2 = Dimension2.getAt(index),
            rows = _Dimension2$getAt2[0],
            cols = _Dimension2$getAt2[1];

        if (!col) {
          if (!row) {
            outerSlide = create2(slide.tagName, CLASS_SLIDE);
            outerSlides.push(outerSlide);
          }

          rowSlide = buildRow(rows, slide, outerSlide);
        }

        buildCol(cols, slide, rowSlide);

        if (++col >= cols) {
          col = 0;
          row = ++row >= rows ? 0 : row;
        }
      }, true);
      return outerSlides;
    }

    function buildRow(rows, slide, outerSlide) {
      var tag = slide.tagName.toLowerCase() === "li" ? "ul" : "div";
      return create2(tag, CLASS_SLIDE_ROW, outerSlide);
    }

    function buildCol(cols, slide, rowSlide) {
      addClass2(slide, CLASS_SLIDE_COL);
      append2(rowSlide, slide);
      return slide;
    }

    function hasGrid() {
      if (options.grid) {
        var rows = gridOptions.rows,
            cols = gridOptions.cols,
            dimensions = gridOptions.dimensions;
        return rows > 1 || cols > 1 || isArray2(dimensions) && dimensions.length > 0;
      }

      return false;
    }

    return {
      setup: setup,
      mount: mount,
      destroy: destroy
    };
  }

  if (typeof window !== "undefined") {
    window.splide = window.splide || {};
    window.splide.Extensions = window.splide.Extensions || {};
    window.splide.Extensions.Grid = Grid;
  }
  /*!
   * Splide.js
   * Version  : 3.0.0
   * License  : MIT
   * Copyright: 2021 Naotoshi Fujita
   */

});
