/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { productDetailsPriceStrikethruSX } from '@/components/content/ProductDetails/styles/priceStrikethru';
import { PriceDisplay } from '@/components/blocks/PriceDisplay';
import { useLocalization } from '@/data/Localization';
import { Stack, Typography } from '@mui/material';
import { FC, useContext, useMemo } from 'react';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { getProductDisplayInfo } from '@/utils/getProductDisplayInfo';
import { ContentContext } from '@/data/context/content';
import { productIsA } from '@/utils/productIsA';
import { TYPES } from '@/data/constants/product';

/**
 * @deprecated no longer maintained -- DO NOT USE
 */
export const ProductDetailsPrice: FC = () => {
	const localization = useLocalization('PriceDisplay');
	const { selection, product } = useContext(ContentContext) as ReturnType<typeof useProductDetails>;
	const isBundle = productIsA(product, TYPES.bundle);
	const sku = !isBundle ? selection?.sku : product;
	const { offer, list, currency } = useMemo<{
		offer: number;
		list: number;
		currency: string;
	}>(() => {
		const { prices } = getProductDisplayInfo(sku, product);
		const defaults = { offer: 0, list: 0, currency: '' };
		return { ...defaults, ...prices };
	}, [sku, product]);

	return (
		<Stack direction="row" spacing={2}>
			{offer > 0 ? (
				<Typography variant="h5" component="span" data-testid="offer-price" id="offer-price">
					<PriceDisplay currency={currency} min={offer} />
				</Typography>
			) : null}

			{offer > 0 && offer < list ? (
				<Typography
					variant="h5"
					component="span"
					sx={productDetailsPriceStrikethruSX}
					data-testid="list-price"
					id="list-price"
				>
					<PriceDisplay currency={currency} min={list} />
				</Typography>
			) : null}

			{offer === 0 ? (
				<Typography variant="h5" component="span" data-testid="no-price" id="no-price">
					{localization.Labels.Pending.t()}
				</Typography>
			) : null}
		</Stack>
	);
};
