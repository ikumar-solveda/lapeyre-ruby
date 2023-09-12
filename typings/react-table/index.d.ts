/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

// react-table-config.d.ts

import {
	UseColumnOrderInstanceProps,
	UseColumnOrderState,
	UseExpandedHooks,
	UseExpandedInstanceProps,
	UseExpandedOptions,
	UseExpandedRowProps,
	UseExpandedState,
	UseFiltersColumnOptions,
	UseFiltersColumnProps,
	UseFiltersInstanceProps,
	UseFiltersOptions,
	UseFiltersState,
	UseGlobalFiltersColumnOptions,
	UseGlobalFiltersInstanceProps,
	UseGlobalFiltersOptions,
	UseGlobalFiltersState,
	UseGroupByCellProps,
	UseGroupByColumnOptions,
	UseGroupByColumnProps,
	UseGroupByHooks,
	UseGroupByInstanceProps,
	UseGroupByOptions,
	UseGroupByRowProps,
	UseGroupByState,
	UsePaginationInstanceProps,
	UsePaginationOptions,
	UsePaginationState,
	UseResizeColumnsColumnOptions,
	UseResizeColumnsState,
	UseRowSelectHooks,
	UseRowSelectInstanceProps,
	UseRowSelectOptions,
	UseRowSelectRowProps,
	UseRowSelectState,
	UseRowStateCellProps,
	UseRowStateInstanceProps,
	UseRowStateRowProps,
	UseRowStateState,
	UseSortByColumnOptions,
	UseSortByColumnProps,
	UseSortByHooks,
	UseSortByInstanceProps,
	UseSortByOptions,
	UseSortByState,
} from 'react-table';

/**
 * @deprecated use '@tanstack/react-table' instead
 */
declare module 'react-table' {
	// take this file as-is, or comment out the sections that don't apply to your plugin configuration

	/**
	 * @deprecated use '@tanstack/react-table' instead
	 */
	export interface TableOptions<D extends Record<string, unknown>>
		extends UseExpandedOptions<D>,
			UseFiltersOptions<D>,
			UseGlobalFiltersOptions<D>,
			UseGroupByOptions<D>,
			UsePaginationOptions<D>,
			UseRowSelectOptions<D>,
			UseSortByOptions<D>,
			// note that having Record here allows you to add anything to the options, this matches the spirit of the
			// underlying js library, but might be cleaner if it's replaced by a more specific type that matches your
			// feature set, this is a safe default.
			Record<string, any> {}

	/**
	 * @deprecated use '@tanstack/react-table' instead
	 */
	export interface Hooks<D extends Record<string, unknown> = Record<string, unknown>>
		extends UseExpandedHooks<D>,
			UseGroupByHooks<D>,
			UseRowSelectHooks<D>,
			UseSortByHooks<D> {}

	/**
	 * @deprecated use '@tanstack/react-table' instead
	 */
	export interface TableInstance<D extends Record<string, unknown> = Record<string, unknown>>
		extends UseColumnOrderInstanceProps<D>,
			UseExpandedInstanceProps<D>,
			UseFiltersInstanceProps<D>,
			UseGlobalFiltersInstanceProps<D>,
			UseGroupByInstanceProps<D>,
			UsePaginationInstanceProps<D>,
			UseRowSelectInstanceProps<D>,
			UseRowStateInstanceProps<D>,
			UseSortByInstanceProps<D> {}

	/**
	 * @deprecated use '@tanstack/react-table' instead
	 */
	export interface TableState<D extends Record<string, unknown> = Record<string, unknown>>
		extends UseColumnOrderState<D>,
			UseExpandedState<D>,
			UseFiltersState<D>,
			UseGlobalFiltersState<D>,
			UseGroupByState<D>,
			UsePaginationState<D>,
			UseResizeColumnsState<D>,
			UseRowSelectState<D>,
			UseRowStateState<D>,
			UseSortByState<D> {}
	/**
	 * @deprecated use '@tanstack/react-table' instead
	 */
	export interface ColumnInterface<D extends Record<string, unknown> = Record<string, unknown>>
		extends UseFiltersColumnOptions<D>,
			UseGlobalFiltersColumnOptions<D>,
			UseGroupByColumnOptions<D>,
			UseResizeColumnsColumnOptions<D>,
			UseSortByColumnOptions<D> {}
	/**
	 * @deprecated use '@tanstack/react-table' instead
	 */
	export interface ColumnInstance<D extends Record<string, unknown> = Record<string, unknown>>
		extends UseFiltersColumnProps<D>,
			UseGroupByColumnProps<D>,
			UseSortByColumnProps<D> {}

	export interface Cell<D extends Record<string, unknown> = Record<string, unknown>, V = any>
		extends UseGroupByCellProps<D>,
			UseRowStateCellProps<D> {}

	/**
	 * @deprecated use '@tanstack/react-table' instead
	 */
	export interface Row<D extends Record<string, unknown> = Record<string, unknown>>
		extends UseExpandedRowProps<D>,
			UseGroupByRowProps<D>,
			UseRowSelectRowProps<D>,
			UseRowStateRowProps<D> {}
}
