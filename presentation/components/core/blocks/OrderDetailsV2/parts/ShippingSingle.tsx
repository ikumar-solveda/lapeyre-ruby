/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { AddressCard } from '@/components/blocks/AddressCard';
import { IconLabel } from '@/components/blocks/IconLabel';
import { OrderDetailsV2GridDisplay } from '@/components/blocks/OrderDetailsV2/parts/GridDisplay';
import { OrderDetailsV2Section } from '@/components/blocks/OrderDetailsV2/parts/Section';
import { useLocalization } from '@/data/Localization';
import { OrderItem } from '@/data/types/Order';
import { Home, LocalShipping as Shipping } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { FC } from 'react';

export const OrderDetailsV2ShippingSingle: FC<{ deliveryOrderItems: OrderItem[] }> = ({
	deliveryOrderItems,
}) => {
	const shippingNLS = useLocalization('Shipping');
	const orderShippingInfoNLS = useLocalization('OrderShippingInfo');
	const item = deliveryOrderItems[0];
	return (
		<OrderDetailsV2Section
			id="shipping-info"
			heading={
				<Typography variant="h5">{orderShippingInfoNLS.Labels.ShippingDetails.t()}</Typography>
			}
			details={
				<OrderDetailsV2GridDisplay>
					<>
						<IconLabel
							icon={<Home color="primary" />}
							label={shippingNLS.Labels.ShippingAddress.t()}
						/>
						<Stack>
							<AddressCard address={item} readOnly={true} />
						</Stack>
					</>
					<>
						<IconLabel
							icon={<Shipping color="primary" />}
							label={shippingNLS.Labels.ShippingMethod.t()}
						/>
						<Stack>
							<Typography gutterBottom>{item.shipModeDescription}</Typography>
						</Stack>
					</>
				</OrderDetailsV2GridDisplay>
			}
		/>
	);
};
