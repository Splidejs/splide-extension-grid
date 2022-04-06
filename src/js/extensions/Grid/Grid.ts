import {
  BaseComponent,
  CLASS_ROOT,
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
  empty,
  hasClass,
  isArray,
  omit,
  push,
  remove,
  removeClass,
} from '@splidejs/splide/src/js/utils';
import { CLASS_SLIDE_COL, CLASS_SLIDE_ROW } from '../../constants/classes';
import { DEFAULTS } from '../../constants/defaults';
import { GridOptions } from '../../types/options';
import { Dimension as DimensionConstructor } from './Dimension';
import { Layout as LayoutConstructor } from './Layout';


/**
 * Lets the compiler know the Grid component.
 */
declare module '@splidejs/splide' {
  interface Options {
    grid?: GridOptions | null | false;
  }

  interface Components {
    Grid?: GridComponent;
  }
}

/**
 * The interface for the Grid component.
 *
 * @since 0.3.14
 */
export interface GridComponent extends BaseComponent {
}

/**
 * The extension for the grid slider.
 *
 * @since 0.5.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Video component object.
 */
export function Grid( Splide: Splide, Components: Components, options: Options ): GridComponent {
  const { on, off } = EventInterface( Splide );
  const { Elements } = Components;

  /**
   * Options for the extension.
   */
  const gridOptions: GridOptions = {};

  /**
   * The Dimension subcomponent.
   */
  const Dimension = DimensionConstructor( gridOptions );

  /**
   * The Layout subcomponent.
   */
  const Layout = LayoutConstructor( Splide, gridOptions, Dimension );

  /**
   * The modifier class to add to the root element.
   */
  const modifier = `${ CLASS_ROOT }--grid`;

  /**
   * Keeps original slides for restoration.
   */
  const originalSlides: HTMLElement[] = [];

  /**
   * Called when the extension is mounted.
   */
  function mount(): void {
    init();
    on( EVENT_UPDATED, init );
  }

  /**
   * Initializes the extension when the slider gets active, or options are updated.
   */
  function init(): void {
    omit( gridOptions );
    assign( gridOptions, DEFAULTS, options.grid || {} );

    if ( shouldBuild() ) {
      destroy();
      push( originalSlides, Elements.slides );
      addClass( Splide.root, modifier );
      append( Elements.list, build() );
      off( EVENT_REFRESH );
      on( EVENT_REFRESH, layout );
      refresh();
    } else if ( isActive() ) {
      destroy();
      refresh();
    }
  }

  /**
   * Destroys the extension.
   * Deconstructs grid and restores original slides to the list element.
   */
  function destroy(): void {
    if ( isActive() ) {
      const { slides } = Elements;

      Layout.destroy();

      originalSlides.forEach( slide => {
        removeClass( slide, CLASS_SLIDE_COL );
        append( Elements.list, slide );
      } );

      remove( slides );
      removeClass( Splide.root, modifier );
      empty( slides );
      push( slides, originalSlides );
      empty( originalSlides );
      off( EVENT_REFRESH );
    }
  }

  /**
   * Requests to refresh the slider.
   */
  function refresh(): void {
    Splide.refresh();
  }

  /**
   * Layouts row and col slides via the Layout subcomponent.
   * The extension calls this after requesting ths slider to refresh it.
   */
  function layout(): void {
    if ( isActive() ) {
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
    let outerSlide: HTMLElement, rowSlide: HTMLElement;

    originalSlides.forEach( ( slide, index ) => {
      const [ rows, cols ] = Dimension.getAt( index );

      if ( ! col ) {
        if ( ! row ) {
          outerSlide = create( slide.tagName, CLASS_SLIDE );
          outerSlides.push( outerSlide );
        }

        rowSlide = buildRow( rows, slide, outerSlide );
      }

      buildCol( cols, slide, rowSlide );

      if ( ++col >= cols ) {
        col = 0;
        row = ++row >= rows ? 0 : row;
      }
    } );

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
   * Tells if the extension should make grids or not by checking the current options.
   *
   * @return `true` if the extension should init grids, or otherwise `false`.
   */
  function shouldBuild(): boolean {
    if ( options.grid ) {
      const { rows, cols, dimensions } = gridOptions;
      return rows > 1 || cols > 1 || ( isArray( dimensions ) && dimensions.length > 0 );
    }

    return false;
  }

  /**
   * Checks if the grid mode is active or not.
   *
   * @return `true` if the grid extension is active, or `false` if not.
   */
  function isActive(): boolean {
    return hasClass( Splide.root, modifier );
  }

  return {
    mount,
    destroy,
  };
}
