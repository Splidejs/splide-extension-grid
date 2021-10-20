import { Splide } from '@splidejs/splide';
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
export declare function Layout(Splide: Splide, gridOptions: GridOptions, Dimension: DimensionComponent): LayoutComponent;
//# sourceMappingURL=../../../../src/js/extensions/Grid/Layout.d.ts.map