/*!
 * @splidejs/splide-extension-grid
 * Version  : 0.3.0
 * License  : MIT
 * Copyright: 2021 Naotoshi Fujita
 */
import { CLASS_SLIDE, EventInterface, EVENT_VISIBLE, EVENT_HIDDEN, CLASS_CONTAINER, EVENT_UPDATED, EVENT_REFRESH } from '@splidejs/splide';
import { isArray, queryAll, pad, unit, child, setAttribute, assign, push, addClass, append, removeClass, remove, empty, create } from '@splidejs/splide/src/js/utils';
import { Style } from '@splidejs/splide/src/js/components/Style/Style';

const CLASS_SLIDE_ROW = `${CLASS_SLIDE}__row`;
const CLASS_SLIDE_COL = `${CLASS_SLIDE}--col`;

const DEFAULTS = {
  rows: 1,
  cols: 1,
  dimensions: [],
  gap: {}
};

function Dimension(options) {
  function get() {
    const { dimensions } = options;
    return isArray(dimensions) ? dimensions : [];
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
  const { on, destroy: destroyEvent } = EventInterface(Splide2);
  const { Components, options } = Splide2;
  const { resolve } = Components.Direction;
  const { forEach } = Components.Slides;
  const Style$1 = Style();
  const { rule } = Style$1;
  function mount() {
    Style$1.mount();
    layout();
    if (options.slideFocus) {
      on(EVENT_VISIBLE, onVisible);
      on(EVENT_HIDDEN, onHidden);
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
        colSlide.id = `${Slide.slide.id}-col${pad(index + 1)}`;
        cover(colSlide);
      });
    });
  }
  function layoutRow(rows, selector) {
    const { row: rowGap } = gridOptions.gap;
    const height = `calc(${100 / rows}%${rowGap ? ` - ${unit(rowGap)} * ${(rows - 1) / rows}` : ""})`;
    rule(selector, "height", height);
    rule(selector, "display", "flex");
    rule(selector, "margin", `0 0 ${unit(rowGap)} 0`);
    rule(selector, "padding", 0);
    rule(`${selector}:last-child`, "marginBottom", 0);
  }
  function layoutCol(cols, selector) {
    const { col: colGap } = gridOptions.gap;
    const width = `calc(${100 / cols}%${colGap ? ` - ${unit(colGap)} * ${(cols - 1) / cols}` : ""})`;
    rule(selector, "width", width);
    rule(`${selector}:not(:last-child)`, resolve("marginRight"), unit(colGap));
  }
  function cover(colSlide) {
    const container = child(colSlide, `.${CLASS_CONTAINER}`);
    const img = child(container || colSlide, "img");
    if (img && img.src) {
      const selector = `#${colSlide.id}${container ? ` > .${CLASS_CONTAINER}` : ""}`;
      rule(selector, "background", `center/cover no-repeat url("${img.src}")`);
      rule(`${selector} > img`, "display", "none");
    }
  }
  function buildSelector(slide, col) {
    return `#${slide.id} > .${CLASS_SLIDE_ROW}${col ? ` > .${CLASS_SLIDE_COL}` : ""}`;
  }
  function getColsIn(slide) {
    return queryAll(slide.parentElement, buildSelector(slide, true));
  }
  function toggleTabIndex(slide, add) {
    getColsIn(slide).forEach((colSlide) => {
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
    mount,
    destroy
  };
}

function Grid(Splide2, Components2, options) {
  const { on, off } = EventInterface(Splide2);
  const { Elements } = Components2;
  const gridOptions = {};
  const Dimension$1 = Dimension(gridOptions);
  const Layout$1 = Layout(Splide2, gridOptions, Dimension$1);
  const modifier = `${CLASS_SLIDE}--grid`;
  const originalSlides = [];
  function setup() {
    options.grid = assign({}, DEFAULTS, options.grid || {});
  }
  function mount() {
    init();
    on(EVENT_UPDATED, init);
  }
  function init() {
    assign(gridOptions, options.grid || DEFAULTS);
    if (hasGrid()) {
      push(originalSlides, Elements.slides);
      addClass(Splide2.root, modifier);
      append(Elements.list, build());
      on(EVENT_REFRESH, layout);
      refresh();
    } else if (originalSlides.length) {
      destroy();
      refresh();
    }
  }
  function destroy() {
    Layout$1.destroy();
    originalSlides.forEach((slide) => {
      removeClass(slide, CLASS_SLIDE_COL);
      append(Elements.list, slide);
    });
    remove(Elements.slides);
    removeClass(Splide2.root, modifier);
    empty(originalSlides);
    off(EVENT_REFRESH);
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
    }, true);
    return outerSlides;
  }
  function buildRow(rows, slide, outerSlide) {
    const tag = slide.tagName.toLowerCase() === "li" ? "ul" : "div";
    return create(tag, CLASS_SLIDE_ROW, outerSlide);
  }
  function buildCol(cols, slide, rowSlide) {
    addClass(slide, CLASS_SLIDE_COL);
    append(rowSlide, slide);
    return slide;
  }
  function hasGrid() {
    if (options.grid) {
      const { rows, cols, dimensions } = gridOptions;
      return rows > 1 || cols > 1 || isArray(dimensions) && dimensions.length > 0;
    }
    return false;
  }
  return {
    setup,
    mount,
    destroy
  };
}

export { Grid };
