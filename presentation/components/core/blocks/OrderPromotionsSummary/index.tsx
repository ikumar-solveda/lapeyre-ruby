/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PriceDisplay } from '@/components/blocks/PriceDisplay';
import { PromoCodeState } from '@/data/Content/Cart';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Order } from '@/data/types/Order';
import { dFix } from '@/utils/floatingPoint';
import { Box, Button, ButtonProps, Chip, Grid, Stack, TextField, Typography } from '@mui/material';
import { ChangeEvent, FC, KeyboardEvent, useContext, useMemo } from 'react';

type ContextValues = {
	order?: Order;
	onPromoCodeRemove: (code?: string | undefined) => Promise<void>;
	onPromoCodeApply?: ButtonProps['onClick'];
	onPromoCodeChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onPromoCodeApplyByKey?: (e: KeyboardEvent<HTMLDivElement>) => void;
	onResetPromoCodeError?: () => void;
	promoCode?: PromoCodeState;
	dataOnly?: boolean;
};
export const OrderPromotionsSummary: FC = () => {
	const Cart = useLocalization('Cart');
	const OrderDiscountSummary = useLocalization('OrderDiscountSummary');
	const {
		order,
		onPromoCodeRemove,
		onPromoCodeApply,
		onPromoCodeChange,
		onPromoCodeApplyByKey,
		onResetPromoCodeError,
		promoCode,
		dataOnly,
	} = useContext(ContentContext) as ContextValues;
	const discountTotal = useMemo(() => dFix(order?.totalAdjustment ?? 0), [order]);

	return order ? (
		<Stack spacing={1}>
			{dataOnly ? null : (
				<>
					<Typography variant="subtitle1" gutterBottom>
						{Cart.Labels.PromoCode.t()}
					</Typography>

					<Box>
						<TextField
							sx={{ mb: 1 }}
							size="small"
							value={promoCode?.code}
							data-testid="cart_input_promo-code"
							id="cart_input_promo-code"
							onFocus={onResetPromoCodeError}
							onChange={onPromoCodeChange}
							onKeyDown={onPromoCodeApplyByKey}
							error={promoCode?.error}
							label={Cart.Msgs.PromoCode.t()}
							InputLabelProps={{ sx: { m: 0 } }}
							fullWidth
						/>

						<Button
							sx={{ mb: 1 }}
							data-testid="button-cart-apply-promo-code"
							onClick={onPromoCodeApply}
							id="button-cart-apply-promo-code"
							variant="contained"
							color="secondary"
							size="small"
						>
							{Cart.Actions.Apply.t()}
						</Button>
					</Box>
					<Grid container>
						{order?.promotionCode?.map(({ code }, index) => (
							<Grid item xs="auto" key={code}>
								<Chip
									sx={{ mr: 1, mb: 1 }}
									variant="outlined"
									size="medium"
									label={code}
									onClick={onPromoCodeRemove.bind(null, code)}
									onDelete={onPromoCodeRemove.bind(null, code)}
									id={`cart_link_3_${index}`}
									data-testid={`cart_link_3_${index}`}
								/>
							</Grid>
						))}
					</Grid>
				</>
			)}
			<Stack>
				{order?.adjustment?.map(({ description, code, amount, currency }) => (
					<Stack direction="row" justifyContent="space-between" key={code}>
						<Typography gutterBottom>{description ?? code?.replace(/-\d+$/, '') ?? ''}</Typography>
						<Typography gutterBottom align="right">
							<PriceDisplay min={dFix(amount ?? 0)} currency={currency} />
						</Typography>
					</Stack>
				))}

				{discountTotal ? (
					<Stack direction="row" justifyContent="space-between">
						<Typography variant="subtitle1" gutterBottom>
							{OrderDiscountSummary.Labels.Total.t()}
						</Typography>
						<Typography variant="subtitle1" gutterBottom align="right">
							<PriceDisplay min={discountTotal} currency={order?.totalAdjustmentCurrency} />
						</Typography>
					</Stack>
				) : null}
			</Stack>
		</Stack>
	) : null;
};
