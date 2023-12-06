/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { iconSX } from '@/components/content/OrderConfirmation/style';
import { OrderStates, useOrderConfirmation } from '@/data/Content/OrderConfirmation';
import { useLocalization } from '@/data/Localization';
import { ID } from '@/data/types/Basic';
import { CheckCircle } from '@mui/icons-material';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import { FC } from 'react';

export const OrderConfirmation: FC<{ id: ID }> = () => {
	const labels = useLocalization('OrderConfirmation');
	const messages = labels.Msgs;
	const { orderStatus, emails, orderId, storeName } = useOrderConfirmation();

	return orderStatus ? (
		<Container>
			<Typography variant="h4" sx={{ my: 4 }}>
				{labels.Title.t()}
			</Typography>
			<Paper>
				<Stack alignItems="center" sx={{ my: 15 }}>
					{OrderStates.approved[orderStatus] ? (
						<Box sx={iconSX({ size: 75 })}>
							<CheckCircle fontSize="large" />
						</Box>
					) : null}
					<Typography
						variant="h3"
						align="center"
						data-testid="orderReceivedMsg"
						id="orderReceivedMsg"
						gutterBottom
					>
						{OrderStates.approved[orderStatus]
							? messages.Heading.t()
							: OrderStates.pending[orderStatus]
							? messages.Pending.t()
							: null}
					</Typography>
					<Typography
						variant="h6"
						align="center"
						data-testid="orderNumber"
						id="orderNumber"
						gutterBottom
					>
						{messages.OrderNumber.t({ orderId })}
					</Typography>
					<Typography
						align="center"
						data-testid="receiptDetailsMsg"
						id="receiptDetailsMsg"
						gutterBottom
					>
						{OrderStates.approved[orderStatus]
							? messages.Details.t({ emails })
							: OrderStates.pending[orderStatus]
							? messages.PendingDetails.t()
							: null}
					</Typography>
					<Typography align="center" data-testid="acknowledgeMsg" id="acknowledgeMsg">
						{messages.ThankYou.t({ storeName })}
					</Typography>
				</Stack>
			</Paper>
		</Container>
	) : null;
};
