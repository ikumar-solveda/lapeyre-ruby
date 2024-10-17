/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { AddressCard } from '@/components/blocks/AddressCard';
import { IconLabel } from '@/components/blocks/IconLabel';
import { OrderDetailsGridDisplay } from '@/components/blocks/OrderDetails/parts/GridDisplay';
import { billingCvvSX } from '@/components/blocks/OrderDetails/styles/billingCvv';
import { PaymentCard } from '@/components/blocks/PaymentCard';
import { NON_CC_PAYMENTS_BY_CODE } from '@/data/constants/nonCreditCardPayment';
import { ReviewType } from '@/data/Content/CheckOut';
import { getPaymentToEdit } from '@/data/Content/Payment';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Address } from '@/data/types/Address';
import { Order } from '@/data/types/Order';
import { FormState } from '@/utils/useForm';
import { Contacts, Payment } from '@mui/icons-material';
import { Grid, Stack, TextField, Typography } from '@mui/material';
import { keyBy } from 'lodash';
import { FC, useContext, useMemo } from 'react';

/** @deprecated  see `OrderDetailsV2` */
export const OrderDetailsBilling: FC = () => {
	const { order, profileUsed, formData } = useContext(ContentContext) as {
		order: Order;
		profileUsed: boolean;
		formData: FormState<ReviewType>;
	};
	const { error, values, handleInputChange } = formData;
	const billLabels = useLocalization('OrderBillingInfo').Labels;
	const payLabels = useLocalization('OrderPaymentInfo').Labels;
	const payMethod = useLocalization('PaymentMethodSelection');
	const helperText = useMemo(
		() => ({ cvv: error.cvv ? payMethod.Msgs.CVV.t() : '' }),
		[payMethod, error]
	);
	const [payments, billingAddressMap] = useMemo(
		() => [
			order.paymentInstruction?.map(getPaymentToEdit) ?? [],
			keyBy(
				order.paymentInstruction?.map(
					(p) => ({ ...p, addressId: p.billing_address_id } as Address)
				),
				'addressId'
			),
		],
		[order]
	);

	return payments.length === 1 ? (
		<OrderDetailsGridDisplay>
			<>
				<IconLabel icon={<Contacts color="primary" />} label={billLabels.BillAddress.t()} />
				<Stack>
					<AddressCard
						address={billingAddressMap[payments[0].billing_address_id] as Address}
						readOnly={true}
					/>
				</Stack>
			</>
			<>
				<IconLabel icon={<Payment color="primary" />} label={payLabels.BillMethod.t()} />
				<Stack>
					<Typography gutterBottom>{payments[0].piDescription}</Typography>
					{!NON_CC_PAYMENTS_BY_CODE[payments[0].payMethodId as string] ? (
						<>
							<Typography gutterBottom>{payments[0].account}</Typography>
							<Typography gutterBottom>
								{`${payments[0].expire_month} / ${payments[0].expire_year}`}
							</Typography>
							{profileUsed ? (
								<TextField
									sx={billingCvvSX}
									required
									data-testid="profile-cvv"
									type="password"
									id="profile-cvv"
									name="cvv"
									label={payMethod.Labels.CVV.t()}
									onChange={handleInputChange}
									value={values.cvv}
									inputProps={{ inputMode: 'numeric', maxLength: 4, pattern: '[0-9]{3,4}' }}
									autoFocus={true}
									error={error.cvv}
									helperText={helperText.cvv}
								/>
							) : null}
						</>
					) : null}
				</Stack>
			</>
		</OrderDetailsGridDisplay>
	) : (
		<ContentProvider value={{ billingAddressMap }}>
			<Grid container spacing={2}>
				{payments.map((p, i) => (
					<Grid item xs={12} md={6} key={`${payments.length}_${i}`}>
						<PaymentCard
							key={i}
							paymentInfo={p}
							paymentNumber={i}
							readOnly={true}
							address={billingAddressMap[p.billing_address_id]}
						/>
					</Grid>
				))}
			</Grid>
		</ContentProvider>
	);
};
