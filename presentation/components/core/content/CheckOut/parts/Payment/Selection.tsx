/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { CheckOutFormActionsFooter } from '@/components/content/CheckOut/parts/FormActionFooter';
import { PaymentAddressSelection } from '@/components/content/CheckOut/parts/Payment/AddressSelection';
import { PaymentCreateEditAddress } from '@/components/content/CheckOut/parts/Payment/CreateEditAddress';
import { PaymentMethodSelection } from '@/components/content/CheckOut/parts/Payment/MethodSelection';
import { useCheckOut } from '@/data/Content/CheckOut';
import {
	getPaymentToEdit,
	markSinglePaymentDirtyIfNeeded,
	usePayment,
} from '@/data/Content/Payment';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { PaymentToEdit } from '@/data/types/Order';
import { FormState, useForm } from '@/utils/useForm';
import { Divider, Stack } from '@mui/material';
import { useCallback, useContext, useMemo, useState } from 'react';

export type Props = Omit<FormState<PaymentToEdit>, 'formRef' | 'handleSubmit'>;

export const PaymentSelection = () => {
	const {
		multiplePayment,
		setPaymentNumberToEdit,
		onSinglePaymentSubmit,
		onMultiCreateOrEditSingle,
		mutateCart,
		addressToEdit,
		bopisSelected,
		next,
		back,
		cart,
		paymentsToEdit,
		paymentNumberToEdit,
	} = useContext(ContentContext) as ReturnType<typeof useCheckOut> & ReturnType<typeof usePayment>;

	const form = useMemo(() => {
		const toEdit = paymentsToEdit.at(paymentNumberToEdit ?? 0);
		const blank = getPaymentToEdit();
		return multiplePayment
			? toEdit ?? blank
			: paymentsToEdit.length === 1
			? markSinglePaymentDirtyIfNeeded(toEdit ?? blank, cart.grandTotal)
			: blank;
	}, [multiplePayment, paymentsToEdit, paymentNumberToEdit, cart.grandTotal]);

	const { formRef, handleSubmit, onNamedValueChange, ...rest } = useForm(form);
	const paymentNLS = useLocalization('Payment');
	const paymentMethodContainerNLS = useLocalization('PaymentMethodContainer');
	const labelNext = useMemo(() => paymentNLS.Actions.Next.t(), [paymentNLS]);
	const labelBack = useMemo(
		() => (bopisSelected ? paymentNLS.Actions.BackToPickup.t() : paymentNLS.Actions.Back.t()),
		[paymentNLS, bopisSelected]
	);
	const cancelNewPayment = useMemo(
		() => paymentMethodContainerNLS.Actions.Cancel.t(),
		[paymentMethodContainerNLS]
	);
	const addNewPaymentDone = useMemo(
		() => paymentMethodContainerNLS.Actions.Done.t(),
		[paymentMethodContainerNLS]
	);

	const [disableSubmit, setDisableSubmit] = useState<boolean>(false);

	const onSubmit = useCallback(
		async (data: PaymentToEdit) => {
			try {
				setDisableSubmit(true);
				if (!multiplePayment) {
					const resp = await onSinglePaymentSubmit(data);
					await mutateCart();
					if (resp) {
						next();
					}
				} else {
					await onMultiCreateOrEditSingle(data);
					await mutateCart();
				}
			} finally {
				setDisableSubmit(false);
			}
		},
		[multiplePayment, mutateCart, onMultiCreateOrEditSingle, onSinglePaymentSubmit, next]
	);

	const onCancel = useCallback(() => {
		multiplePayment ? setPaymentNumberToEdit(null) : back();
	}, [multiplePayment, setPaymentNumberToEdit, back]);

	return addressToEdit ? (
		<PaymentCreateEditAddress onSelect={onNamedValueChange} />
	) : (
		<Stack
			spacing={2}
			divider={<Divider />}
			component="form"
			ref={formRef}
			onSubmit={handleSubmit(onSubmit)}
			noValidate
		>
			<PaymentMethodSelection {...rest} onNamedValueChange={onNamedValueChange} />
			<PaymentAddressSelection {...rest} onNamedValueChange={onNamedValueChange} />
			<CheckOutFormActionsFooter
				onCancel={onCancel}
				submitLabel={multiplePayment ? addNewPaymentDone : labelNext}
				cancelLabel={multiplePayment ? cancelNewPayment : labelBack}
				disableSubmit={disableSubmit}
			/>
		</Stack>
	);
};
