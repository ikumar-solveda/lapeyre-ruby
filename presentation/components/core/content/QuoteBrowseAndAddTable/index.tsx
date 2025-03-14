/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { TablePagination } from '@/components/blocks/TablePagination';
import { QuoteBrowseAndAddTableActionsCell } from '@/components/content/QuoteBrowseAndAddTable/parts/ActionsCell';
import { QuoteBrowseAndAddTableCollapsibleCell } from '@/components/content/QuoteBrowseAndAddTable/parts/CollapsibleCell';
import { QuoteBrowseAndAddTableHeaderRow } from '@/components/content/QuoteBrowseAndAddTable/parts/HeaderRow';
import { QuoteBrowseAndAddTablePriceCell } from '@/components/content/QuoteBrowseAndAddTable/parts/PriceCell';
import { QuoteBrowseAndAddTableRow } from '@/components/content/QuoteBrowseAndAddTable/parts/Row';
import { QuoteBrowseAndAddTableSKUCell } from '@/components/content/QuoteBrowseAndAddTable/parts/SKUCell';
import { quoteBrowseAndAddTableStackSX } from '@/components/content/QuoteBrowseAndAddTable/styles/stack';
import { ADD_PRODS_TABLE } from '@/data/constants/quotes';
import { PAGINATION } from '@/data/constants/tablePagination';
import { useCurrencyFormat } from '@/data/Content/CurrencyFormat';
import type { useQuoteBrowseAndAdd } from '@/data/Content/QuoteBrowseAndAdd';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { ContentProvider } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type { ProductType } from '@/data/types/Product';
import type { QuoteBrowseAndAddTableContextValues, QuoteItem } from '@/data/types/Quote';
import { Paper, Stack, TableContainer } from '@mui/material';
import {
	type Row,
	createColumnHelper,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { type FC, useMemo } from 'react';

type QuoteBrowseAndAddTableProps = {
	quoteData: QuoteItem;
	quoteBrowseAndAdd: ReturnType<typeof useQuoteBrowseAndAdd>;
};

export const QuoteBrowseAndAddTable: FC<QuoteBrowseAndAddTableProps> = (props) => {
	const localization = useLocalization('QuoteProductsTable');
	const { quoteBrowseAndAdd, quoteData } = props;
	const { productsPageCount, pagination, setPagination, productsDetailsData } = quoteBrowseAndAdd;

	const initialPagination = useMemo(() => ({ pageIndex: 0, pageSize: PAGINATION.sizes[0] }), []);

	const { decimalPlaces } = useCurrencyFormat();
	const { localeName: locale } = useStoreLocale();
	const currency = useMemo(() => quoteData?.currency, [quoteData]);

	const columns = useMemo(() => {
		const columnHelper = createColumnHelper<ProductType>();
		return [
			columnHelper.display({
				header: () => null,
				id: 'collapsible',
				cell: QuoteBrowseAndAddTableCollapsibleCell,
			}),
			columnHelper.accessor((row) => row.partNumber, {
				header: localization.Product.t(),
				id: 'productName',
				cell: QuoteBrowseAndAddTableSKUCell,
			}),
			columnHelper.accessor((row) => row.productPrice, {
				header: localization.Price.t(),
				id: 'productPrice',
				cell: QuoteBrowseAndAddTablePriceCell,
			}),
			columnHelper.accessor((row) => row.id, {
				id: 'productActions',
				header: localization.Actions.t(),
				cell: QuoteBrowseAndAddTableActionsCell,
				enableSorting: false,
			}),
		];
	}, [localization]);

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
	} = useReactTable<ProductType>({
		columns,
		data: productsDetailsData,
		getRowId: (row: ProductType, _index: number, _parent?: Row<ProductType>) =>
			row.partNumber ?? '',
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getRowCanExpand: () => true,
		initialState: { pagination: initialPagination },
		pageCount: productsPageCount,
		state: { pagination },
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
		totalCount: productsDetailsData.length,
	};
	const { rows } = getRowModel();

	const ctxValues: QuoteBrowseAndAddTableContextValues = useMemo(
		() => ({ ...quoteBrowseAndAdd, decimalPlaces, locale, currency }),
		[quoteBrowseAndAdd, decimalPlaces, locale, currency]
	);

	return (
		<TableContainer component={Paper} variant="outlined">
			<ContentProvider value={ctxValues}>
				<Stack sx={quoteBrowseAndAddTableStackSX}>
					<Table id={`${ADD_PRODS_TABLE}`} data-testid={`${ADD_PRODS_TABLE}`}>
						<TableHead
							id={`${ADD_PRODS_TABLE}-head`}
							data-testid={`${ADD_PRODS_TABLE}-head`}
							responsive
						>
							{getHeaderGroups().map((headerGroup) => (
								<QuoteBrowseAndAddTableHeaderRow
									key={`${ADD_PRODS_TABLE}-header-${headerGroup.id}`}
									headerGroup={headerGroup}
								/>
							))}
						</TableHead>
						<TableBody id={`${ADD_PRODS_TABLE}-body`} data-testid={`${ADD_PRODS_TABLE}-body`}>
							{rows.map((row) => (
								<QuoteBrowseAndAddTableRow key={`${ADD_PRODS_TABLE}-row-${row.id}`} row={row} />
							))}
						</TableBody>
					</Table>
					<TablePagination {...paginationComponentProps} />
				</Stack>
			</ContentProvider>
		</TableContainer>
	);
};
