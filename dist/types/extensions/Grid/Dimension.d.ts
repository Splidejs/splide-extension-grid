import { GridOptions } from '../../types/options';
/**
 * The interface for the Dimension subcomponent.
 *
 * @since 0.3.0
 */
export interface DimensionComponent {
    get(index: number): [number, number];
    getAt(index: number): [number, number];
}
/**
 * The subcomponent to calculate dimension at the specific index.
 *
 * @param options - Initialized grid options.
 *
 * @return A Dimension sub-component.
 */
export declare function Dimension(options: GridOptions): DimensionComponent;
//# sourceMappingURL=../../../../src/js/extensions/Grid/Dimension.d.ts.map