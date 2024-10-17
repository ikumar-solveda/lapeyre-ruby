/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { IconLabel } from '@/components/blocks/IconLabel';
import { Linkable } from '@/components/blocks/Linkable';
import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
import { orderItemTableV2IconColorSX } from '@/components/content/OrderItemTableV2/styles/iconColor';
import { OrderTableSection } from '@/components/content/OrderTable/parts/Section';
import { OrderTableItemTable } from '@/components/content/OrderTable/parts/Table';
import { orderTableDeliveryItemNumberSX } from '@/components/content/OrderTable/styles/deliveryItemNumber';
import { orderTableIconLabelSX } from '@/components/content/OrderTable/styles/icon';
import { orderTablePickupLinkSX } from '@/components/content/OrderTable/styles/pickupLink';
import { useStoreLocator } from '@/data/Content/StoreLocator';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { OrderItem } from '@/data/types/Order';
import { LocalShipping, Store } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { FC, useContext, useEffect, useMemo, useState } from 'react';

type OrderTableProps = {
	/**
	 * Pickup order items to display
	 */
	pickups: OrderItem[];
	/**
	 * Delivery order items to display
	 */
	deliveries: OrderItem[];
	/**
	 * Order ID
	 */
	orderId?: string | undefined;

	/**
	 * If true, the table is read-only, default to false
	 */
	readonly?: boolean;

	/**
	 * Order status
	 */
	orderStatus?: string;
};
/**
 * Order table with items grouped by pickup and delivery.
 */
export const OrderTable: FC<OrderTableProps> = ({
	pickups,
	deliveries,
	orderId = '',
	readonly = false,
	orderStatus,
}) => {
	const {
		storeLocator: { selectedStore },
	} = useStoreLocatorState();

	const orderItemTableNLS = useLocalization('OrderItemTable');
	const cartNLS = useLocalization('Cart');
	const { onStoreLocatorDialog } = useContext(ContentContext) as ReturnType<
		typeof useStoreLocator
	> & { onStoreLocatorDialog: () => void };

	const [pickupFromLabel, setPickupFromLabel] = useState(() => (
		<Typography key="0" variant="h6" id="pickup" data-testid="pickup">
			{orderItemTableNLS.Labels.PickupReadonly.t({
				pickItemsNumber: 0,
			})}
		</Typography>
	));
	const [deliveryNumberFromLabel, setDeliveryNumberFromLabel] = useState(() =>
		orderItemTableNLS.Labels.Delivery.t({ deliveryItemsNumber: 0 })
	);

	const deliveryNumber = useMemo(() => deliveries.length, [deliveries]);
	const pickItemsNumber = useMemo(() => pickups.length, [pickups]);

	useEffect(() => {
		setPickupFromLabel(
			readonly ? (
				<Typography key="0" variant="h6" id="pickup" data-testid="pickup">
					{orderItemTableNLS.Labels.PickupReadonly.t({
						pickItemsNumber,
					})}
				</Typography>
			) : (
				<LocalizationWithComponent
					text={orderItemTableNLS.Labels.Pickup.t({
						selectedStore: selectedStore?.physicalStoreName ?? '',
						pickItemsNumber,
					})}
					components={[
						<Typography key="0" variant="h6" id="pickup" data-testid="pickup" component="span">
							<Linkable
								type="inline"
								id="pickupStore"
								data-testid="pickupStore"
								onClick={onStoreLocatorDialog}
								sx={orderTablePickupLinkSX}
							></Linkable>
						</Typography>,
					]}
				/>
			)
		);
	}, [onStoreLocatorDialog, orderItemTableNLS, pickItemsNumber, readonly, selectedStore]);

	useEffect(() => {
		setDeliveryNumberFromLabel(
			orderItemTableNLS.Labels.Delivery.t({ deliveryItemsNumber: deliveryNumber })
		);
	}, [deliveryNumber, orderItemTableNLS]);

	return (
		<Stack gap={4}>
			{pickItemsNumber > 0 ? (
				<OrderTableSection
					id="cart-pickups-section"
					label={
						<IconLabel
							icon={<Store sx={orderItemTableV2IconColorSX} />}
							sx={orderTableIconLabelSX}
							label={pickupFromLabel}
						/>
					}
					table={
						<OrderTableItemTable
							id="cart-pickup"
							orderItems={pickups}
							orderId={orderId}
							readonly={readonly}
							orderStatus={orderStatus}
						/>
					}
				/>
			) : deliveryNumber > 0 &&
			  (!selectedStore.physicalStoreName || pickItemsNumber === 0) &&
			  !readonly ? (
				// show store locator link only when there are no pickup items
				<LocalizationWithComponent
					text={
						!selectedStore.physicalStoreName
							? orderItemTableNLS.Labels.PreferPickup.t()
							: orderItemTableNLS.Labels.CurrentPickupLocation.t({
									store: selectedStore.physicalStoreName,
							  })
					}
					components={[
						<Typography key="0" variant="h6" id="pickup" data-testid="pickup" component="span">
							<Linkable
								type="inline"
								id="pickupStore"
								data-testid="pickupStore"
								onClick={onStoreLocatorDialog}
								sx={orderTablePickupLinkSX}
							></Linkable>
						</Typography>,
					]}
				/>
			) : null}
			{deliveryNumber > 0 ? (
				<OrderTableSection
					id="cart-deliveries-section"
					label={
						<IconLabel
							icon={<LocalShipping sx={orderItemTableV2IconColorSX} />}
							sx={orderTableIconLabelSX}
							label={
								<LocalizationWithComponent
									text={deliveryNumberFromLabel}
									components={[
										<Typography
											key="0"
											variant="h6"
											id="shipping"
											data-testid="shipping"
											component="span"
										>
											<Typography
												id="shippingItemNumber"
												data-testid="shippingItemNumber"
												variant="strong"
												sx={orderTableDeliveryItemNumberSX(readonly)}
											/>
										</Typography>,
									]}
								></LocalizationWithComponent>
							}
						/>
					}
					table={
						<OrderTableItemTable
							id="cart-delivery"
							orderItems={deliveries}
							orderId={orderId}
							readonly={readonly}
							orderStatus={orderStatus}
						/>
					}
				/>
			) : null}
			{pickups.length === 0 && deliveries.length === 0 ? (
				<Typography p={2} variant="h5">
					{`${orderItemTableNLS.Labels.Empty.t()} `}
					<Linkable href="/">{cartNLS.Msgs.ShopNow.t()}</Linkable>
				</Typography>
			) : null}
		</Stack>
	);
};
