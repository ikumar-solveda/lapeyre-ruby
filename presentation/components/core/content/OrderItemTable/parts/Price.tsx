/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext } from 'react';
import { Typography } from '@mui/material';
import { OrderItemTableRowData } from '@/components/content/OrderItemTable/parts/Table';
import { PriceDisplay } from '@/components/blocks/PriceDisplay';
import { ContentContext } from '@/data/context/content';

const EMPTY_PRICE = { orderItemPrice: '', currency: '' };
export const OrderItemPrice: FC = () => {
	const { price: { orderItemPrice = '', currency = '' } = EMPTY_PRICE } = useContext(
		ContentContext
	) as OrderItemTableRowData;

	const price = Number(orderItemPrice);

	return (
		<Typography variant="h6" data-testid="offer-price" id="offer-price">
			<PriceDisplay currency={currency} min={price} />
		</Typography>
	);
};
