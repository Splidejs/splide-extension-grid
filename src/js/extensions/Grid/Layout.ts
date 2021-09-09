import { Components, Options, Splide } from '@splidejs/splide';
import { children, unit, pad } from '@splidejs/splide/src/js/utils';
import { CLASS_SLIDE_COL, CLASS_SLIDE_ROW } from '../../constants/classes';
import { GridOptions } from '../../types/options';
import { DimensionComponent } from './Dimension';


export interface LayoutComponent {
  layout(): void;
}

export function Layout(
  Splide: Splide,
  Components: Components,
  options: Options,
  gridOptions: GridOptions,
  dimension: DimensionComponent
): LayoutComponent {
  const { ruleBy } = Components.Style;
  const { resolve } = Components.Direction;

  function layout(): void {
    Components.Slides.forEach( Slide => {
      const [ rows, cols ] = dimension.getAt( Slide.index );

      children( Slide.slide, `.${ CLASS_SLIDE_ROW }` ).forEach( ( rowSlide, index ) => {
        layoutRow( rows, index, rowSlide, Slide.slide );

        children( rowSlide, `.${ CLASS_SLIDE_COL }` ).forEach( ( colSlide, index ) => {
          layoutCol( cols, index, colSlide, rowSlide );
        } );
      } );
    } );
  }

  function layoutRow( rows: number, index: number, rowSlide: HTMLElement, slide: HTMLElement ): void {
    const { row: rowGap } = gridOptions.gap;
    const height = `calc(${ 100 / rows }%${ rowGap ? ` - ${ unit( rowGap ) } * ${ ( rows - 1 ) / rows }` : '' })`;

    rowSlide.id = `${ slide.id }-row${ pad( index + 1 ) }`;

    ruleBy( rowSlide, 'height', height );
    ruleBy( rowSlide, 'display', 'flex' );
    ruleBy( rowSlide, 'margin', 0 );
    ruleBy( rowSlide, 'padding', 0 );

    if ( index < rows - 1 ) {
      ruleBy( rowSlide, 'marginBottom', unit( rowGap ) )
    }
  }

  function layoutCol( cols: number, index: number, colSlide: HTMLElement, rowSlide: HTMLElement ): void {
    const { col: colGap } = gridOptions.gap;
    const width = `calc(${ 100 / cols }%${ colGap ? ` - ${ unit( colGap ) } * ${ ( cols - 1 ) / cols }` : '' })`;

    colSlide.id = `${ rowSlide.id }-col${ pad( index + 1 ) }`;

    ruleBy( colSlide, 'width', width );
    ruleBy( colSlide, resolve( 'marginRight' ), unit( colGap ) );
  }

  return {
    layout,
  }
}
