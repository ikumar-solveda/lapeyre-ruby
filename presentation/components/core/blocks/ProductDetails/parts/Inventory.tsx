/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
import { ProductDetailsInventoryBox } from '@/components/blocks/ProductDetails/parts/InventoryBox';
import { useFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { hasInStock } from '@/data/Content/_Inventory';
import { useLocalization } from '@/data/Localization';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { FULFILLMENT_METHOD, ONLINE_STORE_KEY } from '@/data/constants/inventory';
import { ContentContext } from '@/data/context/content';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { formatAvailability } from '@/utils/formatAvailability';
import { CircularProgress, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { FC, useContext, useMemo } from 'react';

type Props = {
	name: string;
};
const EMPTY_STORE_AVAILABILITY = {} as ProductAvailabilityData;
const EMPTY_AVAILABILITY: ProductAvailabilityData[] = [];
export const ProductDetailsInventory: FC<Props> = ({ name }) => {
	const { localeName: locale } = useStoreLocale();
	const nls = useLocalization('Inventory');
	const {
		availability = EMPTY_AVAILABILITY,
		isInventoryLoading = false,
		selectBox,
		isDeliverySelected,
		onSelectStore,
		physicalStore,
		pickupInStoreShipMode,
		deliveryShipMode,
	} = useContext(ContentContext) as ReturnType<typeof useProductDetails>;
	const { data: _showInventoryCount } = useFlexFlowStoreFeature({
		id: EMS_STORE_FEATURE.SHOW_INVENTORY_COUNT,
	});
	const pickup = name === FULFILLMENT_METHOD.PICKUP;
	const { featureEnabled: showInventoryCount } = _showInventoryCount;
	const translation = useMemo(() => {
		const storeAvailability =
			(pickup
				? availability.find((a) => a.physicalStoreId)
				: availability.find((a) => a.storeName === ONLINE_STORE_KEY)) ?? EMPTY_STORE_AVAILABILITY;
		const { availableQuantity, storeName: store = physicalStore?.storeName ?? '' } =
			storeAvailability;
		const inStock = hasInStock(storeAvailability);
		const count = formatAvailability(locale, availableQuantity);
		let oos: string;
		let noCount: string;
		let wCount: string;
		if (pickup) {
			oos = nls.ByWay.Pickup.OOS.t({ store });
			noCount = nls.ByWay.Pickup.NoInventoryShow.t({ store });
			wCount = nls.ByWay.Pickup.Available.t({ count, store });
		} else {
			oos = nls.ByWay.Delivery.OOS.t();
			noCount = nls.ByWay.Delivery.NoInventoryShow.t();
			wCount = nls.ByWay.Delivery.Available.t({ count });
		}
		return isEmpty(storeAvailability) || !inStock ? oos : showInventoryCount ? wCount : noCount;
	}, [pickup, availability, locale, nls, showInventoryCount, physicalStore]);
	const isSelected = pickup ? !isDeliverySelected : isDeliverySelected;
	const disabled = pickup ? !pickupInStoreShipMode : !deliveryShipMode;

	return (
		<ProductDetailsInventoryBox
			component="button"
			isSelected={isSelected}
			onClick={selectBox(name)}
			disabled={disabled}
		>
			<Typography variant="h5">
				{pickup ? nls.ByWay.Pickup.Title.t() : nls.ByWay.Delivery.Title.t()}
			</Typography>
			{isInventoryLoading ? (
				<CircularProgress size={25} />
			) : pickup ? (
				<>
					{physicalStore?.id ? (
						<>
							<LocalizationWithComponent
								text={translation}
								components={[
									<Typography key="0" variant="caption" textAlign="center">
										<Typography variant="strong" />
									</Typography>,
								]}
							/>
							<Linkable
								type="inline"
								data-testid="button-check-other-stores"
								id="button-check-other-stores"
								onClick={onSelectStore}
								disabled={disabled}
							>
								{nls.ByWay.Pickup.CheckOtherStores.t()}
							</Linkable>
						</>
					) : (
						<Linkable
							type="inline"
							data-testid="button-select-a-store"
							id="button-select-a-store"
							onClick={onSelectStore}
							disabled={disabled}
						>
							{nls.ByWay.Pickup.SelectAStore.t()}
						</Linkable>
					)}
				</>
			) : (
				<Typography variant="caption" textAlign="center" data-testid="delivery" id="delivery">
					{translation}
				</Typography>
			)}
		</ProductDetailsInventoryBox>
	);
};
