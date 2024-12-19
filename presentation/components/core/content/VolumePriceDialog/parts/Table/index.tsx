/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { TablePagination } from '@/components/blocks/TablePagination';
import { VolumePriceDialogTableHeaderRow } from '@/components/content/VolumePriceDialog/parts/Table/HeaderRow';
import { VolumePriceDialogTablePricePerItem } from '@/components/content/VolumePriceDialog/parts/Table/PricePerItem';
import { VolumePriceDialogTableQuantityRange } from '@/components/content/VolumePriceDialog/parts/Table/QuantityRange';
import { VolumePriceDialogTableRow } from '@/components/content/VolumePriceDialog/parts/Table/Row';
import {
	VOLUME_PRICE_TABLE_ACCESSOR_KEYS,
	VOLUME_PRICE_TABLE_PREFIX,
} from '@/data/constants/product';
import { PAGINATION } from '@/data/constants/tablePagination';
import { useBundleDetailsTable } from '@/data/Content/BundleDetailsTable';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { useSkuListTable } from '@/data/Content/SkuListTable';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Paper, TableContainer, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { FC, useContext, useMemo } from 'react';

export const VolumePriceDialogTable: FC = () => {
	const { rangePriceList: data } = useContext(ContentContext) as ReturnType<
		typeof useProductDetails
	> &
		typeof useSkuListTable &
		typeof useBundleDetailsTable;
	const localization = useLocalization('VolumePricingDialog');
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const view = isMobile ? 'compact' : 'full';

	const columns = useMemo(
		() => [
			{
				accessorKey: VOLUME_PRICE_TABLE_ACCESSOR_KEYS.quantityRange,
				header: localization.Labels.QuantityRange.t(),
				cell: VolumePriceDialogTableQuantityRange,
			},
			{
				accessorKey: VOLUME_PRICE_TABLE_ACCESSOR_KEYS.pricePerItem,
				header: localization.Labels.PricePerItem.t(),
				cell: VolumePriceDialogTablePricePerItem,
			},
		],
		[localization.Labels.PricePerItem, localization.Labels.QuantityRange]
	);

	const {
		getState,
		setPageSize,
		setPageIndex: gotoPage,
		getCanPreviousPage,
		getCanNextPage,
		nextPage,
		previousPage,
		getPageCount,
		getHeaderGroups,
		getRowModel,
	} = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: {
			pagination: {
				pageIndex: 0,
				pageSize: PAGINATION.sizes[0],
			},
		},
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
		totalCount: data.length,
	};

	return (
		<TableContainer component={Paper} variant="outlined">
			<Table size="small" id={VOLUME_PRICE_TABLE_PREFIX} data-testid={VOLUME_PRICE_TABLE_PREFIX}>
				{view === 'full' ? (
					<TableHead
						id={`${VOLUME_PRICE_TABLE_PREFIX}-head`}
						data-testid={`${VOLUME_PRICE_TABLE_PREFIX}-head`}
						responsive
					>
						{getHeaderGroups().map((headerGroup, i) => (
							<VolumePriceDialogTableHeaderRow
								key={`${VOLUME_PRICE_TABLE_PREFIX}-head-${i}`}
								headerGroup={headerGroup}
							/>
						))}
					</TableHead>
				) : null}
				<TableBody
					id={`${VOLUME_PRICE_TABLE_PREFIX}-body`}
					data-testid={`${VOLUME_PRICE_TABLE_PREFIX}-body`}
				>
					{getRowModel().rows.map((row, i) => (
						<VolumePriceDialogTableRow key={`${VOLUME_PRICE_TABLE_PREFIX}-row-${i}`} row={row} />
					))}
				</TableBody>
			</Table>
			<TablePagination {...paginationComponentProps} />
		</TableContainer>
	);
};
