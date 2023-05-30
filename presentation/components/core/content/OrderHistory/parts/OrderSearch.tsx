/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { orderHistoryActionsSX } from '@/components/content/OrderHistory/styles/orderHistoryActions';
import { useOrderHistory } from '@/data/Content/OrderHistory';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { Info } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import { FC, useContext } from 'react';

export const OrderHistoryOrderSearch: FC = () => {
	const { orderId, onOrderId } = useContext(ContentContext) as {
		orderId: ReturnType<typeof useOrderHistory>['orderId'];
		onOrderId: ReturnType<typeof useOrderHistory>['onOrderId'];
	};
	const localization = useLocalization('Order');
	return (
		<TextField
			data-testid="order-id"
			id="order-id"
			name="orderId"
			placeholder={localization.HistorySearchPlaceHolder.t()}
			fullWidth
			sx={orderHistoryActionsSX}
			onChange={onOrderId}
			value={orderId}
			inputProps={{ maxLength: 128 }}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<Tooltip title={localization.TooltipOrderIdSearch.t()}>
							<IconButton edge="end">
								<Info color="info" />
							</IconButton>
						</Tooltip>
					</InputAdornment>
				),
			}}
		/>
	);
};
