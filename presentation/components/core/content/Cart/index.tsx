/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { GTMCartData } from '@/components/blocks/GTMCartData';
import { OrderPromotionsSummary } from '@/components/blocks/OrderPromotionsSummary';
import { OrderTotalSummary } from '@/components/blocks/OrderTotalSummary';
import { CartProfileSelection } from '@/components/content/Cart/parts/ProfileSelection';
import { summaryPaperSX } from '@/components/content/Cart/style';
import { OrderItemTable } from '@/components/content/OrderItemTable';
import { useCart } from '@/data/Content/Cart';
import { useCheckoutProfiles } from '@/data/Content/CheckoutProfiles';
import { useLocalization } from '@/data/Localization';
import { ContentProvider } from '@/data/context/content';
import { EventsContext } from '@/data/context/events';
import { ID } from '@/data/types/Basic';
import { OrderItem } from '@/data/types/Order';
import { Grid, Paper, Typography } from '@mui/material';
import { FC, useContext, useEffect, useState } from 'react';

export const Cart: FC<{ id: ID }> = () => {
	const { eventData } = useContext(EventsContext);
	const cart = useCart();
	const profileValues = useCheckoutProfiles();
	const localization = useLocalization('Cart');
	const { data, loading, orderItems, onCartPageViewEvent, onCartViewEvent } = cart;
	const [initial, setInitial] = useState(true);

	useEffect(() => {
		if (!initial || !data) return;
		setInitial(false);
		onCartPageViewEvent();
	}, [data, initial]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		onCartViewEvent(eventData);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orderItems, eventData]);

	return loading ? null : (
		<ContentProvider value={{ ...cart, order: data, ...profileValues }}>
			<Grid container justifyContent="space-between" spacing={2} sx={{ mt: 0 }}>
				<Grid item xs={12}>
					<Typography variant="h3">{localization.Title.t()}</Typography>
				</Grid>
				<Grid item xs={12}>
					<GTMCartData />
					<OrderItemTable orderItems={orderItems as OrderItem[]} orderId={data?.orderId} />
				</Grid>
				{orderItems?.length ? (
					<>
						<Grid item xs={12} sm={6} md={4}>
							<Paper sx={summaryPaperSX}>
								<OrderPromotionsSummary />
							</Paper>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<Paper sx={summaryPaperSX}>
								<CartProfileSelection />
							</Paper>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<Paper sx={summaryPaperSX}>
								<OrderTotalSummary />
							</Paper>
						</Grid>
					</>
				) : null}
			</Grid>
		</ContentProvider>
	);
};
