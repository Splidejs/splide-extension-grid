import { Options, Splide, Components, BaseComponent } from '@splidejs/splide';
import { min } from '@splidejs/splide/src/js/utils';
import { GridOptions } from '../../types/options';



export interface DimensionComponent {
  getAt( index: number ): number[];
}


export function Dimension( options: GridOptions ): DimensionComponent {
  function get(): number[][] {
    const { rows, cols, dimensions = [] } = options;
    dimensions.push( [ rows, cols ] );
    return dimensions;
  }

  function getAt( index: number ): number[] {
    const dimensions = get();
    return dimensions[ min( index, dimensions.length - 1 ) ];
  }

  return {
    getAt,
  }
}
