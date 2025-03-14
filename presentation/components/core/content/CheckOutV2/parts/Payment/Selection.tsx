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
import { useShipping } from '@/data/Content/Shipping';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { PaymentInstruction, PaymentToEdit } from '@/data/types/Order';
import { validateAddress } from '@/utils/address';
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
		billingAddressMap,
		primaryBillingAddress,
		updateShippingInfoAfterAddressEdit,
	} = useContext(ContentContext) as ReturnType<typeof useCheckOutV2> &
		ReturnType<typeof usePayment> &
		ReturnType<typeof useShipping>;
	const form = useMemo(() => {
		const toEdit = paymentsToEdit.at(paymentNumberToEdit ?? 0);
		const pi = primaryBillingAddress
			? { billing_address_id: primaryBillingAddress?.addressId }
			: undefined;
		const blank = getPaymentToEdit(pi as PaymentInstruction);
		return multiplePayment
			? toEdit ?? blank
			: paymentsToEdit.length === 1
			? markSinglePaymentDirtyIfNeeded(toEdit ?? blank, cart.grandTotal)
			: blank;
	}, [
		paymentsToEdit,
		paymentNumberToEdit,
		primaryBillingAddress,
		multiplePayment,
		cart.grandTotal,
	]);
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
			if (!rest.values.policyId && rest.setError) {
				rest.setError({ ...rest.error, policyId: true });
			} else {
				const selectedBillingAddress = Object.values(billingAddressMap).find(
					(address) => rest.values.billing_address_id === address?.addressId
				);
				if (
					validateAddress(selectedBillingAddress) &&
					validateMulti(multiplePayment, rest.values) &&
					validatePO()
				) {
					handleSubmit(onSubmit)(event);
				}
			}
		},
		[billingAddressMap, validateMulti, multiplePayment, rest, validatePO, handleSubmit, onSubmit]
	);

	const updateShippingInformation = useCallback(
		(name: keyof PaymentToEdit, _addressId: string) => {
			updateShippingInfoAfterAddressEdit({
				addressId: _addressId,
				nickName: addressToEdit?.nickName,
			});
			onNamedValueChange(name, _addressId);
		},
		[addressToEdit?.nickName, onNamedValueChange, updateShippingInfoAfterAddressEdit]
	);

	return addressToEdit ? (
		<CheckOutV2PaymentCreateEditAddress onSelect={updateShippingInformation} />
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
