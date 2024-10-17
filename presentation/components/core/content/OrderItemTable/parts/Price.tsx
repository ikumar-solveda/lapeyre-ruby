/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PriceDisplay } from '@/components/blocks/PriceDisplay';
import { OrderItemTableRowData } from '@/components/content/OrderItemTable/parts/Table';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Typography } from '@mui/material';
import { FC, useContext } from 'react';

const EMPTY_PRICE = { orderItemPrice: '', currency: '' };
export const OrderItemPrice: FC = () => {
	const { price: { orderItemPrice = null, currency = '' } = EMPTY_PRICE } = useContext(
		ContentContext
	) as OrderItemTableRowData;

	const price = Number(orderItemPrice);
	const priceDisplayNLS = useLocalization('PriceDisplay');

	return (
		<Typography variant="h6" data-testid="offer-price" id="offer-price">
			{orderItemPrice ? (
				<PriceDisplay currency={currency} min={price} />
			) : (
				priceDisplayNLS.Labels.Pending.t()
			)}
		</Typography>
	);
};
