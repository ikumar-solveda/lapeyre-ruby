/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023, 2024.
 */

import { Accordion } from '@/components/blocks/Accordion';
import { GTMCartData } from '@/components/blocks/GTMCartData';
import { StoreInventoryDialog } from '@/components/blocks/StoreInventoryDialog';
import { CartOrderSummary } from '@/components/content/Cart/parts/OrderSummary';
import { CartShoppingCart } from '@/components/content/Cart/parts/ShoppingCart';
import { cartGridContainerGridProps } from '@/components/content/Cart/styles/gridContainerGridProps';
import { cartTitleGridSX } from '@/components/content/Cart/styles/titleGrid';
import { GPSIACTable } from '@/components/content/GroupedProductStoreInventoryAtCartTable';
import { SaveForLater } from '@/components/content/SaveForLater';
import { StoreLocatorDialog } from '@/components/content/StoreLocatorDialog';
import { useCart } from '@/data/Content/Cart';
import { useCheckoutProfiles } from '@/data/Content/CheckoutProfiles';
import { useSaveForLater } from '@/data/Content/SaveForLaterList';
import { useStoreList } from '@/data/Content/StoreList';
import { useLocalization } from '@/data/Localization';
import { isB2BStore, useSettings } from '@/data/Settings';
import { ContentProvider } from '@/data/context/content';
import { EventsContext } from '@/data/context/events';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { ID } from '@/data/types/Basic';
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export const Cart: FC<{ id: ID }> = () => {
	const { eventData } = useContext(EventsContext);
	const cart = useCart();
	const profileValues = useCheckoutProfiles();
	const localization = useLocalization('Cart');
	const { settings } = useSettings();
	const {
		data,
		loading,
		orderItems,
		onCartPageViewEvent,
		onCartViewEvent,
		rewardOptions,
		pickupOrderItems,
		deliveryOrderItems,
	} = cart;
	const { setAsMyStore } = useStoreList();
	const isB2B = isB2BStore(settings);
	const [storeLocatorDialogState, setStoreLocatorDialogState] = useState<boolean>(false);
	const { orderId = '' } = data ?? {};
	const { products } = useSaveForLater();
	const [initial, setInitial] = useState(true);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const {
		dimensions: { contentSpacing },
	} = theme;
	const onStoreLocatorDialog = useCallback(() => {
		setStoreLocatorDialogState((prev) => !prev);
	}, []);
	const { storeLocator } = useStoreLocatorState();

	useEffect(() => {
		if (!initial || !data) return;
		setInitial(false);
		onCartPageViewEvent();
	}, [data, initial]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		onCartViewEvent(eventData);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orderItems, eventData]);

	const value = useMemo(
		() => ({
			...cart,
			setAsMyStore: isB2B ? setAsMyStore : null,
			order: data,
			onStoreLocatorDialog,
			onDialog: onStoreLocatorDialog,
			storeLocatorDialogState,
			physicalStore: storeLocator.selectedStore,
			...profileValues,
		}),
		[
			cart,
			data,
			isB2B,
			onStoreLocatorDialog,
			profileValues,
			setAsMyStore,
			storeLocator,
			storeLocatorDialogState,
		]
	);

	const dialogOrder = useMemo(
		() => (pickupOrderItems.length > 0 ? data : undefined),
		[data, pickupOrderItems]
	);

	return loading ? null : (
		<ContentProvider value={value}>
			<GTMCartData />
			<Grid container {...cartGridContainerGridProps}>
				<Grid item xs={12} md={13} sx={cartTitleGridSX}>
					<Typography variant="h4">{localization.Title.t()}</Typography>
				</Grid>
				{orderItems?.length ? (
					<Grid item xs={12} md={3}>
						{isMobile ? (
							<Accordion
								id="cart-summary"
								label={localization.Labels.OrderSummary.t()}
								defaultExpanded={true}
							>
								<CartOrderSummary />
							</Accordion>
						) : (
							<CartOrderSummary />
						)}
					</Grid>
				) : null}
				<Grid item xs={12} md>
					<Stack gap={contentSpacing}>
						{isMobile ? (
							<Accordion id="cart-items" label={localization.Title.t()}>
								<Stack gap={contentSpacing}>
									<CartShoppingCart
										deliveryOrderItems={deliveryOrderItems}
										pickupOrderItems={pickupOrderItems}
										orderId={orderId}
										rewardOptions={rewardOptions}
									/>
								</Stack>
							</Accordion>
						) : (
							<CartShoppingCart
								deliveryOrderItems={deliveryOrderItems}
								pickupOrderItems={pickupOrderItems}
								orderId={orderId}
								rewardOptions={rewardOptions}
							/>
						)}
						<SaveForLater products={products} />
					</Stack>
				</Grid>
			</Grid>
			{isB2B ? (
				<StoreInventoryDialog
					open={storeLocatorDialogState}
					pickupItemsExist={!!pickupOrderItems.length}
				>
					<GPSIACTable order={data} />
				</StoreInventoryDialog>
			) : (
				<StoreLocatorDialog
					order={dialogOrder}
					storeLocatorDialogState={storeLocatorDialogState}
					onStoreLocatorDialog={onStoreLocatorDialog}
				/>
			)}
		</ContentProvider>
	);
};
