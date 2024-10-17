/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { AddressCard } from '@/components/blocks/AddressCard';
import { IconLabel } from '@/components/blocks/IconLabel';
import { OrderDetailsGridDisplay } from '@/components/blocks/OrderDetails/parts/GridDisplay';
import { OrderDetailsSection } from '@/components/blocks/OrderDetails/parts/Section';
import { OrderItemTable } from '@/components/content/OrderItemTable';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Order, OrderItem } from '@/data/types/Order';
import { Home, LocalShipping as Shipping } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { FC, useContext } from 'react';

export type ContextValues = {
	order: Order;
	orderItems: OrderItem[];
};

/** @deprecated  see `OrderDetailsV2` */
export const OrderDetailsShippingSingle: FC<{ showHeading: boolean }> = ({ showHeading }) => {
	const labels = useLocalization('Shipping').Labels;
	const infoLabels = useLocalization('OrderShippingInfo').Labels;
	const { order, orderItems } = useContext(ContentContext) as ContextValues;
	const item = orderItems[0];
	return (
		<>
			<OrderDetailsSection
				id="order-items"
				heading={
					showHeading ? (
						<Typography variant="h4">{infoLabels.CartDetails.t()}</Typography>
					) : undefined
				}
				details={<OrderItemTable {...{ orderItems, readOnly: true, orderId: order.orderId }} />}
			/>
			<OrderDetailsSection
				id="shipping-info"
				heading={<Typography variant="h4">{infoLabels.ShippingDetails.t()}</Typography>}
				details={
					<OrderDetailsGridDisplay>
						<>
							<IconLabel icon={<Home color="primary" />} label={labels.ShippingAddress.t()} />
							<Stack>
								<AddressCard address={item} readOnly={true} />
							</Stack>
						</>
						<>
							<IconLabel icon={<Shipping color="primary" />} label={labels.ShippingMethod.t()} />
							<Stack>
								<Typography gutterBottom>{item.shipModeDescription}</Typography>
							</Stack>
						</>
					</OrderDetailsGridDisplay>
				}
			/>
		</>
	);
};
