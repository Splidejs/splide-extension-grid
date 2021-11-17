import { BaseComponent, Components, Options, Splide } from '@splidejs/splide';
import { GridOptions } from '../../types/options';
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
export declare function Grid(Splide: Splide, Components: Components, options: Options): GridComponent;
//# sourceMappingURL=../../../../src/js/extensions/Grid/Grid.d.ts.map