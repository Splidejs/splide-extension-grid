/*!
 * @splidejs/splide-extension-grid
 * Version  : 0.3.0
 * License  : MIT
 * Copyright: 2021 Naotoshi Fujita
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var splide = require('@splidejs/splide');
var utils = require('@splidejs/splide/src/js/utils');
var Style = require('@splidejs/splide/src/js/components/Style/Style');

const CLASS_SLIDE_ROW = `${splide.CLASS_SLIDE}__row`;
const CLASS_SLIDE_COL = `${splide.CLASS_SLIDE}--col`;

const DEFAULTS = {
  rows: 1,
  cols: 1,
  dimensions: [],
  gap: {}
};

function Dimension(options) {
  function get() {
    const { dimensions } = options;
    return utils.isArray(dimensions) ? dimensions : [];
  }
  function getAt(index) {
    const { rows, cols } = options;
    const dimensions = get();
    return dimensions[index] || [rows, cols];
  }
  return {
    getAt
  };
}

function Layout(Splide2, gridOptions, Dimension) {
  const { on, destroy: destroyEvent } = splide.EventInterface(Splide2);
  const { Components, options } = Splide2;
  const { resolve } = Components.Direction;
  const { forEach } = Components.Slides;
  const Style$1 = Style.Style();
  const { rule } = Style$1;
  function mount() {
    Style$1.mount();
    layout();
    if (options.slideFocus) {
      on(splide.EVENT_VISIBLE, onVisible);
      on(splide.EVENT_HIDDEN, onHidden);
    }
  }
  function destroy() {
    forEach((Slide) => {
      toggleTabIndex(Slide.slide, false);
    });
    Style$1.destroy();
    destroyEvent();
  }
  function layout() {
    forEach((Slide) => {
      const { slide } = Slide;
      const [rows, cols] = Dimension.getAt(Slide.index);
      const rowSelector = buildSelector(slide);
      layoutRow(rows, rowSelector);
      layoutCol(cols, buildSelector(slide, true));
      getColsIn(Slide.slide).forEach((colSlide, index) => {
        colSlide.id = `${Slide.slide.id}-col${utils.pad(index + 1)}`;
        cover(colSlide);
      });
    });
  }
  function layoutRow(rows, selector) {
    const { row: rowGap } = gridOptions.gap;
    const height = `calc(${100 / rows}%${rowGap ? ` - ${utils.unit(rowGap)} * ${(rows - 1) / rows}` : ""})`;
    rule(selector, "height", height);
    rule(selector, "display", "flex");
    rule(selector, "margin", `0 0 ${utils.unit(rowGap)} 0`);
    rule(selector, "padding", 0);
    rule(`${selector}:last-child`, "marginBottom", 0);
  }
  function layoutCol(cols, selector) {
    const { col: colGap } = gridOptions.gap;
    const width = `calc(${100 / cols}%${colGap ? ` - ${utils.unit(colGap)} * ${(cols - 1) / cols}` : ""})`;
    rule(selector, "width", width);
    rule(`${selector}:not(:last-child)`, resolve("marginRight"), utils.unit(colGap));
  }
  function cover(colSlide) {
    const container = utils.child(colSlide, `.${splide.CLASS_CONTAINER}`);
    const img = utils.child(container || colSlide, "img");
    if (img && img.src) {
      const selector = `#${colSlide.id}${container ? ` > .${splide.CLASS_CONTAINER}` : ""}`;
      rule(selector, "background", `center/cover no-repeat url("${img.src}")`);
      rule(`${selector} > img`, "display", "none");
    }
  }
  function buildSelector(slide, col) {
    return `#${slide.id} > .${CLASS_SLIDE_ROW}${col ? ` > .${CLASS_SLIDE_COL}` : ""}`;
  }
  function getColsIn(slide) {
    return utils.queryAll(slide.parentElement, buildSelector(slide, true));
  }
  function toggleTabIndex(slide, add) {
    getColsIn(slide).forEach((colSlide) => {
      utils.setAttribute(colSlide, "tabindex", add ? 0 : null);
    });
  }
  function onVisible(Slide) {
    toggleTabIndex(Slide.slide, true);
  }
  function onHidden(Slide) {
    toggleTabIndex(Slide.slide, false);
  }
  return {
    mount,
    destroy
  };
}

function Grid(Splide2, Components2, options) {
  const { on, off } = splide.EventInterface(Splide2);
  const { Elements } = Components2;
  const gridOptions = {};
  const Dimension$1 = Dimension(gridOptions);
  const Layout$1 = Layout(Splide2, gridOptions, Dimension$1);
  const modifier = `${splide.CLASS_SLIDE}--grid`;
  const originalSlides = [];
  function setup() {
    options.grid = utils.assign({}, DEFAULTS, options.grid || {});
  }
  function mount() {
    init();
    on(splide.EVENT_UPDATED, init);
  }
  function init() {
    utils.assign(gridOptions, options.grid || DEFAULTS);
    if (hasGrid()) {
      utils.push(originalSlides, Elements.slides);
      utils.addClass(Splide2.root, modifier);
      utils.append(Elements.list, build());
      on(splide.EVENT_REFRESH, layout);
      refresh();
    } else if (originalSlides.length) {
      destroy();
      refresh();
    }
  }
  function destroy() {
    Layout$1.destroy();
    originalSlides.forEach((slide) => {
      utils.removeClass(slide, CLASS_SLIDE_COL);
      utils.append(Elements.list, slide);
    });
    utils.remove(Elements.slides);
    utils.removeClass(Splide2.root, modifier);
    utils.empty(originalSlides);
    off(splide.EVENT_REFRESH);
  }
  function refresh() {
    Splide2.refresh();
  }
  function layout() {
    if (hasGrid()) {
      Layout$1.mount();
    }
  }
  function build() {
    const outerSlides = [];
    let row = 0, col = 0;
    let outerSlide, rowSlide;
    Components2.Slides.forEach((Slide) => {
      const { slide, index } = Slide;
      const [rows, cols] = Dimension$1.getAt(index);
      if (!col) {
        if (!row) {
          outerSlide = utils.create(slide.tagName, splide.CLASS_SLIDE);
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
    const tag = slide.tagName.toLowerCase() === "li" ? "ul" : "div";
    return utils.create(tag, CLASS_SLIDE_ROW, outerSlide);
  }
  function buildCol(cols, slide, rowSlide) {
    utils.addClass(slide, CLASS_SLIDE_COL);
    utils.append(rowSlide, slide);
    return slide;
  }
  function hasGrid() {
    if (options.grid) {
      const { rows, cols, dimensions } = gridOptions;
      return rows > 1 || cols > 1 || utils.isArray(dimensions) && dimensions.length > 0;
    }
    return false;
  }
  return {
    setup,
    mount,
    destroy
  };
}

exports.Grid = Grid;
