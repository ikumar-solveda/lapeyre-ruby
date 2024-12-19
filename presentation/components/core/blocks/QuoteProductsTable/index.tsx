/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { QuoteProductsTableActionsCell } from '@/components/blocks/QuoteProductsTable/parts/ActionsCell';
import { QuoteProductsTableCheckboxCell } from '@/components/blocks/QuoteProductsTable/parts/CheckboxCell';
import { QuoteProductsTableCollapsibleCell } from '@/components/blocks/QuoteProductsTable/parts/CollapsibleCell';
import { QuoteProductsTableHeaderCheckbox } from '@/components/blocks/QuoteProductsTable/parts/HeaderCheckbox';
import { QuoteProductsTableHeaderRow } from '@/components/blocks/QuoteProductsTable/parts/HeaderRow';
import { QuoteProductsTableOfferedPriceCell } from '@/components/blocks/QuoteProductsTable/parts/OfferedPriceCell';
import { QuoteProductsTablePriceCell } from '@/components/blocks/QuoteProductsTable/parts/PriceCell';
import { QuoteProductsTableProposedPriceCell } from '@/components/blocks/QuoteProductsTable/parts/ProposedPriceCell';
import { QuoteProductsTableQuantityCell } from '@/components/blocks/QuoteProductsTable/parts/QuantityCell';
import { QuoteProductsTableRow } from '@/components/blocks/QuoteProductsTable/parts/Row';
import { QuoteProductsTableSKUCell } from '@/components/blocks/QuoteProductsTable/parts/SKUCell';
import { QuoteProductsTableToolbar } from '@/components/blocks/QuoteProductsTable/parts/Toolbar';
import { quoteProductsTableStackSX } from '@/components/blocks/QuoteProductsTable/styles/stack';
import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { TablePagination } from '@/components/blocks/TablePagination';
import { PRODUCTS_TABLE, State } from '@/data/constants/quotes';
import { PAGINATION } from '@/data/constants/tablePagination';
import { useCurrencyFormat } from '@/data/Content/CurrencyFormat';
import { useProductMulti } from '@/data/Content/ProductMulti';
import type { useQuoteProducts } from '@/data/Content/QuoteProducts';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { ContentProvider } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type { ProductItem, QuoteItem } from '@/data/types/Quote';
import { Paper, Stack, TableContainer, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
	type Row,
	type RowSelectionState,
	type VisibilityState,
	createColumnHelper,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { isEmpty } from 'lodash';
import { type FC, useEffect, useMemo, useState } from 'react';

const EMPTY_DATA = [] as ProductItem[];
type QuoteProductsTableProps = {
	detailsView?: boolean;
	quoteData: QuoteItem;
	editProposedPrice?: boolean;
	quoteProducts: ReturnType<typeof useQuoteProducts>;
};
const INIT_ROW_SELECTION = {};

export const QuoteProductsTable: FC<QuoteProductsTableProps> = (props) => {
	const localization = useLocalization('QuoteProductsTable');
	const { quoteProducts, detailsView = false, quoteData, editProposedPrice = true } = props;

	const { dataProducts, pagination, setPagination, productsPageCount } = quoteProducts;
	const { data: productsDetailsData } = useProductMulti(
		(dataProducts?.contents.map((item) => item.sku) as string[]) ?? []
	);
	const [rowSelection, setRowSelection] = useState<RowSelectionState>(() => ({}));
	const initialPagination = useMemo(() => ({ pageIndex: 0, pageSize: PAGINATION.sizes[0] }), []);
	const theme = useTheme();
	const sm = useMediaQuery(theme.breakpoints.down('md'));
	const { decimalPlaces } = useCurrencyFormat();
	const { localeName: locale } = useStoreLocale();
	const currency = useMemo(() => quoteData?.currency, [quoteData]);

	const columns = useMemo(() => {
		const columnHelper = createColumnHelper<ProductItem>();
		return [
			columnHelper.display({
				id: 'select',
				header: QuoteProductsTableHeaderCheckbox,
				cell: QuoteProductsTableCheckboxCell,
				enableSorting: false,
			}),
			columnHelper.display({
				header: () => null,
				id: 'collapsible',
				cell: QuoteProductsTableCollapsibleCell,
			}),
			columnHelper.accessor((row) => row.sku, {
				header: localization.Product.t(),
				id: 'productName',
				cell: QuoteProductsTableSKUCell,
			}),
			columnHelper.accessor((row) => row.listPrice, {
				header: localization.Price.t(),
				id: 'productPrice',
				cell: QuoteProductsTablePriceCell,
			}),
			columnHelper.accessor((row) => row.quantity, {
				header: localization.Quantity.t(),
				id: 'productQuantity',
				cell: QuoteProductsTableQuantityCell,
			}),
			columnHelper.accessor((row) => row.proposedPrice, {
				header: localization.ProposedPrice.t(),
				id: 'productProposedPrice',
				cell: QuoteProductsTableProposedPriceCell,
			}),
			columnHelper.accessor((row) => row.quotedPrice, {
				header: localization.ProposedPrice.t(),
				id: 'productOfferedPrice',
				cell: QuoteProductsTableOfferedPriceCell,
			}),
			columnHelper.accessor((row) => row.id, {
				id: 'productActions',
				header: localization.Actions.t(),
				cell: QuoteProductsTableActionsCell,
				enableSorting: false,
			}),
		];
	}, [localization]);

	const columnVisibility = useMemo<VisibilityState>(
		() =>
			(detailsView
				? quoteData?.status === State.READY
					? { select: false, productActions: false, productProposedPrice: false }
					: {
							select: false,
							productActions: false,
							productOfferedPrice: false,
							productProposedPrice: false,
					  }
				: { select: !sm, productOfferedPrice: false }) as VisibilityState,
		[detailsView, quoteData, sm]
	);

	const {
		getHeaderGroups,
		getState,
		setPageSize,
		setPageIndex: gotoPage,
		getCanPreviousPage,
		getCanNextPage,
		nextPage,
		previousPage,
		getPageCount,
		getRowModel,
	} = useReactTable<ProductItem>({
		columns,
		data: dataProducts?.contents ?? EMPTY_DATA,
		getRowId: (row: ProductItem, _index: number, _parent?: Row<ProductItem>) => row.sku ?? '',
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getRowCanExpand: () => true,
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		initialState: { pagination: initialPagination },
		manualPagination: true,
		pageCount: productsPageCount,
		state: { pagination, columnVisibility, rowSelection },
		onPaginationChange: setPagination,
	});

	const paginationComponentProps = {
		canPreviousPage: getCanPreviousPage(),
		canNextPage: getCanNextPage(),
		pageCount: getPageCount(),
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		pageIndex: getState().pagination.pageIndex,
		pageSize: getState().pagination.pageSize,
		totalCount: dataProducts?.count ?? 0,
	};
	const { rows } = getRowModel();

	useEffect(() => {
		setRowSelection(INIT_ROW_SELECTION);
	}, [dataProducts?.contents]);

	const ctxValues = useMemo(
		() => ({
			...quoteProducts,
			editProposedPrice,
			detailsView,
			productsDetailsData,
			decimalPlaces,
			locale,
			currency,
		}),
		[
			quoteProducts,
			editProposedPrice,
			detailsView,
			productsDetailsData,
			decimalPlaces,
			locale,
			currency,
		]
	);

	return (
		<TableContainer component={Paper} variant="outlined">
			<ContentProvider value={ctxValues}>
				<Stack sx={quoteProductsTableStackSX}>
					{!isEmpty(rowSelection) ? (
						<QuoteProductsTableToolbar rowSelection={rowSelection} />
					) : null}
					<Table id={`${PRODUCTS_TABLE}`} data-testid={`${PRODUCTS_TABLE}`}>
						<TableHead
							id={`${PRODUCTS_TABLE}-head`}
							data-testid={`${PRODUCTS_TABLE}-head`}
							responsive
						>
							{getHeaderGroups().map((headerGroup) => (
								<QuoteProductsTableHeaderRow
									key={`${PRODUCTS_TABLE}-header-${headerGroup.id}`}
									headerGroup={headerGroup}
								/>
							))}
						</TableHead>
						<TableBody id={`${PRODUCTS_TABLE}-body`} data-testid={`${PRODUCTS_TABLE}-body`}>
							{rows.map((row) => (
								<QuoteProductsTableRow key={`${PRODUCTS_TABLE}-row-${row.id}`} row={row} />
							))}
						</TableBody>
					</Table>
					<TablePagination {...paginationComponentProps} />
				</Stack>
			</ContentProvider>
		</TableContainer>
	);
};
