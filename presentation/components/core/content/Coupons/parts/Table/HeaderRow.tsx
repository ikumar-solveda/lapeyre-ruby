/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { AVAILABLE_COUPONS_LIST_TABLE } from '@/data/constants/coupons';
import { CouponItem } from '@/data/types/Coupon';
import { flexRender, HeaderGroup } from '@tanstack/react-table';
import { FC } from 'react';

export const CouponsTableHeaderRow: FC<{
	headerGroup: HeaderGroup<CouponItem>;
}> = ({ headerGroup }) => (
	<TableRow
		id={`${AVAILABLE_COUPONS_LIST_TABLE}-head-row-${headerGroup.id}`}
		data-testid={`${AVAILABLE_COUPONS_LIST_TABLE}-head-row-${headerGroup.id}`}
	>
		{headerGroup.headers.map((header) => (
			<TableCell
				colSpan={header.colSpan}
				key={`${AVAILABLE_COUPONS_LIST_TABLE}-head-row-${headerGroup.id}-cell-${header.id}`}
				id={`${AVAILABLE_COUPONS_LIST_TABLE}-head-row-${headerGroup.id}-cell-${header.id}`}
				data-testid={`${AVAILABLE_COUPONS_LIST_TABLE}-head-row-${headerGroup.id}-cell-${header.id}`}
			>
				{flexRender(header.column.columnDef.header, header.getContext())}
			</TableCell>
		))}
	</TableRow>
);
