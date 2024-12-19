/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { ProductDetailsInventoryBox } from '@/components/blocks/ProductDetails/parts/InventoryBox';
import { ProductDetailsInventoryStatus } from '@/components/blocks/ProductDetails/parts/InventoryStatus';
import { useFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { useDateTimeFormat } from '@/data/Content/_DateTimeFormatter';
import { hasInStock } from '@/data/Content/_Inventory';
import { useLocalization } from '@/data/Localization';
import { EXP_DATE_OPTION } from '@/data/constants/dateTime';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import {
	FULFILLMENT_METHOD,
	INVENTORY_PBC_STATUS,
	ONLINE_STORE_KEY,
} from '@/data/constants/inventory';
import { ContentContext } from '@/data/context/content';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { formatAvailability } from '@/utils/formatAvailability';
import { getExpectedDate } from '@/utils/getExpectedDate';
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
	const storeAvailability = useMemo(
		() =>
			(pickup
				? availability.find((a) => a.physicalStoreId)
				: availability.find((a) => a.storeName === ONLINE_STORE_KEY)) ?? EMPTY_STORE_AVAILABILITY,
		[availability, pickup]
	);
	const isBackorder = useMemo(
		() => storeAvailability?.inventoryStatus === INVENTORY_PBC_STATUS.backorder,
		[storeAvailability]
	);
	const dateFormatter = useDateTimeFormat(EXP_DATE_OPTION);
	const translation = useMemo(() => {
		const { availableQuantity, storeName: store = physicalStore?.storeName ?? '' } =
			storeAvailability;
		const inStock = hasInStock(storeAvailability);
		const count = formatAvailability(locale, availableQuantity);
		const date = getExpectedDate(storeAvailability, dateFormatter);
		let oos: string;
		let noCount: string;
		let wCount: string;
		let backorderAvailabilityDate: string;
		if (pickup) {
			oos = nls.ByWay.Pickup.OOS.t({ store });
			noCount = nls.ByWay.Pickup.NoInventoryShow.t({ store });
			wCount = nls.ByWay.Pickup.Available.t({ count, store });
			backorderAvailabilityDate = nls.ByWay.Pickup.ExpectedAvailability.t({ date });
		} else {
			oos = nls.ByWay.Delivery.OOS.t();
			noCount = nls.ByWay.Delivery.NoInventoryShow.t();
			wCount = nls.ByWay.Delivery.Available.t({ count });
			backorderAvailabilityDate = nls.ByWay.Delivery.ExpectedAvailability.t({ date });
		}

		return isEmpty(storeAvailability) || !inStock
			? oos
			: isBackorder
			? backorderAvailabilityDate
			: showInventoryCount
			? wCount
			: noCount;
	}, [
		pickup,
		locale,
		nls,
		showInventoryCount,
		physicalStore,
		isBackorder,
		dateFormatter,
		storeAvailability,
	]);
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
							<ProductDetailsInventoryStatus
								isBackorder={isBackorder}
								translation={translation}
								pickup={pickup}
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
				<ProductDetailsInventoryStatus
					isBackorder={isBackorder}
					translation={translation}
					pickup={pickup}
				/>
			)}
		</ProductDetailsInventoryBox>
	);
};
