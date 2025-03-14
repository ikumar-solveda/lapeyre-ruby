/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { PriceDisplay } from '@/components/blocks/PriceDisplay';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { useFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature';
import { useLocalization } from '@/data/Localization';
import { ComparePriceProps } from '@/data/types/Compare';
import { useUser } from '@/data/User';
import { Typography } from '@mui/material';
import { FC } from 'react';

export const CatalogEntryListComparePrice: FC<ComparePriceProps> = ({ product }) => {
	const priceDisplayNLS = useLocalization('PriceDisplay');
	const { user } = useUser();
	const { data } = useFlexFlowStoreFeature({
		id: EMS_STORE_FEATURE.SHOW_PRODUCT_PRICE_FOR_GUEST_USER,
	});
	const showProductPriceForGuestUserEnabled = data.featureMissing || data.featureEnabled;
	const loginStatus = user?.isLoggedIn;
	return showProductPriceForGuestUserEnabled || loginStatus ? (
		<>
			{product.productPrice?.min ? (
				<PriceDisplay
					currency={product.productPrice.currency}
					min={product.productPrice.min}
					{...(product.productPrice.max ? { max: product.productPrice.max } : {})}
				></PriceDisplay>
			) : (
				<>{priceDisplayNLS.Labels.Pending.t()}</>
			)}
		</>
	) : (
		<Typography>{priceDisplayNLS.Labels.SignIn.t()}</Typography>
	);
};
