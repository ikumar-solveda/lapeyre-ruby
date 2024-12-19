/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { FlowIfDisabled, FlowIfEnabled } from '@/components/blocks/FlexFlow';
import { OneClick } from '@/components/blocks/OneClick';
import { ProductCardDeliveryStatus } from '@/components/blocks/ProductCard/parts/DeliveryStatus';
import { ProductCardPickupStatus } from '@/components/blocks/ProductCard/parts/PickupStatus';
import { productCardActionButtonProps } from '@/components/blocks/ProductCard/styles/actionButtonProps';
import { productCardInventoryDividerSX } from '@/components/blocks/ProductCard/styles/inventoryDivider';
import { productCardInventoryOptionStack } from '@/components/blocks/ProductCard/styles/inventoryOptionStack';
import { productCardInventoryStack } from '@/components/blocks/ProductCard/styles/inventoryStack';
import { productCardInventorySvgIconProps } from '@/components/blocks/ProductCard/styles/inventorySvgIconProps';
import { productCardInventoryTitleSX } from '@/components/blocks/ProductCard/styles/inventoryTitle';
import { useFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { useLocalization } from '@/data/Localization';
import { isB2BStore, useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import {
	DELIVERY_METHOD,
	FULFILLMENT_METHOD,
	UNINITIALIZED_STORE,
} from '@/data/constants/inventory';
import { ContentContext } from '@/data/context/content';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { ProductCardContextValue } from '@/data/types/ProductCard';
import { StoreDetails } from '@/data/types/Store';
import { getCurrencyFromContext } from '@/utils/getCurrencyFromContext';
import { getInventoryStatusV2 } from '@/utils/getInventoryStatusV2';
import HomeIcon from '@mui/icons-material/Home';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { CircularProgress, Divider, Stack, Typography } from '@mui/material';
import { FC, useContext, useEffect, useMemo, useState } from 'react';

export const ProductCardAddToCartWithInventory: FC = () => {
	const { localeName: locale } = useStoreLocale();
	const { storeLocator } = useStoreLocatorState();
	const [physicalStore, setPhysicalStore] = useState<StoreDetails>(UNINITIALIZED_STORE);
	const {
		onSelectStore,
		sku,
		availability,
		isInventoryLoading,
		product,
		onAddToCart,
		loginStatus,
	} = useContext(ContentContext) as ProductCardContextValue;
	const nls = useLocalization('Inventory');
	const nlsProduct = useLocalization('productDetail');

	const { settings } = useSettings();
	const isB2B = isB2BStore(settings);
	const { data } = useFlexFlowStoreFeature({ id: EMS_STORE_FEATURE.SHOW_INVENTORY_COUNT });
	const showCount = data.featureEnabled;
	const entity = sku ?? product;
	const { online, offline, onlineCount, offlineCount } = useMemo(
		() => getInventoryStatusV2(entity.partNumber, availability, physicalStore, showCount, locale),
		[availability, entity.partNumber, locale, physicalStore, showCount]
	);
	const addToCartText = isB2B ? nlsProduct.addToCurrentOrder.t() : nlsProduct.AddToCart.t();
	const dtId = `product-add-to-cart-${product.partNumber}`;
	const { user } = useUser();
	const contextCurrency = getCurrencyFromContext(user?.context);
	const currencySynchronizing =
		user?.forCDNCache || product.productPrice.currency !== contextCurrency;
	const disabled =
		isInventoryLoading || currencySynchronizing || !product.buyable || !product.productPrice?.offer;

	useEffect(() => {
		setPhysicalStore(storeLocator.selectedStore);
	}, [storeLocator.selectedStore]);

	return (
		<Stack {...productCardInventoryStack}>
			<OneClick
				data-testid={dtId}
				id={dtId}
				onClick={onAddToCart(entity)}
				disabled={disabled}
				{...productCardActionButtonProps}
			>
				<FlowIfEnabled feature={EMS_STORE_FEATURE.GUEST_SHOPPING}>{addToCartText}</FlowIfEnabled>
				<FlowIfDisabled feature={EMS_STORE_FEATURE.GUEST_SHOPPING}>
					{loginStatus ? addToCartText : nlsProduct.SignIn.t()}
				</FlowIfDisabled>
			</OneClick>
			{Object.entries(FULFILLMENT_METHOD)
				.reverse() // show delivery item before pickup item due to the multiple languages issue.
				.map(([key, value]) => (
					<Stack key={key} {...productCardInventoryOptionStack}>
						{key === DELIVERY_METHOD.PICKUP ? (
							<HomeIcon {...productCardInventorySvgIconProps} />
						) : (
							<LocalShippingIcon {...productCardInventorySvgIconProps} />
						)}
						<Typography sx={productCardInventoryTitleSX} variant="body2">
							{nls.ByWay[value].Title.t()}
						</Typography>
						<Divider orientation="vertical" flexItem sx={productCardInventoryDividerSX} />
						{isInventoryLoading ? (
							<CircularProgress size={15} />
						) : key === DELIVERY_METHOD.PICKUP ? (
							<ProductCardPickupStatus
								showCount={showCount}
								offlineCount={offlineCount}
								offline={offline}
								physicalStore={physicalStore}
								entity={entity}
								onSelectStore={onSelectStore}
							/>
						) : (
							<ProductCardDeliveryStatus
								onlineCount={onlineCount}
								showCount={showCount}
								online={online}
							/>
						)}
					</Stack>
				))}
		</Stack>
	);
};
