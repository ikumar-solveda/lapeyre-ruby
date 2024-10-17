/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { PriceDisplay } from '@/components/blocks/PriceDisplay';
import { useLocalization } from '@/data/Localization';
import { ComparePriceProps } from '@/data/types/Compare';
import { FC } from 'react';

export const CatalogEntryListComparePrice: FC<ComparePriceProps> = ({ product }) => {
	const priceDisplayNLS = useLocalization('PriceDisplay');

	return product.productPrice?.min ? (
		<PriceDisplay
			currency={product.productPrice.currency}
			min={product.productPrice.min}
			{...(product.productPrice.max ? { max: product.productPrice.max } : {})}
		></PriceDisplay>
	) : (
		<>{priceDisplayNLS.Labels.Pending.t()}</>
	);
};
