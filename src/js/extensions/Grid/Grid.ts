import {
  BaseComponent,
  CLASS_SLIDE,
  Components,
  EVENT_REFRESH,
  EVENT_UPDATED,
  EventInterface,
  Options,
  Splide,
} from '@splidejs/splide';
import {
  addClass,
  append,
  assign,
  create,
  remove,
  removeClass,
  isArray,
  push,
  empty,
} from '@splidejs/splide/src/js/utils';
import { CLASS_SLIDE_COL, CLASS_SLIDE_ROW } from '../../constants/classes';
import { DEFAULTS } from '../../constants/defaults';
import { GridOptions } from '../../types/options';
import { Dimension as DimensionConstructor } from './Dimension';
import { Layout as LayoutConstructor } from './Layout';


/**
 * Lets the compiler know the type of video options.
 */
declare module '@splidejs/splide' {
  interface Options {
    grid?: GridOptions | null | false;
  }
}

/**
 * The extension for the grid slider.
 *
 * @todo index after refresh (arrows are disabled)
 * @todo restore slide ID?
 *
 * @since 0.5.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Video component object.
 */
export function Grid( Splide: Splide, Components: Components, options: Options ): BaseComponent {
  const { on, off } = EventInterface( Splide );
  const { Elements } = Components;

  /**
   * Options for the extension.
   */
  const gridOptions: GridOptions = {};

  /**
   * The Dimension sub component.
   */
  const Dimension = DimensionConstructor( gridOptions );

  /**
   * The Layout sub component.
   */
  const Layout = LayoutConstructor( Splide, gridOptions, Dimension );

  /**
   * The modifier class to add to the root element.
   */
  const modifier = `${ CLASS_SLIDE }--grid`;

  /**
   * Keeps original slides for restoration.
   */
  const originalSlides: HTMLElement[] = [];

  /**
   * Initializes the grid options.
   */
  function setup(): void {
    options.grid = assign( {}, DEFAULTS, options.grid || {} );
  }

  /**
   * Called when the extension is mounted.
   */
  function mount(): void {
    init();
    on( EVENT_UPDATED, init );
  }

  /**
   * Initializes the extension.
   */
  function init(): void {
    assign( gridOptions, options.grid || DEFAULTS );

    if ( hasGrid() ) {
      push( originalSlides, Elements.slides );
      addClass( Splide.root, modifier );
      append( Elements.list, build() );
      on( EVENT_REFRESH, layout );
      refresh();
    } else if ( originalSlides.length ) {
      destroy();
      refresh();
    }
  }

  /**
   * Destroys the extension.
   * Deconstructs grids and restores original slides to the list element.
   */
  function destroy(): void {
    Layout.destroy();

    originalSlides.forEach( slide => {
      removeClass( slide, CLASS_SLIDE_COL );
      append( Elements.list, slide );
    } );

    remove( Elements.slides );
    removeClass( Splide.root, modifier );
    empty( originalSlides );

    off( EVENT_REFRESH );
  }

  /**
   * Requests to refresh the slider.
   */
  function refresh(): void {
    Splide.refresh();
  }

  /**
   * Layouts row and col slides via the Layout sub component.
   */
  function layout(): void {
    if ( hasGrid() ) {
      Layout.mount();
    }
  }

  /**
   * Builds grid and returns created outer slide elements.
   *
   * @return An array with outer slides.
   */
  function build(): HTMLElement[] {
    const outerSlides: HTMLElement[] = [];

    let row = 0, col = 0;
    let outerSlide: HTMLElement, rowSlide: HTMLElement, colSlide: HTMLElement;

    Components.Slides.forEach( Slide => {
      const { slide, index } = Slide;
      const [ rows, cols ] = Dimension.getAt( index );

      if ( ! col ) {
        if ( ! row ) {
          outerSlide = create( slide.tagName, CLASS_SLIDE );
          outerSlides.push( outerSlide );
        }

        rowSlide = buildRow( rows, slide, outerSlide );
      }

      colSlide = buildCol( cols, slide, rowSlide );

      if ( ++col >= cols ) {
        col = 0;
        row = ++row >= rows ? 0 : row;
      }
    }, true );

    return outerSlides;
  }

  /**
   * Creates an element for a row.
   *
   * @param rows       - A number of rows.
   * @param slide      - An original slide element.
   * @param outerSlide - An outer slide element.
   *
   * A created element.
   */
  function buildRow( rows: number, slide: HTMLElement, outerSlide: HTMLElement ): HTMLElement {
    const tag = slide.tagName.toLowerCase() === 'li' ? 'ul' : 'div';
    return create( tag, CLASS_SLIDE_ROW, outerSlide );
  }

  /**
   * Creates an element for a col.
   * Currently, uses the original slide element itself.
   *
   * @param cols     - A number of cols.
   * @param slide    - An original slide element.
   * @param rowSlide - A row slide element.
   *
   * @return A created element.
   */
  function buildCol( cols: number, slide: HTMLElement, rowSlide: HTMLElement ): HTMLElement {
    addClass( slide, CLASS_SLIDE_COL );
    append( rowSlide, slide );
    return slide;
  }

  /**
   * Checks if the slider has grid or not.
   *
   * @return `true` if the slider has grid, or otherwise `false`.
   */
  function hasGrid(): boolean {
    if ( options.grid ) {
      const { rows, cols, dimensions } = gridOptions;
      return rows > 1 || cols > 1 || ( isArray( dimensions ) && dimensions.length > 0 );
    }

    return false;
  }

  return {
    setup,
    mount,
    destroy,
  }
}
