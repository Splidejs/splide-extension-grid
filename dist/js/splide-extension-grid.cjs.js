/*!
 * @splidejs/splide-extension-grid
 * Version  : 0.3.0
 * License  : MIT
 * Copyright: 2021 Naotoshi Fujita
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function Grid(Splide2, Components2, options) {
  function mount() {
    sample();
  }
  function destroy() {
  }
  function sample(...args) {
    console.log(args);
  }
  return {
    mount,
    destroy
  };
}

exports.Grid = Grid;
