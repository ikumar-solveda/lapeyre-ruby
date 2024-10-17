/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { AddressCard } from '@/components/blocks/AddressCard';
import { IconLabel } from '@/components/blocks/IconLabel';
import { OrderDetailsV2Section } from '@/components/blocks/OrderDetailsV2/parts/Section';
import { OrderTableItemTable } from '@/components/content/OrderTable/parts/Table';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Order, OrderItem } from '@/data/types/Order';
import { List } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { FC, useContext } from 'react';

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

export const OrderDetailsV2ShippingMulti: FC<{ groups: OrderItem[][] }> = ({ groups }) => {
	const { order } = useContext(ContentContext) as { order: Order };
	const orderShippingInfoNLS = useLocalization('OrderShippingInfo');
	return (
		<OrderDetailsV2Section
			id="shipping-group"
			heading={
				<Typography variant="h5">{orderShippingInfoNLS.Labels.ShippingDetails.t()}</Typography>
			}
			details={groups.map((items, index) => (
				<OrderDetailsV2Section
					id={`shipping-group-${index}`}
					key={index}
					heading={<ShippingGroupSummary items={items} index={index}></ShippingGroupSummary>}
					details={
						<OrderTableItemTable
							orderItems={items}
							orderId={order.orderId}
							readonly={true}
							isShippingGroup={true}
							id={`shipping-group-${index}-order-${order.orderId}`}
						/>
					}
				/>
			))}
		/>
	);
};
