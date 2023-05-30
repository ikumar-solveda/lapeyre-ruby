/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { CheckOutChevronRightBox } from '@/components/content/CheckOut/parts/ChevronRightBox';
import { CheckOutSwitch } from '@/components/content/CheckOut/parts/Switch';
import { CheckOutTitle } from '@/components/content/CheckOut/parts/Title';
import { useCheckOut } from '@/data/Content/CheckOut';
import { usePayment } from '@/data/Content/Payment';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Stack, Typography } from '@mui/material';
import { useCallback, useContext } from 'react';

export const PaymentHeader = () => {
	const paymentNLS = useLocalization('Payment');
	const shippingNLS = useLocalization('Shipping');
	const {
		multiplePayment,
		toggleMultiplePayment,
		paymentNumberToEdit,
		setPaymentNumberToEdit,
		toggleEditCreateAddress,
		addressToEdit,
	} = useContext(ContentContext) as ReturnType<typeof useCheckOut> & ReturnType<typeof usePayment>;
	const resetPaymentNumber = useCallback(
		() => setPaymentNumberToEdit(null),
		[setPaymentNumberToEdit]
	);

	return (
		<Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
			{paymentNumberToEdit !== null ? (
				<>
					<CheckOutTitle title={paymentNLS.Title.t()} onClick={resetPaymentNumber} />
					<CheckOutChevronRightBox />
					<Typography variant="h4" component="p">
						{paymentNLS.Labels.PaymentMethod.t({ number: 1 + paymentNumberToEdit })}
					</Typography>
				</>
			) : addressToEdit ? (
				<>
					<CheckOutTitle title={paymentNLS.Title.t()} onClick={toggleEditCreateAddress(null)} />
					<CheckOutChevronRightBox />
					<Typography variant="h4" component="p">
						{shippingNLS.Labels[addressToEdit.addressId ? 'EditAddress' : 'AddNewAddress'].t()}
					</Typography>
				</>
			) : (
				// regular header
				<>
					<CheckOutTitle title={paymentNLS.Title.t()} />
					<CheckOutSwitch
						checked={multiplePayment}
						onChange={toggleMultiplePayment}
						label={paymentNLS.Labels.UseMultiple.t()}
					/>
				</>
			)}
		</Stack>
	);
};
