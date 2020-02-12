/**
 * Utility export functions.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

/**
 * Apply styles to the given element.
 *
 * @param {HTMLElement} elm    - An element where styles are applied.
 * @param {Object}      styles - Object containing styles.
 */
export function applyStyle( elm, styles ) {
	Object.keys( styles ).forEach( key => {
		elm.style[ key ] = styles[ key ];
	} );
}

/**
 * Iterate an object like Array.forEach.
 *
 * @param {Object}   obj      - An object.
 * @param {function} callback - A export function handling each value. Arguments are value, property and index.
 */
export function each( obj, callback ) {
	Object.keys( obj ).some( ( key, index ) => {
		return callback( obj[ key ], key, index );
	} );
}

/**
 * Append px unit to the given subject if necessary.
 *
 * @param {number|string} value - A value that may not include an unit.
 *
 * @return {string} - If the value is string, return itself.
 *                    If number, do value + "px". An empty string, otherwise.
 */
export function unit( value ) {
	const type = typeof value;

	if ( type === 'number' && value > 0 ) {
		return parseFloat( value ) + 'px';
	}

	return type === 'string' ? value : '';
}