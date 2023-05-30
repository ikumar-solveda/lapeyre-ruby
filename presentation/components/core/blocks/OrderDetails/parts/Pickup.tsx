/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext } from 'react';
import { Stack, Typography } from '@mui/material';
import { IconLabel } from '@/components/blocks/IconLabel';
import { Home, LocalShipping as Shipping } from '@mui/icons-material';
import { useLocalization } from '@/data/Localization';
import { OrderDetailsSection } from '@/components/blocks/OrderDetails/parts/Section';
import { OrderDetailsGridDisplay } from '@/components/blocks/OrderDetails/parts/GridDisplay';
import { ContentContext } from '@/data/context/content';
import { PICKUP_ON_BEHALF, SELF_PICKUP } from '@/data/constants/checkout';
import { ContextValues } from '@/components/blocks/OrderDetails/parts/ShippingSingle';
import { OrderItemTable } from '@/components/content/OrderItemTable';

export const OrderDetailsPickup: FC<{ showHeading: boolean }> = ({ showHeading }) => {
	const pickupNLS = useLocalization('Pickup');
	const infoLabels = useLocalization('OrderShippingInfo').Labels;
	const { order, orderItems } = useContext(ContentContext) as ContextValues;
	const item = orderItems[0];
	const userData = item.shipInstruction ? JSON.parse(item.shipInstruction) : {};
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
				heading={<Typography variant="h4">{pickupNLS.PickupDetailsTitle.t()}</Typography>}
				details={
					<OrderDetailsGridDisplay>
						<>
							<IconLabel icon={<Home color="primary" />} label={pickupNLS.PickupContactTitle.t()} />
							<Stack>
								{userData.type === SELF_PICKUP ? (
									<>
										<Typography>
											{userData?.firstName} {userData?.lastName}
										</Typography>
										<Typography>{userData?.email}</Typography>
										<Typography>{userData?.phone}</Typography>
									</>
								) : null}
								{userData.type === PICKUP_ON_BEHALF ? (
									<>
										<Typography>{userData?.buyerPersonFullName}</Typography>
										<Typography>{userData?.pickupPersonEmail}</Typography>
									</>
								) : null}
							</Stack>
						</>
						<>
							<IconLabel
								icon={<Shipping color="primary" />}
								label={pickupNLS.PickupStoreTitle.t()}
							/>
							<Stack>
								<Typography variant="body2">{item.fulfillmentCenterName}</Typography>
								<Typography>{item.addressLine[0]}</Typography>
								<Typography>
									{item.city}
									{', '}
									{item.stateOrProvinceName}
									{', '}
									{item.postalCode}
								</Typography>
							</Stack>
						</>
					</OrderDetailsGridDisplay>
				}
			/>
		</>
	);
};
