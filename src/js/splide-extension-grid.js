/**
 * The extension component for grid.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { applyStyle, each, unit } from "./utils";
import { DEFAULTS } from "./constants/defaults";

/**
 * The data attribute name for temporarily saving grid width.
 *
 * @type {string}
 */
const GRID_WIDTH_DATA_ATTRIBUTE_NAME = 'data-splide-grid-width';


/**
 * The extension component for grid.
 *
 * @param {Splide} Splide     - A Splide instance.
 * @param {Object} Components - An object containing components.
 *
 * @return {Object} - Extension object.
 */
export default ( Splide, Components ) => {
	/**
	 * Hold the latest grid options.
	 * 
	 * @type {Object}
	 */
	let options;

	/**
	 * Hold the original slides.
	 *
	 * @type {Element[]|undefined}
	 */
	let originalSlides;

	/**
	 * Hold the Elements component.
	 *
	 * @type {Object}
	 */
	const Elements = Components.Elements;

	/**
	 * Class name for a slide.
	 *
	 * @type {string}
	 */
	const slideClass = Splide.classes.slide.split( ' ' )[0];

	/**
	 * Class name for rows.
	 *
	 * @type {string}
	 */
	const rowClass = slideClass ? slideClass + '__row' : '';

	/**
	 * Class name for cols.
	 *
	 * @type {string}
	 */
	const colClass = slideClass ? slideClass + '--col' : '';

	/**
	 * Grid extension object.
	 *
	 * @type {Object}
	 */
	const Grid = {
		/**
		 * Called when the extension is mounted.
		 */
		mount() {
			this.initOptions();

			originalSlides = Elements.slides;
			options        = Splide.options.grid;

			if ( this.shouldActivate() ) {
				this.init();
			}

			Splide.on( 'updated', () => {
				options = Splide.options.grid;

				if ( this.shouldActivate() ) {
					this.init();
				} else {
					this.destroy();
				}
			} );

			if ( Splide.options.accessibility ) {
				Splide.on( 'visible', Slide => this.updateA11y( Slide, true ) );
				Splide.on( 'hidden', Slide => this.updateA11y( Slide, false ) );
			}
		},

		/**
		 * Destroy the extension.
		 */
		destroy() {
			if ( originalSlides ) {
				const list     = Elements.list;
				const fragment = document.createDocumentFragment();

				// Move slides to the fragment temporarily.
				originalSlides.forEach( slide => { fragment.appendChild( slide ) } );

				list.innerHTML = '';

				originalSlides.forEach( slide => {
					list.appendChild( slide );
					slide.classList.remove( colClass );
					slide.removeAttribute( 'style' );
				} );

				Elements.slides = originalSlides;

				this.toggleRootClassModifiers( 'grid', true );

				Splide.refresh();
			}
		},

		/**
		 * Initialize options.
		 */
		initOptions() {
			if ( typeof Splide.options.grid !== 'object' ) {
				Splide.options.grid = {};
			}

			Splide.options.grid = { ...DEFAULTS, ...Splide.options.grid };
		},

		/**
		 * Whether to activate the grid mode or not.
		 *
		 * @return {boolean} - True if th
		 */
		shouldActivate() {
			const { rows, cols, dimensions } =  Splide.options.grid;
			return rows > 1 || cols > 1 || dimensions;
		},

		/**
		 * Initialization.
		 */
		init() {
			if ( originalSlides.length ) {
				Elements.slides = this.buildGrid();

				originalSlides.forEach( slide => { slide.removeAttribute( 'id' ) } );

				Splide.refresh();

				this.toggleRootClassModifiers( 'grid' );
				this.setStyles();
			}
		},

		/**
		 * Add or remove root class modifiers.
		 *
		 * @param {string|string[]} modifiers - Modifier(s).
		 * @param {boolean}         remove    - Optional. Whether to ser or remove modifiers.
		 */
		toggleRootClassModifiers( modifiers, remove = false ) {
			const rootClass = Splide.classes.root.split( ' ' )[0];

			if ( rootClass ) {
				if ( ! Array.isArray( modifiers ) ) {
					modifiers = [ modifiers ];
				}

				modifiers.forEach( modifier => {
					Splide.root.classList[ remove ? 'remove' : 'add' ]( `${ rootClass }--${ modifier }` );
				} );
			}
		},

		/**
		 * Set styles to inner slide elements.
		 */
		setStyles() {
			Elements.each( Slide => {
				const marginProp = Components.Layout.margin;

				each( Slide.slide.querySelectorAll( `.${ colClass }` ), slide => {
					const { col: colGap = 0 } = options.gap;

					applyStyle( slide, {
						width         : slide.getAttribute( GRID_WIDTH_DATA_ATTRIBUTE_NAME ),
						height        : '100%',
						[ marginProp ]: `${ unit( colGap ) }`,
					} );

					slide.removeAttribute( GRID_WIDTH_DATA_ATTRIBUTE_NAME );

					this.cover( slide );
				} );

				applyStyle( Slide.slide.lastElementChild, { marginBottom: '0' } );

				each( Slide.slide.children, child => {
					applyStyle( child.lastElementChild, { [ marginProp ]: '0' } );
				} );
			} );
		},

		/**
		 * Cover the slide with an inner image if available.
		 *
		 * @param {Element} slide - An inner slide element.
		 */
		cover( slide ) {
			if ( Splide.options.cover ) {
				const img = slide.querySelector( 'img' );

				if ( img && img.src ) {
					applyStyle( slide, { background: `center/cover no-repeat url("${ img.src }")` } );
					applyStyle( img, { display: 'none' } );
				}
			}
		},

		/**
		 * Build grid.
		 * Create outerSlide, row, col elements and push them to specific arrays.
		 *
		 * @reeturn {Element[]} - Created outer slide elements.
		 */
		buildGrid() {
			const outerSlides = [];
			let outerSlide, rowElm, colElm;
			let r = 0, c = 0;

			for ( let i = 0; i < originalSlides.length; i++ ) {
				const { rows, cols } = this.getDimension( i );
				const slide = originalSlides[ i ];

				if ( c === 0 ) {
					if ( r === 0 ) {
						outerSlide = document.createElement( slide.tagName );
						outerSlide.classList.add( Splide.classes.slide );

						outerSlides.push( outerSlide );
						// Elements.list.appendChild( outerSlide );
					}

					rowElm = this.createRow( rows );
					outerSlide.appendChild( rowElm );
				}

				colElm = this.createCol( cols, slide );
				rowElm.appendChild( colElm );

				c++;

				if ( c >= cols ) {
					r++;
					c = 0;
				}

				if ( r >= rows ) {
					r = 0;
					c = 0;
				}
			}

			Elements.list.innerHTML = '';

			outerSlides.forEach( slide => {
				Elements.list.appendChild( slide );
			} );

			return outerSlides;
		},

		/**
		 * Return dimension(rows and cols) according to the given index.
		 *
		 * @param {number} index - Slide index.
		 *
		 * @return {Object} - An object containing rows and cols.
		 */
		getDimension( index ) {
			let { rows, cols } = options;
			let total = 0;

			if ( options.dimensions ) {
				each( options.dimensions, dimension => {
					rows = dimension[0] || 1;
					cols = dimension[1] || 1;

					total += rows * cols;

					return index < total;
				} );
			}

			return { rows, cols };
		},

		/**
		 * Create an element for a row.
		 *
		 * @param {number} rows - Number of rows.
		 *
		 * @return {Element} - A created element.
		 */
		createRow( rows ) {
			const { row: rowGap = 0 } = options.gap;
			const slide  = originalSlides[0];
			const rowElm = document.createElement( slide.tagName.toLowerCase() === 'li' ? 'ul' : 'div' );

			rowElm.classList.add( rowClass );

			let height = `calc( ${ 100 / rows }%`;

			if ( rowGap ) {
				height += ` - ${ unit( rowGap ) } * ${ ( rows - 1 ) / rows } )`;
			}

			applyStyle( rowElm, {
				height,
				display: 'flex',
				margin : `0 0 ${ unit( rowGap ) } 0`,
				padding: '0',
			} );

			return rowElm;
		},

		/**
		 * Create an element for a col.
		 * Currently use the given slide itself as a col element.
		 *
		 * @param {number}  cols  - Number of cols.
		 * @param {Element} slide - A slide element.
		 *
		 * @return {Element} - A created element.
		 */
		createCol( cols, slide ) {
			const { gap: { col: colGap = 0 } } = options;
			let width = `calc( ${ 100 / cols }%`;

			if ( colGap ) {
				width += ` - ${ unit( colGap ) } * ${ ( cols - 1 ) / cols } )`;
			}

			slide.classList.add( colClass );
			slide.setAttribute( GRID_WIDTH_DATA_ATTRIBUTE_NAME, width );

			return slide;
		},

		/**
		 * Update attributes related with accessibility.
		 *
		 * @param {Object}  Slide     - A slide object.
		 * @param {boolean} isVisible - True if the slide is made visible, or false otherwise.
		 */
		updateA11y( Slide, isVisible ) {
			each( Slide.slide.querySelectorAll( `.${ colClass }` ), slide => {
				slide.setAttribute( 'tabindex', isVisible ? 0 : -1 );
			} );
		},

		/**
		 * Return generated class name for rows.
		 *
		 * @return {string} - Class name for rows.
		 */
		get rowClass() {
			return rowClass;
		},

		/**
		 * Return generated class name for cols.
		 *
		 * @return {string} - Class name for cols.
		 */
		get colClass() {
			return colClass;
		},
	};

	return Grid;
}