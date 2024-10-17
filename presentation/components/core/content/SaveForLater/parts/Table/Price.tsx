/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { PriceDisplay } from '@/components/blocks/PriceDisplay';
import { SaveForLaterTableRowData } from '@/components/content/SaveForLater/parts/Table';
import { useLocalization } from '@/data/Localization';
import { dFix } from '@/data/Settings';
import { ContentContext } from '@/data/context/content';
import { Typography } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

const EMPTY_PRICE = { itemPrice: '', currency: '' };
export const SaveForLaterTablePrice: FC = () => {
	const priceDisplayNLS = useLocalization('PriceDisplay');
	const { price: { itemPrice = '', currency = '' } = EMPTY_PRICE } = useContext(
		ContentContext
	) as SaveForLaterTableRowData;

	const price = useMemo(() => dFix(itemPrice), [itemPrice]);

	return (
		<Typography variant="h6" data-testid="offer-price" id="offer-price">
			{itemPrice ? (
				<PriceDisplay currency={currency} min={price} />
			) : (
				priceDisplayNLS.Labels.Pending.t()
			)}
		</Typography>
	);
};
