/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext } from 'react';
import { Typography } from '@mui/material';
import { PriceDisplay } from '@/components/blocks/PriceDisplay';
import { ContentContext } from '@/data/context/content';
import { dFix } from '@/utils/floatingPoint';
import { OrderHistoryTableRowValueType } from '@/components/content/OrderHistory/parts/Table';

export const OrderHistoryTablePrice: FC = () => {
	const { order } = useContext(ContentContext) as OrderHistoryTableRowValueType;
	return (
		<Typography data-testid="order-grand-total" id="order-grand-total">
			<PriceDisplay currency={order?.grandTotalCurrency} min={dFix(`${order?.grandTotal}`)} />
		</Typography>
	);
};
