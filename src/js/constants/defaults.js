/**
 * Export default options.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

export const DEFAULTS = {
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
	gap: {},
};