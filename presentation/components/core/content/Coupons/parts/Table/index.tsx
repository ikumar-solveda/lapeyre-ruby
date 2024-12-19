/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { TablePagination } from '@/components/blocks/TablePagination';
import { CouponsTableActionsCell } from '@/components/content/Coupons/parts/Table/ActionsCell';
import { CouponsTableCheckboxCell } from '@/components/content/Coupons/parts/Table/CheckboxCell';
import { CouponsTableDateCell } from '@/components/content/Coupons/parts/Table/DateCell';
import { CouponsTableHeaderCheckbox } from '@/components/content/Coupons/parts/Table/HeaderCheckbox';
import { CouponsTableHeaderRow } from '@/components/content/Coupons/parts/Table/HeaderRow';
import { CouponsTableNameCell } from '@/components/content/Coupons/parts/Table/NameCell';
import { CouponsTableRow } from '@/components/content/Coupons/parts/Table/Row';
import { CouponsTableToolbar } from '@/components/content/Coupons/parts/Table/Toolbar';
import { AVAILABLE_COUPONS_LIST_TABLE } from '@/data/constants/coupons';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { CouponContextValues, CouponItem } from '@/data/types/Coupon';
import { dFix } from '@/utils/floatingPoint';
import { Paper, TableContainer } from '@mui/material';
import {
	Row,
	RowSelectionState,
	createColumnHelper,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { isEmpty } from 'lodash';
import { FC, useContext, useEffect, useMemo, useState } from 'react';

const EMPTY_DATA = [] as CouponItem[];
const INIT_ROW_SELECTION = {};

export const CouponsTable: FC = () => {
	const ctxValues = useContext(ContentContext) as CouponContextValues;
	const [rowSelection, setRowSelection] = useState<RowSelectionState>(() => ({}));
	const { view, data, pagination, setPagination, pageCount, couponsList } = ctxValues;
	const couponsTableNLS = useLocalization('Coupons');

	const columns = useMemo(() => {
		const columnHelper = createColumnHelper<CouponItem>();
		return [
			columnHelper.display({
				id: 'select',
				header: CouponsTableHeaderCheckbox,
				cell: CouponsTableCheckboxCell,
				enableSorting: false,
			}),
			columnHelper.accessor((row) => row.description, {
				header: couponsTableNLS.Labels.CouponName.t(),
				id: 'couponName',
				cell: CouponsTableNameCell,
			}),
			columnHelper.accessor('expirationDateTime', {
				header: couponsTableNLS.Labels.ExpirationDate.t(),
				id: 'expirationDate',
				cell: CouponsTableDateCell,
				enableSorting: false,
			}),
			columnHelper.display({
				id: 'couponActions',
				header: couponsTableNLS.Labels.Actions.t(),
				cell: CouponsTableActionsCell,
				enableSorting: false,
			}),
		];
	}, [couponsTableNLS]);

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
	} = useReactTable({
		columns,
		data: couponsList ?? EMPTY_DATA,
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
		getRowId: (originalRow: CouponItem, _index: number, _parent?: Row<CouponItem>) =>
			originalRow.couponId ?? '',
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		pageCount,
		state: {
			pagination,
			rowSelection,
		},
		onPaginationChange: setPagination,
		getRowCanExpand: () => true,
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
		totalCount: dFix(data?.recordSetTotal ?? 0, 0),
	};
	const { rows } = getRowModel();

	useEffect(() => {
		setRowSelection(INIT_ROW_SELECTION);
	}, [data]);

	return (
		<>
			{!isEmpty(rowSelection) ? <CouponsTableToolbar rowSelection={rowSelection} /> : null}
			<TableContainer component={Paper} variant="outlined">
				<Table
					id={AVAILABLE_COUPONS_LIST_TABLE}
					data-testid={AVAILABLE_COUPONS_LIST_TABLE}
					size={view === 'full' ? 'medium' : 'small'}
					padding={view === 'full' ? 'normal' : 'none'}
				>
					<TableHead
						id={`${AVAILABLE_COUPONS_LIST_TABLE}-head`}
						data-testid={`${AVAILABLE_COUPONS_LIST_TABLE}-head`}
						responsive
					>
						{getHeaderGroups().map((headerGroup) => (
							<CouponsTableHeaderRow
								key={`${AVAILABLE_COUPONS_LIST_TABLE}-header-${headerGroup.id}`}
								headerGroup={headerGroup}
							/>
						))}
					</TableHead>
					<TableBody
						id={`${AVAILABLE_COUPONS_LIST_TABLE}-body`}
						data-testid={`${AVAILABLE_COUPONS_LIST_TABLE}-body`}
					>
						{rows.map((row) => (
							<CouponsTableRow
								key={`${AVAILABLE_COUPONS_LIST_TABLE}-row-${row.id}`}
								row={row}
								{...ctxValues}
							/>
						))}
					</TableBody>
				</Table>
				<TablePagination {...paginationComponentProps} />
			</TableContainer>
		</>
	);
};
