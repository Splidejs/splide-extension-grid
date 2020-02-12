/**
 * Set the Grid extension to the global object.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import Grid from '../../src/js/splide-extension-grid';

window.splide = window.splide || {};
window.splide.Extensions = window.splide.Extensions || {};
window.splide.Extensions.Grid = Grid;