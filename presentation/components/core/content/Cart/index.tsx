/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useCart } from '@/data/Content/Cart';
import { OrderItem } from '@/data/types/Order';
import { ID } from '@/data/types/Basic';
import { FC, useContext, useEffect, useState } from 'react';
import { OrderItemTable } from '@/components/content/OrderItemTable';
import { Grid, Paper, Typography } from '@mui/material';
import { ContentProvider } from '@/data/context/content';
import { EventsContext } from '@/data/context/events';
import { OrderTotalSummary } from '@/components/blocks/OrderTotalSummary';
import { OrderPromotionsSummary } from '@/components/blocks/OrderPromotionsSummary';
import { CartProfileSelection } from '@/components/content/Cart/parts/ProfileSelection';
import { summaryPaperSX } from '@/components/content/Cart/style';
import { useLocalization } from '@/data/Localization';
import { useCheckoutProfiles } from '@/data/Content/CheckoutProfiles';

export const Cart: FC<{ id: ID }> = () => {
	const cart = useCart();
	const profileValues = useCheckoutProfiles();
	const localization = useLocalization('Cart');
	const { onCartView, onEmptyCart } = useContext(EventsContext);
	const { data, loading, orderItems } = cart;
	const [initial, setInitial] = useState(true);
	useEffect(() => {
		if (!initial || !data) return;
		setInitial(false);
		onCartView(data);
	}, [onCartView, data, initial]);
	useEffect(() => {
		if (!orderItems?.length) {
			onEmptyCart();
		}
	}, [orderItems, onEmptyCart]);

	return loading ? null : (
		<ContentProvider value={{ ...cart, order: data, ...profileValues }}>
			<Grid container justifyContent="space-between" spacing={2} sx={{ mt: 0 }}>
				<Grid item xs={12}>
					<Typography variant="h3">{localization.Title.t()}</Typography>
				</Grid>
				<Grid item xs={12}>
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
