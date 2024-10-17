/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { IconLabel } from '@/components/blocks/IconLabel';
import { OrderDetailsV2GridDisplay } from '@/components/blocks/OrderDetailsV2/parts/GridDisplay';
import { OrderDetailsV2Section } from '@/components/blocks/OrderDetailsV2/parts/Section';
import { PICKUP_ON_BEHALF, SELF_PICKUP } from '@/data/constants/checkout';
import { useLocalization } from '@/data/Localization';
import { OrderItem } from '@/data/types/Order';
import { NonSelfPickupType, SelfPickupType } from '@/data/types/Pickup';
import { Home, LocalShipping as Shipping } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { FC, useMemo } from 'react';

export const OrderDetailsV2Pickup: FC<{ pickupOrderItems: OrderItem[] }> = ({
	pickupOrderItems,
}) => {
	const pickupNLS = useLocalization('Pickup');
	const item = pickupOrderItems[0];
	const userData = useMemo<SelfPickupType | NonSelfPickupType>(() => {
		const instruction = item?.shipInstruction;
		if (instruction) {
			return JSON.parse(instruction);
		} else {
			return {};
		}
	}, [item]);
	return item ? (
		<OrderDetailsV2Section
			id="shipping-info"
			heading={<Typography variant="h5">{pickupNLS.PickupDetailsTitle.t()}</Typography>}
			details={
				<OrderDetailsV2GridDisplay>
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
						<IconLabel icon={<Shipping color="primary" />} label={pickupNLS.PickupStoreTitle.t()} />
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
				</OrderDetailsV2GridDisplay>
			}
		/>
	) : null;
};
