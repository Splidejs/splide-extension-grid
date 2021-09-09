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
  var EVENT_REFRESH = "refresh";
  var EVENT_DESTROY = "destroy";

  function EventInterface(Splide3) {
    var event = Splide3.event;
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

  function toArray2(value) {
    return isArray2(value) ? value : [value];
  }

  function forEach2(values, iteratee) {
    toArray2(values).forEach(iteratee);
  }

  var arrayProto2 = Array.prototype;

  function slice2(arrayLike, start, end) {
    return arrayProto2.slice.call(arrayLike, start, end);
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

  function merge2(object, source) {
    forOwn2(source, function (value, key) {
      object[key] = isObject2(value) ? merge2(isObject2(object[key]) ? object[key] : {}, value) : value;
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

  function unit2(value) {
    return isString2(value) ? value : value ? value + "px" : "";
  }

  var min2 = Math.min,
      max2 = Math.max,
      floor2 = Math.floor,
      ceil2 = Math.ceil,
      abs2 = Math.abs,
      round = Math.round;

  function pad2(number) {
    return number < 10 ? "0" + number : "" + number;
  }

  var CLASS_SLIDE_ROW = CLASS_SLIDE + "__row";
  var CLASS_SLIDE_COL = CLASS_SLIDE + "--col";
  var DEFAULTS2 = {
    rows: 1,
    cols: 1,
    gap: {}
  };

  function Dimension(options) {
    function get() {
      var rows = options.rows,
          cols = options.cols,
          _options$dimensions = options.dimensions,
          dimensions = _options$dimensions === void 0 ? [] : _options$dimensions;
      dimensions.push([rows, cols]);
      return dimensions;
    }

    function getAt(index) {
      var dimensions = get();
      return dimensions[min2(index, dimensions.length - 1)];
    }

    return {
      getAt: getAt
    };
  }

  function Layout2(Splide3, Components2, options, gridOptions, dimension) {
    var ruleBy = Components2.Style.ruleBy;
    var resolve = Components2.Direction.resolve;

    function layout() {
      Components2.Slides.forEach(function (Slide2) {
        var _dimension$getAt = dimension.getAt(Slide2.index),
            rows = _dimension$getAt[0],
            cols = _dimension$getAt[1];

        children2(Slide2.slide, "." + CLASS_SLIDE_ROW).forEach(function (rowSlide, index) {
          layoutRow(rows, index, rowSlide, Slide2.slide);
          children2(rowSlide, "." + CLASS_SLIDE_COL).forEach(function (colSlide, index2) {
            layoutCol(cols, index2, colSlide, rowSlide);
          });
        });
      });
    }

    function layoutRow(rows, index, rowSlide, slide) {
      var rowGap = gridOptions.gap.row;
      var height = "calc(" + 100 / rows + "%" + (rowGap ? " - " + unit2(rowGap) + " * " + (rows - 1) / rows : "") + ")";
      rowSlide.id = slide.id + "-row" + pad2(index + 1);
      ruleBy(rowSlide, "height", height);
      ruleBy(rowSlide, "display", "flex");
      ruleBy(rowSlide, "margin", 0);
      ruleBy(rowSlide, "padding", 0);

      if (index < rows - 1) {
        ruleBy(rowSlide, "marginBottom", unit2(rowGap));
      }
    }

    function layoutCol(cols, index, colSlide, rowSlide) {
      var colGap = gridOptions.gap.col;
      var width = "calc(" + 100 / cols + "%" + (colGap ? " - " + unit2(colGap) + " * " + (cols - 1) / cols : "") + ")";
      colSlide.id = rowSlide.id + "-col" + pad2(index + 1);
      ruleBy(colSlide, "width", width);
      ruleBy(colSlide, resolve("marginRight"), unit2(colGap));
    }

    return {
      layout: layout
    };
  }

  function Grid(Splide3, Components2, options) {
    var _EventInterface = EventInterface(Splide3),
        on = _EventInterface.on;

    var gridOptions = merge2(merge2({}, DEFAULTS2), options.grid || {});
    Components2.Style;
    var dimension = Dimension(gridOptions);
    var layout = Layout2(Splide3, Components2, options, gridOptions, dimension);

    function mount() {
      var slides = build();
      append2(Components2.Elements.list, slides);
      listen();
      Splide3.refresh();
    }

    function listen() {
      on(EVENT_REFRESH, refresh);
    }

    function refresh() {
      layout.layout();
    }

    function build() {
      var outerSlides = [];
      var row = 0,
          col = 0;
      var outerSlide, slideRow;
      Components2.Slides.forEach(function (Slide2) {
        var slide = Slide2.slide,
            index = Slide2.index;

        var _dimension$getAt2 = dimension.getAt(index),
            rows = _dimension$getAt2[0],
            cols = _dimension$getAt2[1];

        if (!col) {
          if (!row) {
            outerSlide = create2(slide.tagName, CLASS_SLIDE);
            outerSlides.push(outerSlide);
          }

          slideRow = createRow(rows, slide, outerSlide);
        }

        createCol(cols, slide, slideRow);

        if (++col >= cols) {
          col = 0;
          row = ++row >= rows ? 0 : row;
        }
      }, true);
      return outerSlides;
    }

    function createRow(rows, slide, outerSlide) {
      var tag = slide.tagName.toLowerCase() === "li" ? "ul" : "div";
      return create2(tag, CLASS_SLIDE_ROW, outerSlide);
    }

    function createCol(cols, slide, slideRow) {
      slide.id = "";
      addClass2(slide, CLASS_SLIDE_COL);
      append2(slideRow, slide);
      return slide;
    }

    function destroy() {}

    return {
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
