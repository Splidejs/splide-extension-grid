import {
  BaseComponent,
  CLASS_SLIDE,
  Components,
  EVENT_REFRESH,
  EventInterface,
  Options,
  Splide,
} from '@splidejs/splide';
import { addClass, append, create, merge, min, style, unit, setAttribute } from '@splidejs/splide/src/js/utils';
import { CLASS_SLIDE_COL, CLASS_SLIDE_ROW } from '../../constants/classes';
import { DEFAULTS } from '../../constants/defaults';
import { GridOptions } from '../../types/options';
import { Dimension } from './Dimension';
import { Layout } from './Layout';


/**
 * Lets the compiler know the type of video options.
 */
declare module '@splidejs/splide' {
  interface Options {
    grid?: GridOptions;
  }
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
export function Grid( Splide: Splide, Components: Components, options: Options ): BaseComponent {
  const { on } = EventInterface( Splide );
  const gridOptions = merge( merge( {}, DEFAULTS ), options.grid || {} ); // todo
  const { ruleBy } = Components.Style;

  const dimension = Dimension( gridOptions );
  const layout    = Layout( Splide, Components, options, gridOptions, dimension );


  /**
   * Called when the extension is mounted.
   */
  function mount(): void {
    const slides = build();

    append( Components.Elements.list, slides );
    listen();

    Splide.refresh();
  }

  function listen(): void {
    on( EVENT_REFRESH, refresh );
  }

  function refresh(): void {
    layout.layout();
  }

  function build(): HTMLElement[] {
    const outerSlides: HTMLElement[] = [];

    let row = 0, col = 0;
    let outerSlide: HTMLElement, slideRow: HTMLElement, slideCol: HTMLElement;

    Components.Slides.forEach( Slide => {
      const { slide, index } = Slide;
      const [ rows, cols ] = dimension.getAt( index );

      if ( ! col ) {
        if ( ! row ) {
          outerSlide = create( slide.tagName as any, CLASS_SLIDE ); // todo
          outerSlides.push( outerSlide );
        }

        slideRow = createRow( rows, slide, outerSlide );
      }

      slideCol = createCol( cols, slide, slideRow );

      if ( ++col >= cols ) {
        col = 0;
        row = ++row >= rows ? 0 : row;
      }
    }, true );

    return outerSlides;
  }

  function createRow( rows: number, slide: HTMLElement, outerSlide: HTMLElement ): HTMLElement {
    const tag = slide.tagName.toLowerCase() === 'li' ? 'ul' : 'div';
    return create( tag, CLASS_SLIDE_ROW, outerSlide );
  }

  function createCol( cols: number, slide: HTMLElement, slideRow: HTMLElement ): HTMLElement {
    slide.id = '';
    addClass( slide, CLASS_SLIDE_COL );
    append( slideRow, slide );
    return slide;
  }

  /**
   * Destroys the extension.
   */
  function destroy(): void {
  }

  return {
    mount,
    destroy,
  }
}
