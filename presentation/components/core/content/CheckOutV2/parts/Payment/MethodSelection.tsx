/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { IconLabel } from '@/components/blocks/IconLabel';
import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
import { NumberInput } from '@/components/blocks/NumberInput';
import { PriceDisplay } from '@/components/blocks/PriceDisplay';
import { Props } from '@/components/content/CheckOutV2/parts/Payment/Selection';
import { checkOutV2PaymentErrorSX } from '@/components/content/CheckOutV2/styles/Payment/error';
import { checkOutV2PaymentMethodSelectionFieldsetSX } from '@/components/content/CheckOutV2/styles/Payment/methodSelectionFieldset';
import { checkoutV2PaymentMethodSelectionFormHelperTextSX } from '@/components/content/CheckOutV2/styles/Payment/methodSelectionFormHelperText';
import { checkOutV2PaymentMethodSelectionFromControlLabelSX } from '@/components/content/CheckOutV2/styles/Payment/methodSelectionFromControlLabel';
import { checkOutV2PaymentMethodSelectionNumberInputSX } from '@/components/content/CheckOutV2/styles/Payment/methodSelectionNumberInput';
import { checkOutV2PaymentMethodSelectionOptionStackSX } from '@/components/content/CheckOutV2/styles/Payment/methodSelectionOptionStack';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { NON_CREDIT_CARD_PAYMENTS } from '@/data/constants/nonCreditCardPayment';
import { EXPIRY } from '@/data/constants/payment';
import { DEFAULT_DECIMAL_PLACES_STR } from '@/data/constants/price';
import { useCheckOutV2 } from '@/data/Content/CheckOutV2';
import { useCurrencyFormat } from '@/data/Content/CurrencyFormat';
import { usePayment } from '@/data/Content/Payment';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { dFix } from '@/utils/floatingPoint';
import { inputValueAsChangeEvent } from '@/utils/inputValueAsChangeEvent';
import { REG_EX_CVC, REG_EX_NUMBER, REG_EX_NUMBER_NOT_ZERO } from '@/utils/payment';
import { Payment } from '@mui/icons-material';
import {
	Alert,
	Box,
	Divider,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Grid,
	InputLabel,
	Radio,
	RadioGroup,
	Select,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { ChangeEvent, FC, useContext } from 'react';

export const CheckOutV2PaymentMethodSelection: FC<Props> = ({
	values,
	handleInputChange,
	handleSelectChange,
	onNamedValueChange,
	error,
}) => {
	const paymentMethodSelectionNLS = useLocalization('PaymentMethodSelection');
	const {
		multiplePayment,
		usablePayments,
		cart,
		cartTotal,
		paymentNumberToEdit,
		getMaximumPiAmount,
		methodError,
	} = useContext(ContentContext) as ReturnType<typeof useCheckOutV2> &
		ReturnType<typeof usePayment>;
	const { decimalPlaces = DEFAULT_DECIMAL_PLACES_STR } = useCurrencyFormat();
	const { Msgs } = useLocalization('PaymentInfoList');
	const onRadioGroupChange = (event: ChangeEvent<HTMLInputElement>) => {
		onNamedValueChange('account', '');
		onNamedValueChange('cc_cvc', '');
		handleInputChange(event);
	};

	const maxPiAmount =
		paymentNumberToEdit !== null ? getMaximumPiAmount(paymentNumberToEdit) : cartTotal;
	const isPaymentValueValid = (x: number | null) => (x ? x <= maxPiAmount : true);

	return (
		<Stack spacing={2} pb={2}>
			<IconLabel
				icon={<Payment color="primary" />}
				label={
					<Typography variant="h5" id="payment-method" data-testid="payment-method">
						{paymentMethodSelectionNLS.Title.t()}
					</Typography>
				}
			/>
			<Box>
				<Grid container spacing={4}>
					<Grid item xs={12} md={6}>
						<FormControl
							component="fieldset"
							variant="outlined"
							sx={checkOutV2PaymentMethodSelectionFieldsetSX}
						>
							<FormHelperText
								component="legend"
								sx={checkoutV2PaymentMethodSelectionFormHelperTextSX}
							>
								{paymentMethodSelectionNLS.Labels.Choose.t()}
							</FormHelperText>
							<RadioGroup
								value={values.policyId}
								onChange={onRadioGroupChange}
								aria-labelledby="payment-method"
							>
								{usablePayments?.map((payment) => (
									<Stack
										key={payment.xumet_policyId}
										divider={<Divider />}
										sx={checkOutV2PaymentMethodSelectionOptionStackSX}
									>
										<FormControlLabel
											value={payment.xumet_policyId}
											control={<Radio name="policyId" required />}
											label={<Typography component="span">{payment.description}</Typography>}
											sx={checkOutV2PaymentMethodSelectionFromControlLabelSX}
											id={`radio-group-policyId-${payment.xumet_policyId}`}
											data-testid={`radio-group-policyId-${payment.xumet_policyId}`}
										/>
										{!NON_CREDIT_CARD_PAYMENTS.includes(payment.paymentMethodName ?? '') &&
										values.policyId === payment.xumet_policyId &&
										payment.paymentTermConditionId === EMPTY_STRING ? (
											<Grid container spacing={2} px={2} py={3}>
												<Grid item xs={12}>
													<TextField
														required
														name="account"
														value={values.account}
														label={paymentMethodSelectionNLS.Labels.CCNumber.t()}
														type="tel"
														onChange={handleInputChange}
														error={error.account}
														helperText={
															error.account
																? paymentMethodSelectionNLS.Msgs.InvalidCardNumber.t()
																: EMPTY_STRING
														}
														inputProps={{ maxLength: 19, pattern: REG_EX_NUMBER.source }}
														fullWidth
													/>
												</Grid>

												<Grid item xs={12} sm={8}>
													<Grid container spacing={2} alignItems="flex-end">
														<Grid item xs={6} sm={5}>
															<FormControl variant="outlined" fullWidth>
																<InputLabel shrink htmlFor="expire_month">
																	{paymentMethodSelectionNLS.Labels.ExpiryDate.t()}
																</InputLabel>

																<Select
																	required
																	native
																	data-testid="expiry-month"
																	id="expire_month"
																	name="expire_month"
																	value={values.expire_month}
																	error={error.expire_month}
																	onChange={handleSelectChange}
																	fullWidth
																>
																	{EXPIRY.MONTHS.map((month: any) => (
																		<option value={month} key={month}>
																			{month}
																		</option>
																	))}
																</Select>
															</FormControl>
														</Grid>
														<Grid item xs={6} sm={5}>
															<FormControl variant="outlined" fullWidth>
																<Select
																	native
																	required
																	id="expiry-year"
																	data-testid="expiry-year"
																	name="expire_year"
																	value={values.expire_year}
																	onChange={handleSelectChange}
																	error={error.expire_year}
																	inputProps={{
																		'aria-label': paymentMethodSelectionNLS.Labels.ExpiryYear.t(),
																	}}
																	fullWidth
																>
																	{EXPIRY.YEARS.map((year: any) => (
																		<option value={year} key={year}>
																			{year}
																		</option>
																	))}
																</Select>
															</FormControl>
														</Grid>
													</Grid>
												</Grid>

												<Grid item xs={12} sm={4}>
													<TextField
														required
														name="cc_cvc"
														value={values.cc_cvc}
														label={paymentMethodSelectionNLS.Labels.CVV.t()}
														type="password"
														onChange={handleInputChange}
														error={error.cc_cvc}
														helperText={
															error.cc_cvc ? paymentMethodSelectionNLS.Msgs.CVV.t() : EMPTY_STRING
														}
														inputProps={{ maxLength: 4, pattern: REG_EX_CVC.source }}
														fullWidth
													/>
												</Grid>
											</Grid>
										) : null}
									</Stack>
								))}
							</RadioGroup>
						</FormControl>
						{error.policyId ? (
							<Alert variant="outlined" severity="error" sx={checkOutV2PaymentErrorSX}>
								{paymentMethodSelectionNLS.Msgs.SelectPaymentMethod.t()}
							</Alert>
						) : null}
					</Grid>
					{multiplePayment ? (
						<Grid item>
							<Typography variant="body2">
								{paymentMethodSelectionNLS.Labels.OrderTotal.t()}
							</Typography>
							<Typography mb={2}>
								<PriceDisplay min={dFix(cart.grandTotal)} currency={cart.grandTotalCurrency} />
							</Typography>

							<Typography variant="body2">
								{paymentMethodSelectionNLS.Labels.RemainingAmount.t()}
							</Typography>
							<Typography mb={2}>
								<PriceDisplay min={maxPiAmount} currency={cart.grandTotalCurrency} />
							</Typography>
							<NumberInput
								label={paymentMethodSelectionNLS.Labels.AmountToPay.t()}
								required
								name="piAmount"
								precision={dFix(decimalPlaces, 0)}
								value={values.piAmount}
								onChange={(value) =>
									handleInputChange(
										inputValueAsChangeEvent({ name: 'piAmount', value: `${value ?? 0}` })
									)
								}
								inputProps={{ pattern: REG_EX_NUMBER_NOT_ZERO.source }}
								error={!isPaymentValueValid(dFix(values.piAmount))}
								helperText={
									isPaymentValueValid(dFix(values.piAmount))
										? EMPTY_STRING
										: paymentMethodSelectionNLS.Labels.PayTooMuch.t()
								}
								customValidator={isPaymentValueValid}
								sx={checkOutV2PaymentMethodSelectionNumberInputSX}
								data-testid="payment-method-input-amount"
								id="payment-method-input-amount"
							/>
						</Grid>
					) : null}
				</Grid>
				{methodError?.methodName ? (
					<Typography color="text.alert">
						<LocalizationWithComponent
							text={Msgs.notValidForMulti.t({ type: methodError.methodName })}
							components={[<Typography component="span" variant="body2" key="0" />]}
						/>
					</Typography>
				) : null}
			</Box>
		</Stack>
	);
};
