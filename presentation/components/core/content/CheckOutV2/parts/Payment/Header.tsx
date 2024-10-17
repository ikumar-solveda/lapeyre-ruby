/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { CheckOutV2ChevronRightBox } from '@/components/content/CheckOutV2/parts/ChevronRightBox';
import { CheckOutV2Switch } from '@/components/content/CheckOutV2/parts/Switch';
import { CheckOutV2Title } from '@/components/content/CheckOutV2/parts/Title';
import { useCheckOutV2 } from '@/data/Content/CheckOutV2';
import { usePayment } from '@/data/Content/Payment';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Stack, Typography } from '@mui/material';
import { useCallback, useContext } from 'react';

export const CheckOutV2PaymentHeader = () => {
	const paymentNLS = useLocalization('Payment');
	const shippingNLS = useLocalization('Shipping');
	const {
		multiplePayment,
		toggleMultiplePayment,
		paymentNumberToEdit,
		setPaymentNumberToEdit,
		toggleEditCreateAddress,
		addressToEdit,
	} = useContext(ContentContext) as ReturnType<typeof useCheckOutV2> &
		ReturnType<typeof usePayment>;
	const resetPaymentNumber = useCallback(
		() => setPaymentNumberToEdit(null),
		[setPaymentNumberToEdit]
	);

	return (
		<Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
			{paymentNumberToEdit !== null ? (
				<>
					<CheckOutV2Title title={paymentNLS.Title.t()} onClick={resetPaymentNumber} />
					<CheckOutV2ChevronRightBox />
					<Typography variant="h4" component="p">
						{paymentNLS.Labels.PaymentMethod.t({ number: 1 + paymentNumberToEdit })}
					</Typography>
				</>
			) : addressToEdit ? (
				<>
					<CheckOutV2Title title={paymentNLS.Title.t()} onClick={toggleEditCreateAddress(null)} />
					<CheckOutV2ChevronRightBox />
					<Typography variant="h4" component="p">
						{shippingNLS.Labels[addressToEdit.addressId ? 'EditAddress' : 'AddNewAddress'].t()}
					</Typography>
				</>
			) : (
				// regular header
				<>
					<CheckOutV2Title title={paymentNLS.Title.t()} />
					<CheckOutV2Switch
						checked={multiplePayment}
						onChange={toggleMultiplePayment}
						label={paymentNLS.Labels.UseMultiple.t()}
					/>
				</>
			)}
		</Stack>
	);
};
