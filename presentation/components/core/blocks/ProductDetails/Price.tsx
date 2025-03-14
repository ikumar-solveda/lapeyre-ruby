/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { PriceDisplay } from '@/components/blocks/PriceDisplay';
import { productDetailsPriceStrikethruSX } from '@/components/blocks/ProductDetails/styles/priceStrikethru';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { useFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { useSkuListTable } from '@/data/Content/SkuListTable';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { useUser } from '@/data/User';
import { getProductDisplayInfo } from '@/utils/getProductDisplayInfo';
import { isKitOrBundleType } from '@/utils/productIsA';
import { Stack, Typography } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

export const ProductDetailsPrice: FC = () => {
	const localization = useLocalization('PriceDisplay');
	const { selection, product } = useContext(ContentContext) as ReturnType<
		typeof useProductDetails
	> &
		ReturnType<typeof useSkuListTable>;
	const isKitOrBundle = isKitOrBundleType[product?.type ?? 'unknown'];
	const sku = !isKitOrBundle ? selection?.sku : product;
	const { offer, list, currency } = useMemo<{
		offer: number;
		list: number;
		currency: string;
	}>(() => {
		const { prices } = getProductDisplayInfo(sku, product);
		const defaults = { offer: 0, list: 0, currency: '' };
		return { ...defaults, ...prices };
	}, [sku, product]);
	const { user } = useUser();
	const { data } = useFlexFlowStoreFeature({
		id: EMS_STORE_FEATURE.SHOW_PRODUCT_PRICE_FOR_GUEST_USER,
	});
	const showProductPriceForGuestUserEnabled = data.featureMissing || data.featureEnabled;
	const loginStatus = user?.isLoggedIn;
	return (
		<Stack direction="row" spacing={2}>
			{showProductPriceForGuestUserEnabled || loginStatus ? (
				<>
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
				</>
			) : (
				<Typography>{localization.Labels.SignIn.t()}</Typography>
			)}

			{offer === 0 ? (
				<Typography variant="h5" component="span" data-testid="no-price" id="no-price">
					{localization.Labels.Pending.t()}
				</Typography>
			) : null}
		</Stack>
	);
};
