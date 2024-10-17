/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

/* eslint-disable quotes */
import { OneClick } from '@/components/blocks/OneClick';
import { orderTotalSummaryButtonSX } from '@/components/blocks/OrderTotalSummary/styles/button';
import { orderTotalSummaryDiscountSX } from '@/components/blocks/OrderTotalSummary/styles/discount';
import { orderTotalSummaryGridProps } from '@/components/blocks/OrderTotalSummary/styles/gridProps';
import { orderTotalSummaryTitleSX } from '@/components/blocks/OrderTotalSummary/styles/title';
import { orderTotalSummaryTitleDividerSX } from '@/components/blocks/OrderTotalSummary/styles/titleDivider';
import { OrderPriceDisplay } from '@/components/blocks/PriceDisplay';
import { useCart } from '@/data/Content/Cart';
import { useCheckoutProfiles } from '@/data/Content/CheckoutProfiles';
import { useLocalization } from '@/data/Localization';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { PersonCheckoutProfilesItem } from '@/data/types/CheckoutProfiles';
import { Order, OrderItem } from '@/data/types/Order';
import { dFix } from '@/utils/floatingPoint';
import { Button, Divider, Grid, Stack, Typography, TypographyProps } from '@mui/material';
import { useCallback, useContext, useMemo } from 'react';

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
		onFullCartCheckout,
		checkout,
		canContinue,
		continueShopping,
		dataOnly,
		selectedProfile,
		validById,
		isRecurringOrder,
	} = useContext(ContentContext) as ContextValues &
		ReturnType<typeof useCheckoutProfiles> &
		ReturnType<typeof useCart>;
	const checkoutId = validById?.[selectedProfile] ? 'cart-checkout-with-profile' : 'cart-checkout';
	const Cart = useLocalization('Cart');
	const Summary = useLocalization('OrderTotalSummary');
	const onClick = useCallback(
		() => (onFullCartCheckout ? onFullCartCheckout(validById[selectedProfile])() : checkout()),
		[checkout, onFullCartCheckout, selectedProfile, validById]
	);
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
							label: Summary.Labels.Discounts.t(),
							sx: orderTotalSummaryDiscountSX,
						},
						{
							value: order.grandTotal ?? '',
							currency: order.grandTotalCurrency,
							label: Summary.Labels.GrandTotal.t(),
							variant: 'h6' as TypographyProps['variant'],
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
					<>
						<Typography sx={orderTotalSummaryTitleSX} variant="h5" gutterBottom>
							{Cart.Labels.OrderSummary.t()}
						</Typography>
						<Divider sx={orderTotalSummaryTitleDividerSX} />
					</>
				)}
				{summary.map(({ value, currency, label, variant, sx }, i) => (
					<Stack sx={sx} direction="row" justifyContent="space-between" key={i}>
						<Typography gutterBottom variant={variant}>
							{label}
						</Typography>
						<Typography gutterBottom align="right" variant={variant}>
							<OrderPriceDisplay
								status={order?.orderStatus as string}
								min={value}
								currency={currency}
							/>
						</Typography>
					</Stack>
				))}
				{dataOnly ? null : (
					<Grid {...orderTotalSummaryGridProps}>
						<Grid item flex={1}>
							<OneClick
								sx={orderTotalSummaryButtonSX}
								data-testid={checkoutId}
								id={checkoutId}
								variant="contained"
								disabled={canContinue ? !canContinue() : false}
								onClick={onClick}
							>
								{validById[selectedProfile]
									? Cart.Actions.CheckoutWithProfile.t()
									: Cart.Actions.Checkout.t()}
							</OneClick>
						</Grid>
						<Grid item flex={1}>
							<Button
								sx={orderTotalSummaryButtonSX}
								data-testid="cart-continue-shop"
								id="cart-continue-shop"
								variant="outlined"
								color="secondary"
								onClick={continueShopping}
							>
								{Cart.Actions.ContinueShopping.t()}
							</Button>
						</Grid>
					</Grid>
				)}
			</Stack>
		</ContentProvider>
	) : null;
};
