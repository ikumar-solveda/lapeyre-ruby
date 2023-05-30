/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext } from 'react';
import { Stack, Typography } from '@mui/material';
import { IconLabel } from '@/components/blocks/IconLabel';
import { Home, LocalShipping as Shipping } from '@mui/icons-material';
import { useLocalization } from '@/data/Localization';
import { AddressCard } from '@/components/blocks/AddressCard';
import { OrderDetailsSection } from '@/components/blocks/OrderDetails/parts/Section';
import { Order, OrderItem } from '@/data/types/Order';
import { OrderItemTable } from '@/components/content/OrderItemTable';
import { OrderDetailsGridDisplay } from '@/components/blocks/OrderDetails/parts/GridDisplay';
import { ContentContext } from '@/data/context/content';

export type ContextValues = {
	order: Order;
	orderItems: OrderItem[];
};

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
