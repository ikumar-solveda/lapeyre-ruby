/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
import { BundleTableBackorderDetails } from '@/components/content/Bundle/parts/Table/BackorderDetails';
import { bundleTablePickupAvailabilityIcon } from '@/components/content/Bundle/styles/Table/pickupAvailabilityIcon';
import { bundleTableSelectSX } from '@/components/content/Bundle/styles/Table/select';
import { useFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { useLocalization } from '@/data/Localization';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { FULFILLMENT_METHOD } from '@/data/constants/inventory';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ContentContext } from '@/data/context/content';
import type { BundleDetailsTableAuxiliaryContextValue } from '@/data/types/BundleDetailsTable';
import type { BundleTableRowData } from '@/data/types/Product';
import type { StoreInventoryDialogStateContextValue } from '@/data/types/StoreInventoryDialog';
import { findBundleSkuAvailability } from '@/utils/findBundleSkuAvailability';
import { validateSkuTypeTableBackorderDisplay } from '@/utils/validateSkuTypeTableBackorderDisplay';
import { Check, RemoveCircleOutline } from '@mui/icons-material';
import {
	Button,
	CircularProgress,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Stack,
	Typography,
} from '@mui/material';
import { Row } from '@tanstack/react-table';
import { isEmpty } from 'lodash';
import { type FC, useContext, useMemo } from 'react';

type Props = {
	row: Row<BundleTableRowData>;
};

export const BundleTableAvailabilityStatusV2: FC<Props> = ({ row }) => {
	const {
		physicalStore,
		onFulfillmentMethod,
		ffMethod,
		onDialog,
		isLoading,
		embedded,
		pickupInStoreShipMode,
		deliveryShipMode,
	} = useContext(ContentContext) as BundleDetailsTableAuxiliaryContextValue &
		StoreInventoryDialogStateContextValue;
	const { localeName: locale } = useStoreLocale();
	const { availability = [], partNumber: rootPartNumber, selectedSku, isOneSku } = row.original;
	const productNls = useLocalization('productDetail');
	const nls = useLocalization('Inventory');
	const nlsEmbedded = useLocalization('StoreInventoryDialog');
	const { data } = useFlexFlowStoreFeature({ id: EMS_STORE_FEATURE.SHOW_INVENTORY_COUNT });
	const showCount = data.featureEnabled;
	const _partNumber = selectedSku?.partNumber ?? (isOneSku ? rootPartNumber : EMPTY_STRING);
	const { showOnlineCount, showOfflineCount, backorderPickup, backorderDelivery } = useMemo(
		() => validateSkuTypeTableBackorderDisplay(availability, _partNumber, showCount),
		[availability, _partNumber, showCount]
	);
	const { offline, online, partNumber, offlineText, onlineText, embeddedText } = useMemo(() => {
		const { offlineStatus, onlineStatus, partNumber, onlineCount, offlineCount } =
			findBundleSkuAvailability(row.original, physicalStore, showCount, locale);
		const offline = offlineStatus?.status;
		const online = onlineStatus?.status;
		const offlineText = isEmpty(physicalStore)
			? nls.ByWay.Pickup.PickupSelectAStore.t()
			: !offline
			? nls.ByCount.ForPickup.OOS.t()
			: showOfflineCount
			? nls.ByCount.ForPickup.Available.t({ count: offlineCount })
			: nls.ByCount.ForPickup.NoInventoryShow.t();
		const onlineText = !online
			? nls.ByCount.ForDelivery.OOS.t()
			: showOnlineCount
			? nls.ByCount.ForDelivery.Available.t({ count: onlineCount })
			: nls.ByCount.ForDelivery.NoInventoryShow.t();
		const embeddedText = !offline
			? nlsEmbedded.Availability.OOS.t()
			: showCount
			? nlsEmbedded.Availability.Available.t({ count: offlineCount })
			: nlsEmbedded.Availability.NoInventoryShow.t();
		return { offline, online, partNumber, offlineText, onlineText, embeddedText };
	}, [row, physicalStore, showCount, locale, nls, showOfflineCount, showOnlineCount, nlsEmbedded]);
	const Icon = offline ? Check : RemoveCircleOutline;

	const pickupDisabled = pickupInStoreShipMode === undefined;
	const deliveryDisabled = deliveryShipMode === undefined;
	const method =
		ffMethod[row.original.rowNumber] ??
		(deliveryDisabled ? FULFILLMENT_METHOD.PICKUP : FULFILLMENT_METHOD.DELIVERY);

	return online === undefined ? (
		<Button
			data-testid={`select-attributes-${partNumber}-link`}
			id={`select-attributes-${partNumber}-link`}
			onClick={() => row.toggleExpanded()}
			sx={bundleTableSelectSX}
		>
			{productNls.SelectAttributes.t()}
		</Button>
	) : isLoading ? (
		<CircularProgress size={30} />
	) : embedded ? (
		<Stack direction="row" spacing={1}>
			<LocalizationWithComponent
				text={embeddedText}
				components={[
					<Icon key="0" fontSize="small" sx={bundleTablePickupAvailabilityIcon(!!offline)} />,
					<Typography key="1" />,
				]}
			/>
		</Stack>
	) : (
		<FormControl>
			<RadioGroup value={method} onChange={onFulfillmentMethod(row.original.rowNumber)}>
				<FormControlLabel
					value={FULFILLMENT_METHOD.PICKUP}
					control={<Radio />}
					disabled={pickupDisabled}
					label={
						<LocalizationWithComponent
							text={offlineText}
							components={[
								<Typography key="0" component="span">
									<Linkable
										type="inline"
										id="button-select-a-store"
										data-testid="button-select-a-store"
										aria-label="button-select-a-store"
										onClick={onDialog}
									/>
								</Typography>,
							]}
						/>
					}
				/>
				<BundleTableBackorderDetails availability={backorderPickup} />
				<FormControlLabel
					value={FULFILLMENT_METHOD.DELIVERY}
					control={<Radio />}
					label={onlineText}
					disabled={deliveryDisabled}
				/>
				<BundleTableBackorderDetails availability={backorderDelivery} />
			</RadioGroup>
		</FormControl>
	);
};
