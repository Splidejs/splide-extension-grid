/*!
 * @splidejs/splide-extension-grid
 * Version  : 0.3.20
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// node_modules/@splidejs/splide/dist/js/splide.esm.js
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
var EVENT_VISIBLE = "visible";
var EVENT_HIDDEN = "hidden";
var EVENT_REFRESH = "refresh";
var EVENT_UPDATED = "updated";
var EVENT_DESTROY = "destroy";
function EventInterface(Splide22) {
  const { event } = Splide22;
  const key = {};
  let listeners = [];
  function on(events, callback, priority) {
    event.on(events, callback, key, priority);
  }
  function off(events) {
    event.off(events, key);
  }
  function bind(targets, events, callback, options) {
    forEachEvent(targets, events, (target, event2) => {
      listeners.push([target, event2, callback, options]);
      target.addEventListener(event2, callback, options);
    });
  }
  function unbind(targets, events, callback) {
    forEachEvent(targets, events, (target, event2) => {
      listeners = listeners.filter((listener) => {
        if (listener[0] === target && listener[1] === event2 && (!callback || listener[2] === callback)) {
          target.removeEventListener(event2, listener[2], listener[3]);
          return false;
        }
        return true;
      });
    });
  }
  function forEachEvent(targets, events, iteratee) {
    forEach(targets, (target) => {
      if (target) {
        events.split(" ").forEach(iteratee.bind(null, target));
      }
    });
  }
  function destroy() {
    listeners = listeners.filter((data) => unbind(data[0], data[1]));
    event.offBy(key);
  }
  event.on(EVENT_DESTROY, destroy, key);
  return {
    on,
    off,
    emit: event.emit,
    bind,
    unbind,
    destroy
  };
}
var CLASS_ROOT = PROJECT_CODE;
var CLASS_SLIDE = `${PROJECT_CODE}__slide`;
var CLASS_CONTAINER = `${CLASS_SLIDE}__container`;

// node_modules/@splidejs/splide/src/js/utils/array/empty/empty.ts
function empty2(array) {
  array.length = 0;
}

// node_modules/@splidejs/splide/src/js/utils/type/type.ts
function isObject2(subject) {
  return !isNull2(subject) && typeof subject === "object";
}
function isArray2(subject) {
  return Array.isArray(subject);
}
function isString2(subject) {
  return typeof subject === "string";
}
function isUndefined2(subject) {
  return typeof subject === "undefined";
}
function isNull2(subject) {
  return subject === null;
}
function isHTMLElement2(subject) {
  return subject instanceof HTMLElement;
}

// node_modules/@splidejs/splide/src/js/utils/array/toArray/toArray.ts
function toArray2(value) {
  return isArray2(value) ? value : [value];
}

// node_modules/@splidejs/splide/src/js/utils/array/forEach/forEach.ts
function forEach2(values, iteratee) {
  toArray2(values).forEach(iteratee);
}

// node_modules/@splidejs/splide/src/js/utils/array/push/push.ts
function push2(array, items) {
  array.push(...toArray2(items));
  return array;
}

// node_modules/@splidejs/splide/src/js/utils/array/index.ts
var arrayProto2 = Array.prototype;

// node_modules/@splidejs/splide/src/js/utils/arrayLike/slice/slice.ts
function slice2(arrayLike, start, end) {
  return arrayProto2.slice.call(arrayLike, start, end);
}

// node_modules/@splidejs/splide/src/js/utils/dom/toggleClass/toggleClass.ts
function toggleClass2(elm, classes, add) {
  if (elm) {
    forEach2(classes, (name) => {
      if (name) {
        elm.classList[add ? "add" : "remove"](name);
      }
    });
  }
}

// node_modules/@splidejs/splide/src/js/utils/dom/addClass/addClass.ts
function addClass2(elm, classes) {
  toggleClass2(elm, isString2(classes) ? classes.split(" ") : classes, true);
}

// node_modules/@splidejs/splide/src/js/utils/dom/append/append.ts
function append2(parent, children3) {
  forEach2(children3, parent.appendChild.bind(parent));
}

// node_modules/@splidejs/splide/src/js/utils/dom/matches/matches.ts
function matches2(elm, selector) {
  return isHTMLElement2(elm) && (elm["msMatchesSelector"] || elm.matches).call(elm, selector);
}

// node_modules/@splidejs/splide/src/js/utils/dom/children/children.ts
function children2(parent, selector) {
  return parent ? slice2(parent.children).filter((child3) => matches2(child3, selector)) : [];
}

// node_modules/@splidejs/splide/src/js/utils/dom/child/child.ts
function child2(parent, selector) {
  return selector ? children2(parent, selector)[0] : parent.firstElementChild;
}

// node_modules/@splidejs/splide/src/js/utils/object/forOwn/forOwn.ts
function forOwn2(object, iteratee, right) {
  if (object) {
    let keys = Object.keys(object);
    keys = right ? keys.reverse() : keys;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key !== "__proto__") {
        if (iteratee(object[key], key) === false) {
          break;
        }
      }
    }
  }
  return object;
}

// node_modules/@splidejs/splide/src/js/utils/object/assign/assign.ts
function assign2(object) {
  slice2(arguments, 1).forEach((source) => {
    forOwn2(source, (value, key) => {
      object[key] = source[key];
    });
  });
  return object;
}

// node_modules/@splidejs/splide/src/js/utils/dom/removeAttribute/removeAttribute.ts
function removeAttribute2(elm, attrs) {
  if (elm) {
    forEach2(attrs, (attr) => {
      elm.removeAttribute(attr);
    });
  }
}

// node_modules/@splidejs/splide/src/js/utils/dom/setAttribute/setAttribute.ts
function setAttribute2(elm, attrs, value) {
  if (isObject2(attrs)) {
    forOwn2(attrs, (value2, name) => {
      setAttribute2(elm, name, value2);
    });
  } else {
    isNull2(value) ? removeAttribute2(elm, attrs) : elm.setAttribute(attrs, String(value));
  }
}

// node_modules/@splidejs/splide/src/js/utils/dom/create/create.ts
function create2(tag, attrs, parent) {
  const elm = document.createElement(tag);
  if (attrs) {
    isString2(attrs) ? addClass2(elm, attrs) : setAttribute2(elm, attrs);
  }
  parent && append2(parent, elm);
  return elm;
}

// node_modules/@splidejs/splide/src/js/utils/dom/style/style.ts
function style2(elm, prop, value) {
  if (isUndefined2(value)) {
    return getComputedStyle(elm)[prop];
  }
  if (!isNull2(value)) {
    const { style: style3 } = elm;
    value = `${value}`;
    if (style3[prop] !== value) {
      style3[prop] = value;
    }
  }
}

// node_modules/@splidejs/splide/src/js/utils/dom/hasClass/hasClass.ts
function hasClass2(elm, className) {
  return elm && elm.classList.contains(className);
}

// node_modules/@splidejs/splide/src/js/utils/dom/remove/remove.ts
function remove2(nodes) {
  forEach2(nodes, (node) => {
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
  });
}

// node_modules/@splidejs/splide/src/js/utils/dom/queryAll/queryAll.ts
function queryAll2(parent, selector) {
  return slice2(parent.querySelectorAll(selector));
}

// node_modules/@splidejs/splide/src/js/utils/dom/removeClass/removeClass.ts
function removeClass2(elm, classes) {
  toggleClass2(elm, classes, false);
}

// node_modules/@splidejs/splide/src/js/utils/dom/unit/unit.ts
function unit2(value) {
  return isString2(value) ? value : value ? `${value}px` : "";
}

// node_modules/@splidejs/splide/src/js/constants/project.ts
var PROJECT_CODE2 = "splide";

// node_modules/@splidejs/splide/src/js/utils/error/assert/assert.ts
function assert2(condition, message = "") {
  if (!condition) {
    throw new Error(`[${PROJECT_CODE2}] ${message}`);
  }
}

// node_modules/@splidejs/splide/src/js/utils/math/math/math.ts
var { min: min2, max: max2, floor: floor2, ceil: ceil2, abs: abs2 } = Math;

// node_modules/@splidejs/splide/src/js/utils/string/pad/pad.ts
function pad2(number) {
  return number < 10 ? `0${number}` : `${number}`;
}

// src/js/constants/classes.ts
var CLASS_SLIDE_ROW = `${CLASS_SLIDE}__row`;
var CLASS_SLIDE_COL = `${CLASS_SLIDE}--col`;

// src/js/constants/defaults.ts
var DEFAULTS2 = {
  rows: 1,
  cols: 1,
  dimensions: [],
  gap: {}
};

// src/js/extensions/Grid/Dimension.ts
function Dimension(options) {
  function normalize() {
    const { rows, cols, dimensions } = options;
    return isArray2(dimensions) && dimensions.length ? dimensions : [[rows, cols]];
  }
  function get(index) {
    const dimensions = normalize();
    return dimensions[min2(index, dimensions.length - 1)];
  }
  function getAt(index) {
    const dimensions = normalize();
    let rows, cols, aggregator = 0;
    for (let i = 0; i < dimensions.length; i++) {
      const dimension = dimensions[i];
      rows = dimension[0] || 1;
      cols = dimension[1] || 1;
      aggregator += rows * cols;
      if (index < aggregator) {
        break;
      }
    }
    assert2(rows && cols, "Invalid dimension");
    return [rows, cols];
  }
  return {
    get,
    getAt
  };
}

// src/js/extensions/Grid/Layout.ts
function Layout2(Splide4, gridOptions, Dimension2) {
  const { on, destroy: destroyEvent } = EventInterface(Splide4);
  const { Components: Components2, options } = Splide4;
  const { resolve } = Components2.Direction;
  const { forEach: forEach3 } = Components2.Slides;
  function mount() {
    layout();
    if (options.slideFocus) {
      on(EVENT_VISIBLE, onVisible);
      on(EVENT_HIDDEN, onHidden);
    }
  }
  function destroy() {
    forEach3((Slide2) => {
      const { slide } = Slide2;
      toggleTabIndex(slide, false);
      getRowsIn(slide).forEach((cell) => {
        removeAttribute2(cell, "style");
      });
      getColsIn(slide).forEach((colSlide) => {
        cover(colSlide, true);
        removeAttribute2(colSlide, "style");
      });
    });
    destroyEvent();
  }
  function layout() {
    forEach3((Slide2) => {
      const { slide } = Slide2;
      const [rows, cols] = Dimension2.get(Slide2.isClone ? Slide2.slideIndex : Slide2.index);
      layoutRow(rows, slide);
      layoutCol(cols, slide);
      getColsIn(Slide2.slide).forEach((colSlide, index) => {
        colSlide.id = `${Slide2.slide.id}-col${pad2(index + 1)}`;
        if (Splide4.options.cover) {
          cover(colSlide);
        }
      });
    });
  }
  function layoutRow(rows, slide) {
    const { row: rowGap } = gridOptions.gap;
    const height = `calc(${100 / rows}%${rowGap ? ` - ${unit2(rowGap)} * ${(rows - 1) / rows}` : ""})`;
    getRowsIn(slide).forEach((rowElm, index, rowElms) => {
      style2(rowElm, "height", height);
      style2(rowElm, "display", "flex");
      style2(rowElm, "margin", `0 0 ${unit2(rowGap)} 0`);
      style2(rowElm, "padding", 0);
      if (index === rowElms.length - 1) {
        style2(rowElm, "marginBottom", 0);
      }
    });
  }
  function layoutCol(cols, slide) {
    const { col: colGap } = gridOptions.gap;
    const width = `calc(${100 / cols}%${colGap ? ` - ${unit2(colGap)} * ${(cols - 1) / cols}` : ""})`;
    getColsIn(slide).forEach((colElm, index, colElms) => {
      style2(colElm, "width", width);
      if (index !== colElms.length - 1) {
        style2(colElm, resolve("marginRight"), unit2(colGap));
      }
    });
  }
  function cover(colSlide, uncover) {
    const container = child2(colSlide, `.${CLASS_CONTAINER}`);
    const img = child2(container || colSlide, "img");
    if (img && img.src) {
      style2(container || colSlide, "background", uncover ? "" : `center/cover no-repeat url("${img.src}")`);
      style2(img, "display", uncover ? "" : "none");
    }
  }
  function getRowsIn(slide) {
    return queryAll2(slide, `.${CLASS_SLIDE_ROW}`);
  }
  function getColsIn(slide) {
    return queryAll2(slide, `.${CLASS_SLIDE_COL}`);
  }
  function toggleTabIndex(slide, add) {
    getColsIn(slide).forEach((colSlide) => {
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
    mount,
    destroy
  };
}

// src/js/extensions/Grid/Grid.ts
function Grid(Splide4, Components2, options) {
  const { on, off } = EventInterface(Splide4);
  const { Elements: Elements2 } = Components2;
  const gridOptions = {};
  const Dimension2 = Dimension(gridOptions);
  const Layout3 = Layout2(Splide4, gridOptions, Dimension2);
  const modifier = `${CLASS_ROOT}--grid`;
  const originalSlides = [];
  function setup() {
    options.grid = assign2({}, DEFAULTS2, options.grid || {});
  }
  function mount() {
    init();
    on(EVENT_UPDATED, init);
  }
  function init() {
    assign2(gridOptions, options.grid || DEFAULTS2);
    if (shouldBuild()) {
      destroy();
      push2(originalSlides, Elements2.slides);
      addClass2(Splide4.root, modifier);
      append2(Elements2.list, build());
      on(EVENT_REFRESH, layout);
      refresh();
    } else if (isActive()) {
      destroy();
      refresh();
    }
  }
  function destroy() {
    if (isActive()) {
      const { slides } = Elements2;
      Layout3.destroy();
      originalSlides.forEach((slide) => {
        removeClass2(slide, CLASS_SLIDE_COL);
        append2(Elements2.list, slide);
      });
      remove2(slides);
      removeClass2(Splide4.root, modifier);
      empty2(slides);
      push2(slides, originalSlides);
      empty2(originalSlides);
      off(EVENT_REFRESH);
    }
  }
  function refresh() {
    Splide4.refresh();
  }
  function layout() {
    if (isActive()) {
      Layout3.mount();
    }
  }
  function build() {
    const outerSlides = [];
    let row = 0, col = 0;
    let outerSlide, rowSlide;
    originalSlides.forEach((slide, index) => {
      const [rows, cols] = Dimension2.getAt(index);
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
    });
    return outerSlides;
  }
  function buildRow(rows, slide, outerSlide) {
    const tag = slide.tagName.toLowerCase() === "li" ? "ul" : "div";
    return create2(tag, CLASS_SLIDE_ROW, outerSlide);
  }
  function buildCol(cols, slide, rowSlide) {
    addClass2(slide, CLASS_SLIDE_COL);
    append2(rowSlide, slide);
    return slide;
  }
  function shouldBuild() {
    if (options.grid) {
      const { rows, cols, dimensions } = gridOptions;
      return rows > 1 || cols > 1 || isArray2(dimensions) && dimensions.length > 0;
    }
    return false;
  }
  function isActive() {
    return hasClass2(Splide4.root, modifier);
  }
  return {
    setup,
    mount,
    destroy
  };
}
/*!
 * Splide.js
 * Version  : 3.6.11
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */

exports.Grid = Grid;
