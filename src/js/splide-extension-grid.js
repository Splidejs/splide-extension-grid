/**
 * The extension component for grid.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import { applyStyle, each, unit } from "./utils";
import { DEFAULTS } from "./constants/defaults";


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
				const list = Elements.list;
				list.innerHTML  = '';
				Elements.slides = originalSlides;

				originalSlides.forEach( slide => {
					list.appendChild( slide );
					slide.classList.remove( colClass );
					slide.removeAttribute( 'style' );
				} );

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
			const { rows, cols } =  Splide.options.grid;
			return rows > 1 || cols > 1;
		},

		/**
		 * Initialization.
		 */
		init() {
			originalSlides.forEach( slide => {
				slide.removeAttribute( 'id' );
			} );

			Elements.list.innerHTML = '';
			Elements.slides = this.buildGrid();

			Splide.refresh();

			this.toggleRootClassModifiers( 'grid' );
			this.setStyles();
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
					const { cols, gap: { col: colGap = 0 } } = options;
					let width = `calc( ${ 100 / cols }%`;

					if ( colGap ) {
						width += ` - ${ unit( colGap ) } * ${ ( cols - 1 ) / cols } )`;
					}

					applyStyle( slide, {
						width,
						height        : '100%',
						[ marginProp ]: `${ unit( colGap ) }`,
					} );

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
		 *
		 * @return {Element[]} - New slide elements.
		 */
		buildGrid() {
			const { rows, cols } = options;
			const newSlides = [];

			let newSlide, rowElm;

			originalSlides.forEach( ( slide, index ) => {
				if ( index % ( rows * cols ) === 0 ) {
					newSlide = document.createElement( slide.tagName );
					newSlide.classList.add( Splide.classes.slide );

					newSlides.push( newSlide );
					Elements.list.appendChild( newSlide );
				}

				if ( index % cols === 0 ) {
					rowElm = this.createRow();
					newSlide.appendChild( rowElm );
				}

				slide.classList.add( colClass );
				rowElm.append( slide );
			} );

			return newSlides;
		},

		/**
		 * Create an element for a row.
		 *
		 * @return {Element} - A created element.
		 */
		createRow() {
			const { rows, gap: { row: rowGap = 0 } } = options;
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
	};

	return Grid;
}