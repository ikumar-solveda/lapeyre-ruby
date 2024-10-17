/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
import { useFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { useLocalization } from '@/data/Localization';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { FULFILLMENT_METHOD } from '@/data/constants/inventory';
import { ContentContext } from '@/data/context/content';
import { SkuListTableData } from '@/data/types/Product';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { SkuListTableAuxiliaryContextValue } from '@/data/types/SkuListTable';
import { StoreInventoryDialogStateContextValue } from '@/data/types/StoreInventoryDialog';
import { getInventoryStatusV2 } from '@/utils/getInventoryStatusV2';
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { FC, useContext, useMemo } from 'react';

type Props = {
	row: SkuListTableData;
};
const EMPTY_AVAILABILITY = [] as ProductAvailabilityData[];
export const SkuListTableSkuAvailability: FC<Props> = ({ row }) => {
	const { availability = EMPTY_AVAILABILITY, selectedFulfillmentMode, partNumber } = row;
	const { localeName: locale } = useStoreLocale();
	const { physicalStore, onFulfillmentMethod, onDialog, pickupInStoreShipMode, deliveryShipMode } =
		useContext(ContentContext) as SkuListTableAuxiliaryContextValue &
			StoreInventoryDialogStateContextValue;
	const nls = useLocalization('Inventory');
	const { data } = useFlexFlowStoreFeature({ id: EMS_STORE_FEATURE.SHOW_INVENTORY_COUNT });
	const showCount = data.featureEnabled;
	const { onlineStatus, offlineStatus, onlineCount, offlineCount } = useMemo(
		() => getInventoryStatusV2(partNumber, availability, physicalStore, showCount, locale),
		[availability, locale, partNumber, physicalStore, showCount]
	);

	const pickupDisabled = pickupInStoreShipMode === undefined;
	const deliveryDisabled = deliveryShipMode === undefined;

	return (
		<FormControl>
			<RadioGroup value={selectedFulfillmentMode} onChange={onFulfillmentMethod(partNumber)}>
				<FormControlLabel
					value={FULFILLMENT_METHOD.PICKUP}
					control={<Radio />}
					disabled={pickupDisabled}
					label={
						<LocalizationWithComponent
							text={
								isEmpty(physicalStore)
									? nls.ByWay.Pickup.PickupSelectAStore.t()
									: !offlineStatus
									? nls.ByCount.ForPickup.OOS.t()
									: showCount
									? nls.ByCount.ForPickup.Available.t({ count: offlineCount })
									: nls.ByCount.ForPickup.NoInventoryShow.t()
							}
							components={[
								<Typography key="0" component="span">
									<Linkable
										type="inline"
										id="button-select-a-store"
										data-testid="button-select-a-store"
										onClick={onDialog}
									/>
								</Typography>,
							]}
						/>
					}
				/>
				<FormControlLabel
					value={FULFILLMENT_METHOD.DELIVERY}
					control={<Radio />}
					disabled={deliveryDisabled}
					label={
						!onlineStatus
							? nls.ByCount.ForDelivery.OOS.t()
							: showCount
							? nls.ByCount.ForDelivery.Available.t({ count: onlineCount })
							: nls.ByCount.ForDelivery.NoInventoryShow.t()
					}
				/>
			</RadioGroup>
		</FormControl>
	);
};
