/*!
 * @splidejs/splide-extension-grid
 * Version  : 0.4.1
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) : factory();
})(function () {
  'use strict';

  function empty$1(array) {
    array.length = 0;
  }

  function slice$1(arrayLike, start, end) {
    return Array.prototype.slice.call(arrayLike, start, end);
  }

  function apply$1(func) {
    return func.bind.apply(func, [null].concat(slice$1(arguments, 1)));
  }

  function typeOf$1(type, subject) {
    return typeof subject === type;
  }

  var isArray$1 = Array.isArray;
  apply$1(typeOf$1, "function");
  apply$1(typeOf$1, "string");
  apply$1(typeOf$1, "undefined");

  function toArray$1(value) {
    return isArray$1(value) ? value : [value];
  }

  function forEach$1(values, iteratee) {
    toArray$1(values).forEach(iteratee);
  }

  var ownKeys$1 = Object.keys;

  function forOwn$1(object, iteratee, right) {
    if (object) {
      var keys = ownKeys$1(object);
      keys = right ? keys.reverse() : keys;

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

  function assign$1(object) {
    slice$1(arguments, 1).forEach(function (source) {
      forOwn$1(source, function (value, key) {
        object[key] = source[key];
      });
    });
    return object;
  }

  var PROJECT_CODE$1 = "splide";

  function EventBinder() {
    var listeners = [];

    function bind(targets, events, callback, options) {
      forEachEvent(targets, events, function (target, event, namespace) {
        var isEventTarget = ("addEventListener" in target);
        var remover = isEventTarget ? target.removeEventListener.bind(target, event, callback, options) : target["removeListener"].bind(target, callback);
        isEventTarget ? target.addEventListener(event, callback, options) : target["addListener"](callback);
        listeners.push([target, event, namespace, callback, remover]);
      });
    }

    function unbind(targets, events, callback) {
      forEachEvent(targets, events, function (target, event, namespace) {
        listeners = listeners.filter(function (listener) {
          if (listener[0] === target && listener[1] === event && listener[2] === namespace && (!callback || listener[3] === callback)) {
            listener[4]();
            return false;
          }

          return true;
        });
      });
    }

    function dispatch(target, type, detail) {
      var e;
      var bubbles = true;

      if (typeof CustomEvent === "function") {
        e = new CustomEvent(type, {
          bubbles: bubbles,
          detail: detail
        });
      } else {
        e = document.createEvent("CustomEvent");
        e.initCustomEvent(type, bubbles, false, detail);
      }

      target.dispatchEvent(e);
      return e;
    }

    function forEachEvent(targets, events, iteratee) {
      forEach$1(targets, function (target) {
        target && forEach$1(events, function (events2) {
          events2.split(" ").forEach(function (eventNS) {
            var fragment = eventNS.split(".");
            iteratee(target, fragment[0], fragment[1]);
          });
        });
      });
    }

    function destroy() {
      listeners.forEach(function (data) {
        data[4]();
      });
      empty$1(listeners);
    }

    return {
      bind: bind,
      unbind: unbind,
      dispatch: dispatch,
      destroy: destroy
    };
  }

  var EVENT_VISIBLE = "visible";
  var EVENT_HIDDEN = "hidden";
  var EVENT_REFRESH = "refresh";
  var EVENT_UPDATED = "updated";
  var EVENT_DESTROY = "destroy";

  function EventInterface(Splide2) {
    var bus = Splide2 ? Splide2.event.bus : document.createDocumentFragment();
    var binder = EventBinder();

    function on(events, callback) {
      binder.bind(bus, toArray$1(events).join(" "), function (e) {
        callback.apply(callback, isArray$1(e.detail) ? e.detail : []);
      });
    }

    function emit(event) {
      binder.dispatch(bus, event, slice$1(arguments, 1));
    }

    if (Splide2) {
      Splide2.event.on(EVENT_DESTROY, binder.destroy);
    }

    return assign$1(binder, {
      bus: bus,
      on: on,
      off: apply$1(binder.unbind, bus),
      emit: emit
    });
  }

  var CLASS_ROOT = PROJECT_CODE$1;
  var CLASS_SLIDE = PROJECT_CODE$1 + "__slide";
  var CLASS_CONTAINER = CLASS_SLIDE + "__container";

  function empty(array) {
    array.length = 0;
  }

  function slice(arrayLike, start, end) {
    return Array.prototype.slice.call(arrayLike, start, end);
  }

  function apply(func) {
    return func.bind.apply(func, [null].concat(slice(arguments, 1)));
  }

  function typeOf(type, subject) {
    return typeof subject === type;
  }

  function isObject(subject) {
    return !isNull(subject) && typeOf("object", subject);
  }

  var isArray = Array.isArray;
  apply(typeOf, "function");
  var isString = apply(typeOf, "string");
  var isUndefined = apply(typeOf, "undefined");

  function isNull(subject) {
    return subject === null;
  }

  function isHTMLElement(subject) {
    return subject instanceof HTMLElement;
  }

  function toArray(value) {
    return isArray(value) ? value : [value];
  }

  function forEach(values, iteratee) {
    toArray(values).forEach(iteratee);
  }

  function push(array, items) {
    array.push.apply(array, toArray(items));
    return array;
  }

  function toggleClass(elm, classes, add) {
    if (elm) {
      forEach(classes, function (name) {
        if (name) {
          elm.classList[add ? "add" : "remove"](name);
        }
      });
    }
  }

  function addClass(elm, classes) {
    toggleClass(elm, isString(classes) ? classes.split(" ") : classes, true);
  }

  function append(parent, children) {
    forEach(children, parent.appendChild.bind(parent));
  }

  function matches(elm, selector) {
    return isHTMLElement(elm) && (elm["msMatchesSelector"] || elm.matches).call(elm, selector);
  }

  function children(parent, selector) {
    var children2 = parent ? slice(parent.children) : [];
    return selector ? children2.filter(function (child) {
      return matches(child, selector);
    }) : children2;
  }

  function child(parent, selector) {
    return selector ? children(parent, selector)[0] : parent.firstElementChild;
  }

  var ownKeys = Object.keys;

  function forOwn(object, iteratee, right) {
    if (object) {
      var keys = ownKeys(object);
      keys = right ? keys.reverse() : keys;

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

  function assign(object) {
    slice(arguments, 1).forEach(function (source) {
      forOwn(source, function (value, key) {
        object[key] = source[key];
      });
    });
    return object;
  }

  function omit(object, keys) {
    toArray(keys || ownKeys(object)).forEach(function (key) {
      delete object[key];
    });
  }

  function removeAttribute(elms, attrs) {
    forEach(elms, function (elm) {
      forEach(attrs, function (attr) {
        elm && elm.removeAttribute(attr);
      });
    });
  }

  function setAttribute(elms, attrs, value) {
    if (isObject(attrs)) {
      forOwn(attrs, function (value2, name) {
        setAttribute(elms, name, value2);
      });
    } else {
      forEach(elms, function (elm) {
        isNull(value) || value === "" ? removeAttribute(elm, attrs) : elm.setAttribute(attrs, String(value));
      });
    }
  }

  function create(tag, attrs, parent) {
    var elm = document.createElement(tag);

    if (attrs) {
      isString(attrs) ? addClass(elm, attrs) : setAttribute(elm, attrs);
    }

    parent && append(parent, elm);
    return elm;
  }

  function style(elm, prop, value) {
    if (isUndefined(value)) {
      return getComputedStyle(elm)[prop];
    }

    if (!isNull(value)) {
      elm.style[prop] = "" + value;
    }
  }

  function hasClass(elm, className) {
    return elm && elm.classList.contains(className);
  }

  function remove(nodes) {
    forEach(nodes, function (node) {
      if (node && node.parentNode) {
        node.parentNode.removeChild(node);
      }
    });
  }

  function queryAll(parent, selector) {
    return selector ? slice(parent.querySelectorAll(selector)) : [];
  }

  function removeClass(elm, classes) {
    toggleClass(elm, classes, false);
  }

  function unit(value) {
    return isString(value) ? value : value ? value + "px" : "";
  }

  var PROJECT_CODE = "splide";

  function assert(condition, message) {
    if (!condition) {
      throw new Error("[" + PROJECT_CODE + "] " + (message || ""));
    }
  }

  var min = Math.min,
      max = Math.max,
      floor = Math.floor,
      ceil = Math.ceil,
      abs = Math.abs;

  function pad(number) {
    return number < 10 ? "0" + number : "" + number;
  }

  var CLASS_SLIDE_ROW = CLASS_SLIDE + "__row";
  var CLASS_SLIDE_COL = CLASS_SLIDE + "--col";
  var DEFAULTS = {
    rows: 1,
    cols: 1,
    dimensions: [],
    gap: {}
  };

  function Dimension(options) {
    function normalize() {
      var rows = options.rows,
          cols = options.cols,
          dimensions = options.dimensions;
      return isArray(dimensions) && dimensions.length ? dimensions : [[rows, cols]];
    }

    function get(index) {
      var dimensions = normalize();
      return dimensions[min(index, dimensions.length - 1)];
    }

    function getAt(index) {
      var dimensions = normalize();
      var rows,
          cols,
          aggregator = 0;

      for (var i = 0; i < dimensions.length; i++) {
        var dimension = dimensions[i];
        rows = dimension[0] || 1;
        cols = dimension[1] || 1;
        aggregator += rows * cols;

        if (index < aggregator) {
          break;
        }
      }

      assert(rows && cols, "Invalid dimension");
      return [rows, cols];
    }

    return {
      get: get,
      getAt: getAt
    };
  }

  function Layout(Splide2, gridOptions, Dimension) {
    var _EventInterface = EventInterface(Splide2),
        on = _EventInterface.on,
        destroyEvent = _EventInterface.destroy;

    var Components = Splide2.Components,
        options = Splide2.options;
    var resolve = Components.Direction.resolve;
    var forEach = Components.Slides.forEach;

    function mount() {
      layout();

      if (options.slideFocus) {
        on(EVENT_VISIBLE, onVisible);
        on(EVENT_HIDDEN, onHidden);
      }
    }

    function destroy() {
      forEach(function (Slide) {
        var slide = Slide.slide;
        toggleTabIndex(slide, false);
        getRowsIn(slide).forEach(function (cell) {
          removeAttribute(cell, "style");
        });
        getColsIn(slide).forEach(function (colSlide) {
          cover(colSlide, true);
          removeAttribute(colSlide, "style");
        });
      });
      destroyEvent();
    }

    function layout() {
      forEach(function (Slide) {
        var slide = Slide.slide;

        var _Dimension$get = Dimension.get(Slide.isClone ? Slide.slideIndex : Slide.index),
            rows = _Dimension$get[0],
            cols = _Dimension$get[1];

        layoutRow(rows, slide);
        layoutCol(cols, slide);
        getColsIn(Slide.slide).forEach(function (colSlide, index) {
          colSlide.id = Slide.slide.id + "-col" + pad(index + 1);

          if (Splide2.options.cover) {
            cover(colSlide);
          }
        });
      });
    }

    function layoutRow(rows, slide) {
      var rowGap = gridOptions.gap.row;
      var height = "calc(" + 100 / rows + "%" + (rowGap ? " - " + unit(rowGap) + " * " + (rows - 1) / rows : "") + ")";
      getRowsIn(slide).forEach(function (rowElm, index, rowElms) {
        style(rowElm, "height", height);
        style(rowElm, "display", "flex");
        style(rowElm, "margin", "0 0 " + unit(rowGap) + " 0");
        style(rowElm, "padding", 0);

        if (index === rowElms.length - 1) {
          style(rowElm, "marginBottom", 0);
        }
      });
    }

    function layoutCol(cols, slide) {
      var colGap = gridOptions.gap.col;
      var width = "calc(" + 100 / cols + "%" + (colGap ? " - " + unit(colGap) + " * " + (cols - 1) / cols : "") + ")";
      getColsIn(slide).forEach(function (colElm, index, colElms) {
        style(colElm, "width", width);

        if (index !== colElms.length - 1) {
          style(colElm, resolve("marginRight"), unit(colGap));
        }
      });
    }

    function cover(colSlide, uncover) {
      var container = child(colSlide, "." + CLASS_CONTAINER);
      var img = child(container || colSlide, "img");

      if (img && img.src) {
        style(container || colSlide, "background", uncover ? "" : "center/cover no-repeat url(\"" + img.src + "\")");
        style(img, "display", uncover ? "" : "none");
      }
    }

    function getRowsIn(slide) {
      return queryAll(slide, "." + CLASS_SLIDE_ROW);
    }

    function getColsIn(slide) {
      return queryAll(slide, "." + CLASS_SLIDE_COL);
    }

    function toggleTabIndex(slide, add) {
      getColsIn(slide).forEach(function (colSlide) {
        setAttribute(colSlide, "tabindex", add ? 0 : null);
      });
    }

    function onVisible(Slide) {
      toggleTabIndex(Slide.slide, true);
    }

    function onHidden(Slide) {
      toggleTabIndex(Slide.slide, false);
    }

    return {
      mount: mount,
      destroy: destroy
    };
  }

  function Grid(Splide2, Components2, options) {
    var _EventInterface2 = EventInterface(Splide2),
        on = _EventInterface2.on,
        off = _EventInterface2.off;

    var Elements = Components2.Elements;
    var gridOptions = {};
    var Dimension$1 = Dimension(gridOptions);
    var Layout$1 = Layout(Splide2, gridOptions, Dimension$1);
    var modifier = CLASS_ROOT + "--grid";
    var originalSlides = [];

    function mount() {
      init();
      on(EVENT_UPDATED, init);
    }

    function init() {
      omit(gridOptions);
      assign(gridOptions, DEFAULTS, options.grid || {});

      if (shouldBuild()) {
        destroy();
        push(originalSlides, Elements.slides);
        addClass(Splide2.root, modifier);
        append(Elements.list, build());
        off(EVENT_REFRESH);
        on(EVENT_REFRESH, layout);
        refresh();
      } else if (isActive()) {
        destroy();
        refresh();
      }
    }

    function destroy() {
      if (isActive()) {
        var slides = Elements.slides;
        Layout$1.destroy();
        originalSlides.forEach(function (slide) {
          removeClass(slide, CLASS_SLIDE_COL);
          append(Elements.list, slide);
        });
        remove(slides);
        removeClass(Splide2.root, modifier);
        empty(slides);
        push(slides, originalSlides);
        empty(originalSlides);
        off(EVENT_REFRESH);
      }
    }

    function refresh() {
      Splide2.refresh();
    }

    function layout() {
      if (isActive()) {
        Layout$1.mount();
      }
    }

    function build() {
      var outerSlides = [];
      var row = 0,
          col = 0;
      var outerSlide, rowSlide;
      originalSlides.forEach(function (slide, index) {
        var _Dimension$1$getAt = Dimension$1.getAt(index),
            rows = _Dimension$1$getAt[0],
            cols = _Dimension$1$getAt[1];

        if (!col) {
          if (!row) {
            outerSlide = create(slide.tagName, CLASS_SLIDE);
            outerSlides.push(outerSlide);
          }

          rowSlide = buildRow(rows, slide, outerSlide);
        }

        buildCol(cols, slide, rowSlide);

        if (++col >= cols) {
          col = 0;
          row = ++row >= rows ? 0 : row;
        }
      });
      return outerSlides;
    }

    function buildRow(rows, slide, outerSlide) {
      var tag = slide.tagName.toLowerCase() === "li" ? "ul" : "div";
      return create(tag, CLASS_SLIDE_ROW, outerSlide);
    }

    function buildCol(cols, slide, rowSlide) {
      addClass(slide, CLASS_SLIDE_COL);
      append(rowSlide, slide);
      return slide;
    }

    function shouldBuild() {
      if (options.grid) {
        var rows = gridOptions.rows,
            cols = gridOptions.cols,
            dimensions = gridOptions.dimensions;
        return rows > 1 || cols > 1 || isArray(dimensions) && dimensions.length > 0;
      }

      return false;
    }

    function isActive() {
      return hasClass(Splide2.root, modifier);
    }

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
});
