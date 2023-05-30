/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext } from 'react';
import { Stack, Typography } from '@mui/material';
import { IconLabel } from '@/components/blocks/IconLabel';
import { List } from '@mui/icons-material';
import { useLocalization } from '@/data/Localization';
import { AddressCard } from '@/components/blocks/AddressCard';
import { Order, OrderItem } from '@/data/types/Order';
import { OrderDetailsSection } from '@/components/blocks/OrderDetails/parts/Section';
import { ContentContext } from '@/data/context/content';
import { OrderItemTable } from '@/components/content/OrderItemTable';

const ShippingGroupSummary: FC<{ index: number; items: OrderItem[] }> = ({ index, items }) => {
	const labels = useLocalization('OrderShippingInfo').Labels;
	const item = items[0];
	return (
		<Stack direction={{ xs: 'column', sm: 'row' }} alignItems="flex-start" spacing={2}>
			<IconLabel
				icon={<List color="primary" />}
				label={labels.ShipmentGroup.t({ index: `${index + 1}` })}
			/>
			<Stack>
				<Typography variant="body2" display="block">
					{labels.ShipMethod.t()}
				</Typography>
				<Typography display="block">{item.shipModeDescription}</Typography>
			</Stack>
			<Stack>
				<Typography variant="body2" display="block">
					{labels.ShipAddress.t()}
				</Typography>
				<AddressCard address={item} readOnly={true} />
			</Stack>
		</Stack>
	);
};

export const OrderDetailsShippingMulti: FC<{ groups: OrderItem[][] }> = ({ groups }) => {
	const { order } = useContext(ContentContext) as { order: Order };
	const labels = useLocalization('OrderShippingInfo').Labels;
	return (
		<OrderDetailsSection
			id="shipping-group"
			heading={<Typography variant="h4">{labels.ShippingDetails.t()}</Typography>}
			details={groups.map((items, index) => (
				<OrderDetailsSection
					id={`shipping-group-${index}`}
					key={index}
					heading={<ShippingGroupSummary {...{ items, index }}></ShippingGroupSummary>}
					details={
						<OrderItemTable {...{ orderItems: items, readOnly: true, orderId: order.orderId }} />
					}
				/>
			))}
		/>
	);
};
