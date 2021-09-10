import { isArray } from '@splidejs/splide/src/js/utils';
import { GridOptions } from '../../types/options';


/**
 * The interface for the Dimension sub component.
 *
 * @since 0.3.0
 */
export interface DimensionComponent {
  getAt( index: number ): number[];
}

/**
 * The sub component to calculate dimension at the specific index.
 *
 * @param options - Initialized grid options.
 *
 * @return A Dimension sub component.
 */
export function Dimension( options: GridOptions ): DimensionComponent {
  /**
   * Retrieves the dimension array from options.
   *
   * @return An array with dimensions that may be empty.
   */
  function get(): [ number, number ][] {
    const { dimensions } = options;
    return isArray( dimensions ) ? dimensions : [];
  }

  /**
   * Returns dimension ([ row, col ]) at the specified index.
   * If the dimensions option is not available or the index is out of the range,
   * this keeps returning `[ options.rows, options.cols ]`.
   *
   * @param index - An index.
   *
   * @return A tuple with rows and cols.
   */
  function getAt( index: number ): [ number, number ] {
    const { rows, cols } = options;
    const dimensions = get();
    return dimensions[ index ] || [ rows, cols ];
  }

  return {
    getAt,
  }
}
