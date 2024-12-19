/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { couponsTableCheckboxSX } from '@/components/content/Coupons/styles/Table/checkbox';
import { AVAILABLE_COUPONS_LIST_TABLE } from '@/data/constants/coupons';
import { useLocalization } from '@/data/Localization';
import { CouponItem } from '@/data/types/Coupon';
import { Checkbox } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';

export const CouponsTableCheckboxCell: FC<CellContext<CouponItem, unknown>> = ({ row }) => {
	const couponsTableNLS = useLocalization('Coupons');

	return (
		<TableCellResponsiveContent label={couponsTableNLS.Select.t()}>
			<Checkbox
				id={`${AVAILABLE_COUPONS_LIST_TABLE}-select-item-${row.id}`}
				data-testid={`${AVAILABLE_COUPONS_LIST_TABLE}-select-item-${row.id}`}
				aria-label={couponsTableNLS.Select.t()}
				checked={row.getIsSelected()}
				onChange={row.getToggleSelectedHandler()}
				sx={couponsTableCheckboxSX}
			/>
		</TableCellResponsiveContent>
	);
};
