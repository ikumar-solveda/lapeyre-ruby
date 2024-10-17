/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { CheckOutV2FormActionsFooter } from '@/components/content/CheckOutV2/parts/FormActionFooter';
import { CheckOutV2PaymentAddressSelection } from '@/components/content/CheckOutV2/parts/Payment/AddressSelection';
import { CheckOutV2PaymentCreateEditAddress } from '@/components/content/CheckOutV2/parts/Payment/CreateEditAddress';
import { CheckOutV2PaymentMethodSelection } from '@/components/content/CheckOutV2/parts/Payment/MethodSelection';
import { useCheckOutV2 } from '@/data/Content/CheckOutV2';
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

export const CheckOutV2PaymentSelection = () => {
	const {
		multiplePayment,
		setPaymentNumberToEdit,
		onSinglePaymentSubmit,
		onMultiCreateOrEditSingle,
		addressToEdit,
		next,
		back,
		cart,
		paymentsToEdit,
		paymentNumberToEdit,
		validatePO,
		validateMulti,
		setMethodError,
		steps,
		activeStep,
	} = useContext(ContentContext) as ReturnType<typeof useCheckOutV2> &
		ReturnType<typeof usePayment>;
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
	const paymentMethodContainerNLS = useLocalization('PaymentMethodContainer');
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
	const cancelNewPayment = useMemo(
		() => paymentMethodContainerNLS.Actions.Cancel.t(),
		[paymentMethodContainerNLS]
	);
	const addNewPaymentDone = useMemo(
		() => paymentMethodContainerNLS.Actions.Done.t(),
		[paymentMethodContainerNLS]
	);

	const onSubmit = useCallback(
		async (data: PaymentToEdit) => {
			if (!multiplePayment) {
				const resp = await onSinglePaymentSubmit(data);
				if (resp) {
					next();
				}
			} else {
				await onMultiCreateOrEditSingle(data);
			}
		},
		[multiplePayment, onMultiCreateOrEditSingle, onSinglePaymentSubmit, next]
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
		<CheckOutV2PaymentCreateEditAddress onSelect={onNamedValueChange} />
	) : (
		<Stack
			spacing={2}
			divider={<Divider />}
			component="form"
			ref={formRef}
			onSubmit={onSubmitWrapper}
			noValidate
		>
			<CheckOutV2PaymentMethodSelection {...rest} onNamedValueChange={onNamedValueChange} />
			<CheckOutV2PaymentAddressSelection {...rest} onNamedValueChange={onNamedValueChange} />
			<CheckOutV2FormActionsFooter
				onCancel={onCancel}
				submitLabel={multiplePayment ? addNewPaymentDone : labelNext}
				cancelLabel={multiplePayment ? cancelNewPayment : labelBack}
				disableSubmit={submitting}
			/>
		</Stack>
	);
};
