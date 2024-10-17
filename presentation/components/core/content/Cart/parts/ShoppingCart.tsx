/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { B2B } from '@/components/blocks/B2B';
import { summaryPaperSX } from '@/components/content/Cart/style';
import { FreeGift } from '@/components/content/FreeGift';
import { OrderTable } from '@/components/content/OrderTable';
import { ScheduleRecurringOrders } from '@/components/content/ScheduleRecurringOrders';
import { useLocalization } from '@/data/Localization';
import { CartRewardOption, OrderItem } from '@/data/types/Order';
import { Alert, Paper, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC } from 'react';

export const CartShoppingCart: FC<{
	rewardOptions?: CartRewardOption[];
	deliveryOrderItems: OrderItem[];
	pickupOrderItems: OrderItem[];
	orderId: string;
}> = ({ rewardOptions, deliveryOrderItems, pickupOrderItems, orderId }) => {
	const freeGiftNLS = useLocalization('FreeGift');
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	return (
		<>
			{rewardOptions?.length ? (
				<Alert variant="outlined" severity="success">
					{freeGiftNLS.Qualify.t({ count: rewardOptions.length })}
				</Alert>
			) : null}
			{deliveryOrderItems.length || pickupOrderItems.length ? (
				<B2B>
					{isMobile ? (
						<ScheduleRecurringOrders />
					) : (
						<Paper sx={summaryPaperSX}>
							<ScheduleRecurringOrders />
						</Paper>
					)}
				</B2B>
			) : null}
			{isMobile ? (
				<OrderTable deliveries={deliveryOrderItems} pickups={pickupOrderItems} orderId={orderId} />
			) : (
				<Stack component={Paper} gap={1} sx={summaryPaperSX}>
					<OrderTable
						deliveries={deliveryOrderItems}
						pickups={pickupOrderItems}
						orderId={orderId}
					/>
				</Stack>
			)}
			{rewardOptions?.length ? <FreeGift rewardOptions={rewardOptions} orderId={orderId} /> : null}
		</>
	);
};
