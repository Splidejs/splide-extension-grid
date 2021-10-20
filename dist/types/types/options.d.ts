/**
 * Options for the Grid extension.
 *
 * @since 0.5.0
 */
export interface GridOptions {
    /**
     * Number of rows.
     */
    rows?: number;
    /**
     * Number of cols.
     *
     * @type {number}
     */
    cols?: number;
    /**
     * Collection of dimensions (rows and cols) as an array.
     * If the value is [ [ 1, 1 ], [ 2, 2 ] ], the first slide will be 1x1 and next all slides will be 2x2.
     * "rows" and "cols" options are ignored if this option is provided.
     */
    dimensions?: [number, number][];
    /**
     * Gaps for rows or cols.
     *
     * @example
     * gap: {
     *   row: 1em,
     *   col: 1em,
     * }
     */
    gap?: {
        row?: number | string;
        col?: number | string;
    };
}
//# sourceMappingURL=../../../src/js/types/options.d.ts.map