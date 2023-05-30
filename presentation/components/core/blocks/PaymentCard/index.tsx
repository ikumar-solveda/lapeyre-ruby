/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

/* eslint-disable complexity */
import React, { FC, useContext, useMemo } from 'react';
import { Grid, Typography } from '@mui/material';
import { AddressCardMain } from '@/components/blocks/AddressCard/Main';
import { makePrintable, maskCC } from '@/utils/address';
import { Card } from '@/components/blocks/Card';
import { useLocalization } from '@/data/Localization';
import { PriceDisplay } from '@/components/blocks/PriceDisplay';
import { PaymentCardContextValues, PaymentCardProps } from '@/data/types/PaymentCard';
import { paymentCardSX } from '@/components/blocks/PaymentCard/style';
import { ContentContext } from '@/data/context/content';

/**
 * Payment info card display component
 * displays the details of a single payment
 * @param props
 */
export const PaymentCard: FC<PaymentCardProps> = ({
	paymentInfo,
	paymentNumber,
	readOnly = false,
	address,
}) => {
	const PaymentInfoCardLabels = useLocalization('PaymentInfoCard');
	const AddressCardLabels = useLocalization('AddressCard');
	const { getPaymentCardActions } = useContext(ContentContext) as PaymentCardContextValues;

	const actions = useMemo(
		() => (readOnly ? [] : getPaymentCardActions ? getPaymentCardActions(paymentNumber) : []),
		[getPaymentCardActions, paymentNumber, readOnly]
	);
	const { account, expire_month: month = '', expire_year: year = '' } = paymentInfo;

	const cardHeader = (
		<>
			<Typography variant="subtitle2">
				{PaymentInfoCardLabels.Title.t({ number: 1 + paymentNumber })}
			</Typography>
			<Typography variant="body2">{paymentInfo.piDescription}</Typography>
		</>
	);

	const contentComponent = (
		<Grid container spacing={1}>
			<Grid item xs={12} sm={6}>
				<Typography variant="body2" gutterBottom>
					{PaymentInfoCardLabels.Labels.AmountToPay.t()}
				</Typography>
				<Typography>
					<PriceDisplay min={parseFloat(paymentInfo.piAmount)} currency={paymentInfo.piCurrency} />
				</Typography>

				{account ? (
					<>
						<Typography variant="body2">{maskCC(account)}</Typography>
						<Typography variant="body2">
							{PaymentInfoCardLabels.Labels.ExpiryDate.t({ month, year })}
						</Typography>
					</>
				) : null}
			</Grid>
			<Grid item xs={12} sm={6}>
				<Typography variant="body2" gutterBottom>
					{PaymentInfoCardLabels.Labels.BillingAddress.t()}
				</Typography>
				<AddressCardMain addressData={makePrintable(address)} />
			</Grid>
		</Grid>
	);

	return (
		<Card
			testId={`payment-${paymentNumber}`}
			extraSX={[paymentCardSX]}
			cardHeader={cardHeader}
			cardMain={contentComponent}
			actions={actions}
			confirmLabel={AddressCardLabels.Confirm.t()}
			cancelLabel={AddressCardLabels.Cancel.t()}
		/>
	);
};
