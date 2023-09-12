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
import { FormEvent, useCallback, useContext, useMemo } from 'react';

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
		validatePO,
		validateMulti,
		setMethodError,
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
	const { formRef, handleSubmit, onNamedValueChange, submitting, ...rest } = useForm(form);
	const { Actions: paymentActions } = useLocalization('Payment');
	const { Actions } = useLocalization('PaymentMethodContainer');
	const labelNext = useMemo(() => paymentActions.Next.t(), [paymentActions]);
	const labelBack = useMemo(
		() => (bopisSelected ? paymentActions.BackToPickup.t() : paymentActions.Back.t()),
		[paymentActions, bopisSelected]
	);
	const cancelNewPayment = useMemo(() => Actions.Cancel.t(), [Actions]);
	const addNewPaymentDone = useMemo(() => Actions.Done.t(), [Actions]);

	const onSubmit = useCallback(
		async (data: PaymentToEdit) => {
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
		},
		[multiplePayment, mutateCart, onMultiCreateOrEditSingle, onSinglePaymentSubmit, next]
	);

	const onCancel = useCallback(() => {
		setMethodError(undefined);
		multiplePayment ? setPaymentNumberToEdit(null) : back();
	}, [setMethodError, multiplePayment, setPaymentNumberToEdit, back]);

	const onSubmitWrapper = useCallback(
		(event: FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			if (validateMulti(multiplePayment, rest.values) && validatePO()) {
				handleSubmit(onSubmit)(event);
			}
		},
		[handleSubmit, onSubmit, validateMulti, validatePO, multiplePayment, rest.values]
	);

	return addressToEdit ? (
		<PaymentCreateEditAddress onSelect={onNamedValueChange} />
	) : (
		<Stack
			spacing={2}
			divider={<Divider />}
			component="form"
			ref={formRef}
			onSubmit={onSubmitWrapper}
			noValidate
		>
			<PaymentMethodSelection {...rest} onNamedValueChange={onNamedValueChange} />
			<PaymentAddressSelection {...rest} onNamedValueChange={onNamedValueChange} />
			<CheckOutFormActionsFooter
				onCancel={onCancel}
				submitLabel={multiplePayment ? addNewPaymentDone : labelNext}
				cancelLabel={multiplePayment ? cancelNewPayment : labelBack}
				disableSubmit={submitting}
			/>
		</Stack>
	);
};
