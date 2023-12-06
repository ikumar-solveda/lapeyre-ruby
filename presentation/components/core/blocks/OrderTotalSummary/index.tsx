/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

/* eslint-disable quotes */
import { OneClick } from '@/components/blocks/OneClick';
import { orderTotalSummaryButtonSX } from '@/components/blocks/OrderTotalSummary/style';
import { PriceDisplay } from '@/components/blocks/PriceDisplay';
import { useCart } from '@/data/Content/Cart';
import { useCheckoutProfiles } from '@/data/Content/CheckoutProfiles';
import { useLocalization } from '@/data/Localization';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { PersonCheckoutProfilesItem } from '@/data/types/CheckoutProfiles';
import { Order, OrderItem } from '@/data/types/Order';
import { dFix } from '@/utils/floatingPoint';
import { Button, Divider, Grid, Stack, Typography, TypographyTypeMap } from '@mui/material';
import { useContext, useMemo } from 'react';

type ContextValues = {
	order?: Order;
	orderItems: OrderItem[];
	checkout?: () => Promise<boolean>;
	canContinue?: () => boolean;
	continueShopping?: () => void;
	dataOnly?: boolean;
	onFullCartCheckout?: (profile?: PersonCheckoutProfilesItem) => () => void;
	isRecurringOrder: boolean;
};

export const OrderTotalSummary = () => {
	const {
		order,
		orderItems,
		checkout,
		onFullCartCheckout,
		canContinue,
		continueShopping,
		dataOnly,
		selectedProfile,
		validById,
		isRecurringOrder,
	} = useContext(ContentContext) as ContextValues &
		ReturnType<typeof useCheckoutProfiles> &
		ReturnType<typeof useCart>;

	const Cart = useLocalization('Cart');
	const Summary = useLocalization('OrderTotalSummary');
	const summary = useMemo(
		() =>
			order
				? [
						{
							value: order.totalProductPrice ?? '',
							currency: order.totalProductPriceCurrency,
							label: Summary.Labels.Subtotal.t(),
						},
						{
							value: order.totalSalesTax ?? '',
							currency: order.totalSalesTaxCurrency,
							label: Summary.Labels.Tax.t(),
						},
						{
							value: order.totalShippingCharge ?? '',
							currency: order.totalShippingChargeCurrency,
							label: Summary.Labels.Shipping.t(),
						},
						{
							value: order.totalShippingTax ?? '',
							currency: order.totalShippingTaxCurrency,
							label: Summary.Labels.ShippingTax.t(),
						},
						{
							value: order.totalAdjustment ?? '',
							currency: order.totalAdjustmentCurrency,
							label: Summary.Labels.Discount.t(),
						},
						{
							value: order.grandTotal ?? '',
							currency: order.grandTotalCurrency,
							label: Summary.Labels.Total.t(),
							variant: 'subtitle1' as TypographyTypeMap['props']['variant'],
						},
				  ]
						.filter(({ value }) => value !== '')
						.map((item) => ({ ...item, value: dFix(item.value) }))
				: [],
		[order, Summary]
	);

	return orderItems?.length ? (
		<ContentProvider value={{ isRecurringOrder }}>
			<Stack justifyContent="center">
				{dataOnly ? null : (
					<Typography variant="subtitle1" gutterBottom>
						{Cart.Labels.OrderSummary.t()}
					</Typography>
				)}
				{summary.map(({ value, currency, label, variant }, i) => (
					<Stack direction="row" justifyContent="space-between" key={i}>
						<Typography gutterBottom variant={variant}>
							{label}
						</Typography>
						<Typography gutterBottom align="right" variant={variant}>
							<PriceDisplay min={value} currency={currency} />
						</Typography>
					</Stack>
				))}
				{dataOnly ? null : (
					<>
						<Divider sx={{ mb: 2 }} />
						<Grid container justifyContent="space-between" spacing={1}>
							<Grid item flex={1}>
								<Button
									sx={orderTotalSummaryButtonSX}
									data-testid="cart-continue-shop"
									id="cart-continue-shop"
									variant="contained"
									color="secondary"
									onClick={continueShopping}
								>
									{Cart.Actions.ContinueShopping.t()}
								</Button>
							</Grid>
							<Grid item flex={1}>
								<OneClick
									sx={orderTotalSummaryButtonSX}
									data-testid={
										validById[selectedProfile] ? 'cart-checkout-with-profile' : 'cart-checkout'
									}
									id={validById[selectedProfile] ? 'cart-checkout-with-profile' : 'cart-checkout'}
									variant="contained"
									disabled={canContinue ? !canContinue() : false}
									onClick={
										onFullCartCheckout ? onFullCartCheckout(validById[selectedProfile]) : checkout
									}
								>
									{validById[selectedProfile]
										? Cart.Actions.CheckoutWithProfile.t()
										: Cart.Actions.Checkout.t()}
								</OneClick>
							</Grid>
						</Grid>
					</>
				)}
			</Stack>
		</ContentProvider>
	) : null;
};
