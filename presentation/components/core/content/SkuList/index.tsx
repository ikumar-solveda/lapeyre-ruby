/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { ExpectedDateDialog } from '@/components/blocks/ExpectedDateDialog';
import { ProductDetailsAddToCart } from '@/components/blocks/ProductDetails/AddToCart';
import { StoreInventoryDialogSelectStore } from '@/components/blocks/StoreInventoryDialog/parts/SelectStore';
import { SkuListInventoryReceiver } from '@/components/content/SkuList/parts/InventoryReceiver';
import { SkuListTable } from '@/components/content/SkuList/parts/Table';
import { VolumePriceDialog } from '@/components/content/VolumePriceDialog';
import { useExpectedDate } from '@/data/Content/ExpectedDate';
import { useSkuListTable } from '@/data/Content/SkuListTable';
import { INVENTORY_PBC_STATUS, UNINITIALIZED_STORE } from '@/data/constants/inventory';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ContentProvider } from '@/data/context/content';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import type { ID } from '@/data/types/Basic';
import type { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import type { ExpectedDateDialogContextValueType } from '@/data/types/ScheduleForLater';
import type { SkuListTableAuxiliaryContextValue } from '@/data/types/SkuListTable';
import type { StoreDetails } from '@/data/types/Store';
import type { StoreInventoryDialogStateContextValue } from '@/data/types/StoreInventoryDialog';
import { Paper, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { type FC, useCallback, useEffect, useMemo, useState } from 'react';

const EMPTY_STORE_AVAILABILITY = {} as ProductAvailabilityData;

export const SkuList: FC<{ id: ID }> = ({ id }) => {
	const { storeLocator } = useStoreLocatorState();
	const [store, setStore] = useState<StoreDetails>(UNINITIALIZED_STORE);
	const skuListData = useSkuListTable({
		partNumber: id.toString(),
		physicalStoreName: store?.physicalStoreName ?? '',
		physicalStore: store,
	});
	const {
		product,
		isLoading,
		volumePriceDialogState,
		partNumberForVolumePriceDialog,
		partNumberForScheduleForLater,
		toggleVolumePriceDialog,
		isDeliverySelected,
		scheduleForLater,
		getAvailabilityDetailsForSKU,
		onScheduleForLaterPartNumber,
		onScheduleForLaterConfirm,
	} = skuListData;
	const {
		dimensions: { contentSpacing },
	} = useTheme();
	const [dialogState, setDialogState] = useState<boolean>(false);
	const onDialog = useCallback(() => setDialogState((prev) => !prev), []);

	const { isDelivery, isBackorder, storeAvailability, date, isScheduleForLaterEnabled } =
		useMemo(() => {
			if (partNumberForScheduleForLater !== EMPTY_STRING) {
				const isDelivery = isDeliverySelected(partNumberForScheduleForLater);
				const storeAvailability =
					getAvailabilityDetailsForSKU(partNumberForScheduleForLater) ?? EMPTY_STORE_AVAILABILITY;
				const isBackorder = storeAvailability?.inventoryStatus === INVENTORY_PBC_STATUS.backorder;
				const isScheduleForLaterEnabled = scheduleForLater[partNumberForScheduleForLater]?.enabled;
				const expDate = scheduleForLater[partNumberForScheduleForLater]?.date;
				const date =
					expDate?.toISOString() ??
					storeAvailability?.pbcData?.fulfillmentCenter.availableToPromiseDateTime;

				return { isDelivery, storeAvailability, isBackorder, date, isScheduleForLaterEnabled };
			}

			return {
				isDelivery: true,
				storeAvailability: {} as ProductAvailabilityData,
				isBackorder: false,
				date: '',
				isScheduleForLaterEnabled: false,
			};
		}, [
			getAvailabilityDetailsForSKU,
			isDeliverySelected,
			partNumberForScheduleForLater,
			scheduleForLater,
		]);
	const useExpectedDateValue = useExpectedDate({ date, isScheduleForLaterEnabled });
	const { scheduled, errorTimePicker } = useExpectedDateValue;

	const onExpDateDialog = useCallback(
		() => onScheduleForLaterPartNumber()(),
		[onScheduleForLaterPartNumber]
	);
	const onExpDateConfirm = useCallback(
		async () => !errorTimePicker && onScheduleForLaterConfirm(scheduled),
		[errorTimePicker, onScheduleForLaterConfirm, scheduled]
	);

	useEffect(() => {
		setStore(storeLocator.selectedStore);
	}, [storeLocator.selectedStore]);

	const ctxValue = useMemo(
		() =>
			({
				...skuListData,
				physicalStore: store,
				store: store.physicalStoreName,
				dialogState,
				onDialog,
			} as SkuListTableAuxiliaryContextValue & StoreInventoryDialogStateContextValue),
		[dialogState, onDialog, skuListData, store]
	);

	const expDateCtxValue: ExpectedDateDialogContextValueType = useMemo(
		() => ({
			...useExpectedDateValue,
			dialogOpen: isBackorder && !!partNumberForScheduleForLater,
			onDialog: onExpDateDialog,
			onConfirm: onExpDateConfirm,
			isDelivery,
			availability: storeAvailability,
		}),
		[
			useExpectedDateValue,
			isBackorder,
			partNumberForScheduleForLater,
			onExpDateDialog,
			onExpDateConfirm,
			isDelivery,
			storeAvailability,
		]
	);

	return skuListData.product?.partNumber ? (
		<Stack gap={contentSpacing}>
			<StoreInventoryDialogSelectStore
				isLoading={isLoading}
				current={store}
				product={product}
				dialogState={dialogState}
				onDialog={onDialog}
			>
				<SkuListInventoryReceiver partNumber={id as string} />
			</StoreInventoryDialogSelectStore>
			<ContentProvider value={ctxValue}>
				<VolumePriceDialog
					open={volumePriceDialogState}
					onDialog={toggleVolumePriceDialog}
					partNumber={partNumberForVolumePriceDialog}
				/>
				<Paper>
					<SkuListTable />
				</Paper>
				<Stack gap={contentSpacing}>
					{partNumberForScheduleForLater ? (
						<ContentProvider value={expDateCtxValue}>
							<ExpectedDateDialog />
						</ContentProvider>
					) : null}
				</Stack>
				<Stack direction="row" justifyContent="flex-end">
					<ProductDetailsAddToCart />
				</Stack>
			</ContentProvider>
		</Stack>
	) : null;
};
