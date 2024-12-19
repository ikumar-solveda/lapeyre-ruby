/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { couponsTableCheckboxSX } from '@/components/content/Coupons/styles/Table/checkbox';
import { CouponItem } from '@/data/types/Coupon';
import { Checkbox } from '@mui/material';
import { HeaderContext } from '@tanstack/react-table';
import { FC } from 'react';

export const CouponsTableHeaderCheckbox: FC<HeaderContext<CouponItem, unknown>> = ({ table }) => (
	<Checkbox
		checked={table.getIsAllRowsSelected()}
		indeterminate={table.getIsSomeRowsSelected()}
		onChange={table.getToggleAllRowsSelectedHandler()}
		sx={couponsTableCheckboxSX}
	/>
);
