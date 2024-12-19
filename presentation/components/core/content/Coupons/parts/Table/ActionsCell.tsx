/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { couponsTableActionsButtonSX } from '@/components/content/Coupons/styles/Table/actionsButton';
import { couponsTableActionsStack } from '@/components/content/Coupons/styles/Table/actionsStack';
import { useLocalization } from '@/data/Localization';
import { AVAILABLE_COUPONS_LIST_TABLE } from '@/data/constants/coupons';
import { ContentContext } from '@/data/context/content';
import { CouponContextValues, CouponItem } from '@/data/types/Coupon';
import { DeleteOutlineOutlined } from '@mui/icons-material';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC, useCallback, useContext } from 'react';

export const CouponsTableActionsCell: FC<CellContext<CouponItem, unknown>> = ({ row }) => {
	const couponsTableNLS = useLocalization('Coupons');
	const { deleteCoupons, onToggle } = useContext(ContentContext) as CouponContextValues;
	const onDelete = useCallback(async () => {
		await deleteCoupons([row.id]);
		onToggle()();
	}, [deleteCoupons, row.id, onToggle]);

	return (
		<TableCellResponsiveContent label={couponsTableNLS.Labels.Actions.t()}>
			<Stack {...couponsTableActionsStack}>
				<Tooltip title={couponsTableNLS.Actions.DeleteCoupon.t()}>
					<IconButton
						data-testid={`${AVAILABLE_COUPONS_LIST_TABLE}-coupon-${row.id}-delete`}
						id={`${AVAILABLE_COUPONS_LIST_TABLE}-coupon-${row.id}-delete`}
						sx={couponsTableActionsButtonSX}
						onClick={onToggle(onDelete)}
						color="primary"
					>
						<DeleteOutlineOutlined />
					</IconButton>
				</Tooltip>
			</Stack>
		</TableCellResponsiveContent>
	);
};
