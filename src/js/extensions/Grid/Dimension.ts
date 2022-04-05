import { isArray, min, assert } from '@splidejs/splide/src/js/utils';
import { GridOptions } from '../../types/options';


/**
 * The interface for the Dimension subcomponent.
 *
 * @since 0.3.0
 */
export interface DimensionComponent {
  get( index: number ): [ number, number ];
  getAt( index: number ): [ number, number ];
}

/**
 * The subcomponent to calculate dimension at the specific index.
 *
 * @param options - Initialized grid options.
 *
 * @return A Dimension sub-component.
 */
export function Dimension( options: GridOptions ): DimensionComponent {
  /**
   * Retrieves the dimension array from options.
   * If it is not available, returns [ [ options.rows, options.cols ] ].
   *
   * @return An array with dimensions.
   */
  function normalize(): [ number, number ][] {
    const { rows, cols, dimensions } = options;
    return isArray( dimensions ) && dimensions.length ? dimensions : [ [ rows, cols ] ];
  }

  /**
   * Returns the dimension (`[ row, col ]`) at the specified index.
   *
   * @param index - An index.
   *
   * @return A tuple with rows and cols.
   */
  function get( index: number ): [ number, number ] {
    const dimensions = normalize();
    return dimensions[ min( index, dimensions.length - 1 ) ];
  }

  /**
   * Returns the dimension (`[ row, col ]`) where the slide at the specified index should belong.
   *
   * @param index - A slide index (before they are assigned to cols).
   *
   * @return A tuple with rows and cols.
   */
  function getAt( index: number ): [ number, number ] {
    const dimensions = normalize();

    let rows, cols, aggregator = 0;

    for ( let i = 0; i < dimensions.length; i++ ) {
      const dimension = dimensions[ i ];
      rows = dimension[ 0 ] || 1;
      cols = dimension[ 1 ] || 1;

      aggregator += rows * cols;

      if ( index < aggregator ) {
        break;
      }
    }

    assert( rows && cols, 'Invalid dimension' );

    return [ rows, cols ];
  }

  return {
    get,
    getAt,
  };
}
