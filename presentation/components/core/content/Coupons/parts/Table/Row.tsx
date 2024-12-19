/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { AVAILABLE_COUPONS_LIST_TABLE } from '@/data/constants/coupons';
import { ContentProvider } from '@/data/context/content';
import { CouponContextValues, CouponItem } from '@/data/types/Coupon';
import { flexRender, Row } from '@tanstack/react-table';
import { FC, useMemo } from 'react';

export const CouponsTableRow: FC<{ row: Row<CouponItem> } & CouponContextValues> = ({
	row,
	...ctxValues
}) => {
	const contextValue = useMemo(() => ({ ...ctxValues, coupon: row.original }), [ctxValues, row]);
	return (
		<ContentProvider value={contextValue}>
			<TableRow
				id={`${AVAILABLE_COUPONS_LIST_TABLE}-row-${row.id}`}
				data-testid={`${AVAILABLE_COUPONS_LIST_TABLE}-row-${row.id}`}
				responsive
				selected={row.getIsSelected()}
			>
				{row.getVisibleCells().map((cell) => (
					<TableCell
						key={`${AVAILABLE_COUPONS_LIST_TABLE}-cell-${cell.id}`}
						id={`${AVAILABLE_COUPONS_LIST_TABLE}-cell-${cell.id}`}
						data-testid={`${AVAILABLE_COUPONS_LIST_TABLE}-cell-${cell.id}`}
						responsive
					>
						{flexRender(cell.column.columnDef.cell, cell.getContext())}
					</TableCell>
				))}
			</TableRow>
		</ContentProvider>
	);
};
