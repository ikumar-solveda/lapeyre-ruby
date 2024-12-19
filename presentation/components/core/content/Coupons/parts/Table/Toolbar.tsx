/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { couponsTableToolbarStack } from '@/components/content/Coupons/styles/Table/toolbarStack';
import { useLocalization } from '@/data/Localization';
import { AVAILABLE_COUPONS_LIST_TABLE } from '@/data/constants/coupons';
import { ContentContext } from '@/data/context/content';
import { CouponContextValues, CouponItem } from '@/data/types/Coupon';
import { Button, Stack, Toolbar, Typography } from '@mui/material';
import { RowSelectionState } from '@tanstack/react-table';
import { entries } from 'lodash';
import { FC, useCallback, useContext, useMemo } from 'react';

export const CouponsTableToolbar: FC<{
	rowSelection: RowSelectionState;
}> = ({ rowSelection }) => {
	const couponsTableNLS = useLocalization('Coupons');
	const { onToggle, deleteCoupons, couponsList } = useContext(
		ContentContext
	) as CouponContextValues;
	const selectedItems = useMemo(
		() =>
			(
				couponsList?.filter(({ couponId }) => couponId && rowSelection[couponId]) ??
				([] as CouponItem[])
			).map(({ couponId }) => ({ couponId })),
		[couponsList, rowSelection]
	);

	const onConfirmDelete = useCallback(async () => {
		await deleteCoupons(
			entries(rowSelection)
				.filter(([_, value]) => value)
				.map(([key]) => key)
		);
		onToggle()();
	}, [deleteCoupons, onToggle, rowSelection]);

	return (
		<Toolbar
			id={`${AVAILABLE_COUPONS_LIST_TABLE}-toolbar`}
			data-testid={`${AVAILABLE_COUPONS_LIST_TABLE}-toolbar`}
		>
			<Stack {...couponsTableToolbarStack}>
				{selectedItems.length ? (
					<>
						<Typography variant="subtitle1" component="div" m={1}>
							{couponsTableNLS.nCouponsSel.t({ n: selectedItems.length })}
						</Typography>
						<Button
							id={`${AVAILABLE_COUPONS_LIST_TABLE}-toolbar-group-delete`}
							data-testid={`${AVAILABLE_COUPONS_LIST_TABLE}-toolbar-group-delete`}
							variant="contained"
							disabled={!!!couponsList?.length}
							onClick={onToggle(onConfirmDelete)}
						>
							{couponsTableNLS.deleteSelected.t()}
						</Button>
					</>
				) : null}
			</Stack>
		</Toolbar>
	);
};
