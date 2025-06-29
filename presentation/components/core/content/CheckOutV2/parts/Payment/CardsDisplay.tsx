/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { IconLabel } from '@/components/blocks/IconLabel';
import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
import { PaymentCard } from '@/components/blocks/PaymentCard';
import { useCheckOutV2 } from '@/data/Content/CheckOutV2';
import { useCurrencyFormat } from '@/data/Content/CurrencyFormat';
import { usePayment } from '@/data/Content/Payment';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { useLocalization } from '@/data/Localization';
import { PAYMENT_CONFIGS } from '@/data/config/PAYMENT_CONFIGS';
import { ContentContext } from '@/data/context/content';
import { BasicAddress } from '@/data/types/Order';
import { formatPrice } from '@/utils/formatPrice';
import { unsupportedMethodForMultiPayment } from '@/utils/unsupportedMethodForMultiPayment';
import { Payment } from '@mui/icons-material';
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import { FC, useCallback, useContext, useMemo, useState } from 'react';

export const CheckOutV2PaymentCardsDisplay: FC = () => {
	const {
		data: cart,
		setPaymentNumberToEdit,
		paymentsToEdit,
		next,
		back,
		paymentsTotal,
		cartTotal,
		billingAddressMap,
		validatePO,
		steps,
		activeStep,
		verifyAndRemoveTheUnusedPI,
	} = useContext(ContentContext) as ReturnType<typeof useCheckOutV2> &
		ReturnType<typeof usePayment>;

	const { decimalPlaces } = useCurrencyFormat();
	const paymentNLS = useLocalization('Payment');
	const paymentInfoList = useLocalization('PaymentInfoList');
	const checkoutNLS = useLocalization('Checkout');
	const nextStep = steps[activeStep + 1] as keyof typeof checkoutNLS.Actions.Continue;
	const previousStep = steps[activeStep - 1] as keyof typeof checkoutNLS.Actions.Back;
	const labelNext = useMemo(
		() => checkoutNLS.Actions.Continue[nextStep].t(),
		[checkoutNLS, nextStep]
	);
	const labelBack = useMemo(
		() => checkoutNLS.Actions.Back[previousStep].t(),
		[checkoutNLS, previousStep]
	);
	const { localeName: locale } = useStoreLocale();
	const onCancel = useCallback(() => {
		setPaymentNumberToEdit(null);
		back();
	}, [back, setPaymentNumberToEdit]);
	const [error, setError] = useState<Record<string, boolean>>();
	const onConfirm = useCallback(() => {
		if (paymentsTotal !== cartTotal) {
			setError(() => ({ notEnough: true }));
		} else {
			setError(undefined);

			// PO has its own error display
			if (validatePO()) {
				verifyAndRemoveTheUnusedPI();
				next();
			}
		}
	}, [paymentsTotal, cartTotal, validatePO, verifyAndRemoveTheUnusedPI, next]);

	const onAdd = useCallback(() => {
		if (paymentsToEdit.some(unsupportedMethodForMultiPayment)) {
			setError(() => ({ payInStore: true }));
		} else {
			setError(undefined);
			setPaymentNumberToEdit(paymentsToEdit.length);
		}
	}, [paymentsToEdit, setPaymentNumberToEdit]);

	return (
		<Stack spacing={2} divider={<Divider />}>
			<Stack spacing={2} justifyContent="flex-start">
				<IconLabel
					icon={<Payment color="primary" />}
					label={
						<Typography variant="h5">
							{paymentNLS.TitleMulti.t({
								total: formatPrice(
									`${locale}`,
									`${cart?.grandTotalCurrency}`,
									`${cart?.grandTotal}`,
									decimalPlaces
								),
							})}
						</Typography>
					}
				/>
				{paymentsToEdit.length === 0 ? (
					<Box>
						<Button
							data-testid="payment-add-new"
							id="payment-add-new"
							variant="contained"
							onClick={onAdd}
							color="secondary"
						>
							{paymentInfoList.Actions.AddPayMethod.t()}
						</Button>
					</Box>
				) : null}
				<Stack>
					<Grid container spacing={2}>
						{paymentsToEdit.map((p, i) => (
							<Grid item xs={12} md={6} key={`${paymentsToEdit.length}_${i}`}>
								<PaymentCard
									key={i}
									paymentInfo={p}
									paymentNumber={i}
									address={billingAddressMap[p.nickName] as BasicAddress}
								/>
							</Grid>
						))}
						{paymentsToEdit.length > 0 &&
						paymentsToEdit.length < PAYMENT_CONFIGS.maxNumPayment &&
						paymentsTotal < cartTotal ? (
							<Grid item xs={12} md={6}>
								<Button
									data-testid="payment-add-another"
									id="payment-add-another"
									variant="contained"
									onClick={onAdd}
									color="secondary"
								>
									{paymentNLS.Actions.AddAnotherPayMethod.t()}
								</Button>
							</Grid>
						) : null}
					</Grid>
				</Stack>

				{error ? (
					<Stack>
						{!paymentsToEdit.length ? (
							<Typography color="text.alert">
								{paymentInfoList.Msgs.PayMethodRequired.t()}
							</Typography>
						) : error.payInStore ? (
							<Typography color="text.alert">
								<LocalizationWithComponent
									text={paymentInfoList.Msgs.notValidForMulti.t({
										type: paymentsToEdit.find(unsupportedMethodForMultiPayment)
											?.piDescription as string,
									})}
									components={[<Typography component="span" variant="body2" key="0" />]}
								/>
							</Typography>
						) : error.notEnough ? (
							<Typography color="text.alert">
								{paymentInfoList.Msgs.PaymentAmountError.t({
									grandTotal: formatPrice(
										`${locale}`,
										`${cart?.grandTotalCurrency}`,
										`${cart?.grandTotal}`,
										decimalPlaces
									),
									paymentsTotal: formatPrice(
										`${locale}`,
										`${cart?.grandTotalCurrency}`,
										`${paymentsTotal}`,
										decimalPlaces
									),
								})}
							</Typography>
						) : null}
					</Stack>
				) : null}
			</Stack>
			<Stack>
				<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
					<Button
						data-testid="payment-previous"
						id="payment-previous"
						variant="contained"
						onClick={onCancel}
						color="secondary"
					>
						{labelBack}
					</Button>

					<Button
						data-testid="payment-next"
						id="payment-next"
						variant="contained"
						onClick={onConfirm}
					>
						{labelNext}
					</Button>
				</Stack>
			</Stack>
		</Stack>
	);
};
