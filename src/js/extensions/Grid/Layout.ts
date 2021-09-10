import { CLASS_CONTAINER, EVENT_HIDDEN, EVENT_VISIBLE, EventInterface, Splide } from '@splidejs/splide';
import { SlideComponent } from '@splidejs/splide/src/js/components/Slides/Slide';
import { Style as StyleConstructor } from '@splidejs/splide/src/js/components/Style/Style';
import { child, pad, queryAll, setAttribute, unit } from '@splidejs/splide/src/js/utils';
import { CLASS_SLIDE_COL, CLASS_SLIDE_ROW } from '../../constants/classes';
import { GridOptions } from '../../types/options';
import { DimensionComponent } from './Dimension';


/**
 * The interface for the Layout sub component.
 *
 * @since 0.5.0
 */
export interface LayoutComponent {
  mount(): void;
  destroy(): void;
}

/**
 * The sub components to layout grids.
 *
 * @since 0.5.0
 *
 * @param Splide      - A Splide instance.
 * @param gridOptions - Initialized grid options.
 * @param Dimension   - A Dimension sub component.
 *
 * @return A Layout sub component object.
 */
export function Layout( Splide: Splide, gridOptions: GridOptions, Dimension: DimensionComponent ): LayoutComponent {
  const { on, destroy: destroyEvent } = EventInterface( Splide );
  const { Components, options } = Splide;
  const { resolve } = Components.Direction;
  const { forEach } = Components.Slides;
  const Style = StyleConstructor();
  const { rule } = Style;

  /**
   * Initializes the component.
   */
  function mount(): void {
    Style.mount();

    layout();

    if ( options.slideFocus ) {
      on( EVENT_VISIBLE, onVisible );
      on( EVENT_HIDDEN, onHidden );
    }
  }

  /**
   * Destroys the component.
   */
  function destroy(): void {
    forEach( Slide => {
      toggleTabIndex( Slide.slide, false );
    } );

    Style.destroy();
    destroyEvent();
  }

  /**
   * Layouts grid elements.
   */
  function layout(): void {
    forEach( Slide => {
      const { slide } = Slide;
      const [ rows, cols ] = Dimension.get( Slide.isClone ? Slide.slideIndex : Slide.index );
      const rowSelector = buildSelector( slide );

      layoutRow( rows, rowSelector );
      layoutCol( cols, buildSelector( slide, true ) );

      getColsIn( Slide.slide ).forEach( ( colSlide, index ) => {
        colSlide.id = `${ Slide.slide.id }-col${ pad( index + 1 ) }`;
        cover( colSlide );
      } );
    } );
  }

  /**
   * Layouts row elements by CSS.
   *
   * @param rows     - A number of rows.
   * @param selector - A selector.
   */
  function layoutRow( rows: number, selector: string ): void {
    const { row: rowGap } = gridOptions.gap;
    const height = `calc(${ 100 / rows }%${ rowGap ? ` - ${ unit( rowGap ) } * ${ ( rows - 1 ) / rows }` : '' })`;

    rule( selector, 'height', height );
    rule( selector, 'display', 'flex' );
    rule( selector, 'margin', `0 0 ${ unit( rowGap ) } 0` );
    rule( selector, 'padding', 0 );
    rule( `${ selector }:last-child`, 'marginBottom', 0 );
  }

  /**
   * Layouts col elements by CSS.
   *
   * @param cols     - A number of cols.
   * @param selector - A selector.
   */
  function layoutCol( cols: number, selector: string ): void {
    const { col: colGap } = gridOptions.gap;
    const width = `calc(${ 100 / cols }%${ colGap ? ` - ${ unit( colGap ) } * ${ ( cols - 1 ) / cols }` : '' })`;

    rule( selector, 'width', width );
    rule( `${ selector }:not(:last-child)`, resolve( 'marginRight' ), unit( colGap ) );
  }

  /**
   * Sets the background image to the col element by its own image element.
   *
   * @param colSlide - A col slide element.
   */
  function cover( colSlide: HTMLElement ): void {
    const container = child( colSlide, `.${ CLASS_CONTAINER }` );
    const img       = child<HTMLImageElement>( container || colSlide, 'img' );

    if ( img && img.src ) {
      const selector = `#${ colSlide.id }${ container ? ` > .${ CLASS_CONTAINER }` : '' }`;
      rule( selector, 'background', `center/cover no-repeat url("${ img.src }")` );
      rule( `${ selector } > img`, 'display', 'none' );
    }
  }

  /**
   * Builds selector for a row or a col in the provided slide.
   *
   * @param slide - A slide element.
   * @param col   - Optional. Determines whether to build a selector for a col or a row.
   */
  function buildSelector( slide: HTMLElement, col?: boolean ): string {
    return `#${ slide.id } > .${ CLASS_SLIDE_ROW }${ col ? ` > .${ CLASS_SLIDE_COL }` : '' }`;
  }

  /**
   * Returns col elements in the provided slide.
   *
   * @param slide - A slide element.
   *
   * @return An array with col elements.
   */
  function getColsIn( slide: HTMLElement ): HTMLElement[] {
    return queryAll( slide.parentElement, buildSelector( slide, true ) );
  }

  /**
   * Toggles the tab index of col elements.
   *
   * @param slide - A slide element.
   * @param add   - Optional. Determines whether to add or remove tab index.
   */
  function toggleTabIndex( slide: HTMLElement, add?: boolean ): void {
    getColsIn( slide ).forEach( colSlide => {
      setAttribute( colSlide, 'tabindex', add ? 0 : null );
    } );
  }

  /**
   * Called when any slide becomes visible.
   *
   * @param Slide - A Slide component.
   */
  function onVisible( Slide: SlideComponent ): void {
    toggleTabIndex( Slide.slide, true );
  }

  /**
   * Called when any slide gets hidden.
   *
   * @param Slide - A Slide component.
   */
  function onHidden( Slide: SlideComponent ): void {
    toggleTabIndex( Slide.slide, false );
  }

  return {
    mount,
    destroy,
  }
}
