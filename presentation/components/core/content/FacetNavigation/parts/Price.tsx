/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PriceDisplay } from '@/components/blocks/PriceDisplay';
import { FacetNavigationPriceRangePicker } from '@/components/content/FacetNavigation/parts/PriceRangePicker';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { useFacetNavigation } from '@/data/Content/FacetNavigation';
import { useFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { getCurrencyFromContext } from '@/utils/getCurrencyFromContext';
import { Chip, Typography } from '@mui/material';
import { FC, useCallback, useContext, useMemo } from 'react';

export const FacetNavigationPrice: FC = () => {
	const { filteredParams, onPriceRangeChange } = useContext(ContentContext) as ReturnType<
		typeof useFacetNavigation
	>;
	const { minPrice = -1, maxPrice = -1 } = filteredParams;
	const onDelete = useCallback(
		() => onPriceRangeChange({ minPrice: null, maxPrice: null }),
		[onPriceRangeChange]
	);
	const { user } = useUser();
	const { settings } = useSettings();
	const { defaultCurrency } = settings;
	const currency = useMemo(
		() => getCurrencyFromContext(user?.context) ?? defaultCurrency,
		[user, defaultCurrency]
	);
	const { data } = useFlexFlowStoreFeature({
		id: EMS_STORE_FEATURE.SHOW_PRODUCT_PRICE_FOR_GUEST_USER,
	});
	const showProductPriceForGuestUserEnabled = data.featureMissing || data.featureEnabled;
	const loginStatus = user?.isLoggedIn;
	const priceDisplayNLS = useLocalization('PriceDisplay');
	// TODO: Get currency from facet/product
	return showProductPriceForGuestUserEnabled || loginStatus ? (
		<>
			{minPrice > -1 && maxPrice > -1 ? (
				<Chip
					size="medium"
					label={<PriceDisplay min={minPrice} max={maxPrice} currency={currency} />}
					onClick={onDelete}
					onDelete={onDelete}
					data-testid="product-filter-formatted-price-chip"
					id="product-filter-formatted-price-chip"
				/>
			) : (
				<FacetNavigationPriceRangePicker />
			)}
		</>
	) : (
		<Typography>{priceDisplayNLS.Labels.SignIn.t()}</Typography>
	);
};
