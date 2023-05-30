/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { IconLabel } from '@/components/blocks/IconLabel';
import { PaymentCard } from '@/components/blocks/PaymentCard';
import { useCheckOut } from '@/data/Content/CheckOut';
import { usePayment } from '@/data/Content/Payment';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { formatValue } from '@/utils/payment';
import { Payment } from '@mui/icons-material';
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import { FC, useCallback, useContext, useMemo, useState } from 'react';
import { BasicAddress } from '@/data/types/Order';
import { PAYMENT_CONFIGS } from '@/data/config/PAYMENT_CONFIGS';

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
	} = useContext(ContentContext) as ReturnType<typeof useCheckOut> & ReturnType<typeof usePayment>;
	const paymentNLS = useLocalization('Payment');
	const paymentInfoList = useLocalization('PaymentInfoList');
	const router = useNextRouter();
	const locale = useMemo(() => router.locale ?? router.defaultLocale, [router]);
	const onCancel = useCallback(() => {
		setPaymentNumberToEdit(null);
		back();
	}, [back, setPaymentNumberToEdit]);
	const [error, setError] = useState<boolean>(false);
	const onConfirm = useCallback(() => {
		if (paymentsTotal !== cartTotal) {
			setError(true);
		} else {
			setError(false);
			next();
		}
	}, [cartTotal, paymentsTotal, next]);
	const onAdd = useCallback(
		() => setPaymentNumberToEdit(paymentsToEdit.length),
		[paymentsToEdit.length, setPaymentNumberToEdit]
	);

	return (
		<Stack spacing={2} divider={<Divider />}>
			<Stack spacing={2} justifyContent="flex-start">
				<IconLabel
					icon={<Payment color="primary" />}
					label={
						<Typography variant="h5">
							{paymentNLS.TitleMulti.t({
								total: formatValue(
									`${cart?.grandTotal}`,
									`${cart?.grandTotalCurrency}`,
									`${locale}`
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
						) : paymentsTotal !== cartTotal ? (
							<Typography color="text.alert">
								{paymentInfoList.Msgs.PaymentAmountError.t({
									grandTotal: formatValue(
										`${cart?.grandTotal}`,
										`${cart?.grandTotalCurrency}`,
										`${locale}`
									),
									paymentsTotal: formatValue(
										`${paymentsTotal}`,
										`${cart?.grandTotalCurrency}`,
										`${locale}`
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
