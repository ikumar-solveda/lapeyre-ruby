/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { IconLabel } from '@/components/blocks/IconLabel';
import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
import { PaymentCard } from '@/components/blocks/PaymentCard';
import { useCheckOut } from '@/data/Content/CheckOut';
import { usePayment } from '@/data/Content/Payment';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { PAYMENT_CONFIGS } from '@/data/config/PAYMENT_CONFIGS';
import { ContentContext } from '@/data/context/content';
import { BasicAddress } from '@/data/types/Order';
import { formatPrice } from '@/utils/formatPrice';
import { unsupportedMethodForMultiPayment } from '@/utils/unsupportedMethodForMultiPayment';
import { Payment } from '@mui/icons-material';
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import { FC, useCallback, useContext, useMemo, useState } from 'react';

export const PaymentCardsDisplay: FC = () => {
	const {
		data: cart,
		setPaymentNumberToEdit,
		paymentsToEdit,
		next,
		back,
		paymentsTotal,
		cartTotal,
		bopisSelected,
		billingAddressMap,
		validatePO,
	} = useContext(ContentContext) as ReturnType<typeof useCheckOut> & ReturnType<typeof usePayment>;
	const paymentNLS = useLocalization('Payment');
	const paymentInfoList = useLocalization('PaymentInfoList');
	const router = useNextRouter();
	const locale = useMemo(() => router.locale ?? router.defaultLocale, [router]);
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
				next();
			}
		}
	}, [paymentsTotal, cartTotal, validatePO, next]);

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
									`${cart?.grandTotal}`
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
										`${cart?.grandTotal}`
									),
									paymentsTotal: formatPrice(
										`${locale}`,
										`${cart?.grandTotalCurrency}`,
										`${paymentsTotal}`
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
						{paymentNLS.Actions[bopisSelected ? 'BackToPickup' : 'Back'].t()}
					</Button>

					<Button
						data-testid="payment-next"
						id="payment-next"
						variant="contained"
						onClick={onConfirm}
					>
						{paymentNLS.Actions.Next.t()}
					</Button>
				</Stack>
			</Stack>
		</Stack>
	);
};
