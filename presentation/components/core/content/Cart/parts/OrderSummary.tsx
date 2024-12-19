/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { OrderAvailableCoupons } from '@/components/blocks/OrderAvailableCoupons';
import { OrderPromotionsSummary } from '@/components/blocks/OrderPromotionsSummary';
import { OrderTotalSummary } from '@/components/blocks/OrderTotalSummary';
import { CartProfileSelection } from '@/components/content/Cart/parts/ProfileSelection';
import { summaryPaperSX } from '@/components/content/Cart/style';
import { ContentContext } from '@/data/context/content';
import { OrderSummaryContextValues } from '@/data/types/Order';
import { Paper, Stack } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

export const CartOrderSummary: FC = () => {
	const { activeIssuedCoupons, activeAppliedCoupons } = useContext(
		ContentContext
	) as OrderSummaryContextValues;

	const shouldShowCoupons = useMemo(
		() => activeIssuedCoupons?.length > 0 || activeAppliedCoupons?.length > 0,
		[activeIssuedCoupons, activeAppliedCoupons]
	);

	return (
		<Stack gap={3}>
			<Paper sx={summaryPaperSX}>
				<OrderTotalSummary />
			</Paper>
			<Paper sx={summaryPaperSX}>
				<CartProfileSelection />
			</Paper>
			{shouldShowCoupons ? (
				<Paper sx={summaryPaperSX}>
					<OrderAvailableCoupons />
				</Paper>
			) : null}
			<Paper sx={summaryPaperSX}>
				<OrderPromotionsSummary />
			</Paper>
		</Stack>
	);
};
