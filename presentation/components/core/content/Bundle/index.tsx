/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { ExpectedDateDialog } from '@/components/blocks/ExpectedDateDialog';
import { NotAvailable } from '@/components/blocks/NotAvailable';
import { ProductDetailsAddToCart } from '@/components/blocks/ProductDetails/AddToCart';
import { ProductDetailsBackorderMessage } from '@/components/blocks/ProductDetails/BackorderMessage';
import { ProductDetailsDisplay } from '@/components/blocks/ProductDetails/Display';
import { ProductDetailsGallery } from '@/components/blocks/ProductDetails/Gallery';
import { ProductDetailsPrice } from '@/components/blocks/ProductDetails/Price';
import { ProductDetailsPromos } from '@/components/blocks/ProductDetails/Promos';
import { ProductDetailsRibbonChips } from '@/components/blocks/ProductDetails/RibbonChips';
import { ProductDetailsSeller } from '@/components/blocks/ProductDetails/Seller';
import { ProductDetailsTabs } from '@/components/blocks/ProductDetails/Tabs';
import { productDetailsContainerSX } from '@/components/blocks/ProductDetails/styles/container';
import { StoreInventoryDialogSelectStore } from '@/components/blocks/StoreInventoryDialog/parts/SelectStore';
import { BundleInventoryReceiver } from '@/components/content/Bundle/parts/InventoryReceiver';
import { BundleTable } from '@/components/content/Bundle/parts/Table';
import { bundleBinaryElementSX } from '@/components/content/Bundle/styles/binaryElement';
import { VolumePriceDialog } from '@/components/content/VolumePriceDialog';
import { useBundleDetailsTable } from '@/data/Content/BundleDetailsTable';
import { useExpectedDate } from '@/data/Content/ExpectedDate';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { useLocalization } from '@/data/Localization';
import { INVENTORY_PBC_STATUS, UNINITIALIZED_STORE } from '@/data/constants/inventory';
import { ContentProvider } from '@/data/context/content';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import type { ID } from '@/data/types/Basic';
import type { BundleDetailsTableAuxiliaryContextValue } from '@/data/types/BundleDetailsTable';
import type { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import type { ExpectedDateDialogContextValueType } from '@/data/types/ScheduleForLater';
import type { StoreDetails } from '@/data/types/Store';
import type { StoreInventoryDialogStateContextValue } from '@/data/types/StoreInventoryDialog';
import { Paper, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { type FC, useCallback, useEffect, useMemo, useState } from 'react';

const EMPTY_STORE_AVAILABILITY = {} as ProductAvailabilityData;

export const Bundle: FC<{
	id: ID;
}> = ({ id }) => {
	const {
		dimensions: { contentSpacing },
	} = useTheme();
	const { storeLocator } = useStoreLocatorState();
	const [physicalStore, setPhysicalStore] = useState<StoreDetails>(UNINITIALIZED_STORE);
	const bundleDetails = useProductDetails({ partNumber: id.toString() });
	const { product } = bundleDetails;
	const bundleTableData = useBundleDetailsTable({
		pdp: bundleDetails,
		physicalStoreName: physicalStore?.physicalStoreName ?? '',
		physicalStore,
	});
	const {
		isLoading,
		volumePriceDialogState,
		toggleVolumePriceDialog,
		partNumberForVolumePriceDialog,
		rowNumberForScheduleForLater,
		isDeliveryOptionSelected,
		getAvailabilityDetailsForSKU,
		scheduleForLater,
		onScheduleForLaterRowNumber,
		onScheduleForLaterConfirm,
	} = bundleTableData;

	const { isDelivery, isBackorder, storeAvailability, date, isScheduleForLaterEnabled } =
		useMemo(() => {
			if (rowNumberForScheduleForLater !== -1) {
				const isDelivery = isDeliveryOptionSelected(rowNumberForScheduleForLater);
				const storeAvailability =
					getAvailabilityDetailsForSKU(rowNumberForScheduleForLater) ?? EMPTY_STORE_AVAILABILITY;
				const isBackorder = storeAvailability?.inventoryStatus === INVENTORY_PBC_STATUS.backorder;
				const expDate = scheduleForLater[rowNumberForScheduleForLater]?.date;
				const isScheduleForLaterEnabled = scheduleForLater[rowNumberForScheduleForLater]?.enabled;
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
			isDeliveryOptionSelected,
			rowNumberForScheduleForLater,
			scheduleForLater,
		]);
	const useExpectedDateValue = useExpectedDate({ date, isScheduleForLaterEnabled });
	const { scheduled, errorTimePicker } = useExpectedDateValue;

	const onExpDateDialog = useCallback(
		() => onScheduleForLaterRowNumber()(),
		[onScheduleForLaterRowNumber]
	);
	const onExpDateConfirm = useCallback(
		async () => !errorTimePicker && onScheduleForLaterConfirm(scheduled),
		[errorTimePicker, onScheduleForLaterConfirm, scheduled]
	);

	const expDateCtxValue: ExpectedDateDialogContextValueType = useMemo(
		() => ({
			...useExpectedDateValue,
			dialogOpen: isBackorder && rowNumberForScheduleForLater !== -1,
			onDialog: onExpDateDialog,
			onConfirm: onExpDateConfirm,
			isDelivery,
			availability: storeAvailability,
		}),
		[
			useExpectedDateValue,
			isBackorder,
			rowNumberForScheduleForLater,
			onExpDateDialog,
			onExpDateConfirm,
			isDelivery,
			storeAvailability,
		]
	);

	const { detailsNotAvailable } = useLocalization('productDetail');
	const [dialogState, setDialogState] = useState<boolean>(false);
	const onDialog = useCallback(() => setDialogState((prev) => !prev), []);
	const ctxValue: BundleDetailsTableAuxiliaryContextValue & StoreInventoryDialogStateContextValue =
		useMemo(
			() => ({ ...bundleDetails, ...bundleTableData, dialogState, onDialog }),
			[bundleDetails, bundleTableData, dialogState, onDialog]
		);

	useEffect(() => {
		setPhysicalStore(storeLocator.selectedStore);
	}, [storeLocator.selectedStore]);

	return product?.partNumber ? (
		<ContentProvider value={ctxValue}>
			<Stack spacing={2}>
				<Paper sx={productDetailsContainerSX}>
					<Stack spacing={contentSpacing}>
						<Stack
							direction={{ md: 'row', xs: 'column-reverse' }}
							spacing={contentSpacing}
							justifyContent="space-around"
						>
							<Stack spacing={2} sx={bundleBinaryElementSX}>
								<ProductDetailsDisplay />
								<ProductDetailsPromos />
								<ProductDetailsRibbonChips />
								<Stack spacing={3}>
									<ProductDetailsPrice />
									<ProductDetailsSeller />
									<ProductDetailsBackorderMessage />
									<ProductDetailsAddToCart />
								</Stack>
								<ProductDetailsTabs />
							</Stack>
							<ProductDetailsGallery />
						</Stack>
					</Stack>
				</Paper>
				<StoreInventoryDialogSelectStore
					isLoading={isLoading}
					current={physicalStore}
					product={product}
					dialogState={dialogState}
					onDialog={onDialog}
				>
					<BundleInventoryReceiver pdp={bundleDetails} tableData={bundleTableData} />
				</StoreInventoryDialogSelectStore>
				<VolumePriceDialog
					open={volumePriceDialogState}
					onDialog={toggleVolumePriceDialog}
					partNumber={partNumberForVolumePriceDialog}
				/>
				<Paper>
					<BundleTable />
				</Paper>
				<Stack alignItems="flex-end">
					<ProductDetailsAddToCart standalone />
				</Stack>
			</Stack>
			{rowNumberForScheduleForLater !== -1 ? (
				<ContentProvider value={expDateCtxValue}>
					<ExpectedDateDialog />
				</ContentProvider>
			) : null}
		</ContentProvider>
	) : (
		<NotAvailable message={detailsNotAvailable.t()} />
	);
};
