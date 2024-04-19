/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { AddressFormActions } from '@/components/blocks/AddressForm/parts/Actions';
import { AddressFormFields } from '@/components/blocks/AddressForm/parts/Fields';
import { addressFormSX } from '@/components/blocks/AddressForm/styles/form';
import { VerifiedAddress } from '@/components/content/VerifiedAddress';
import { useContactVerifiedAddress } from '@/data/Content/ContactVerifiedAddress';
import { useCountry } from '@/data/Content/Country';
import { useLocalization } from '@/data/Localization';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ContentProvider } from '@/data/context/content';
import {
	AddressFormActionLabels,
	EditableAddress,
	MappedAddressInfo,
	VerifyCallbackFunc,
} from '@/data/types/Address';
import { useForm } from '@/utils/useForm';
import { Divider, Stack } from '@mui/material';
import { FC, useCallback, useMemo } from 'react';

type Props = {
	addressInput: EditableAddress;
	showAddressType?: boolean;
	onSubmit: (address: EditableAddress) => Promise<
		| {
				validatedAddresses: MappedAddressInfo[];
				editingAddress: EditableAddress;
				callback: VerifyCallbackFunc<EditableAddress>;
		  }
		| undefined
	>;
	onCancel?: () => void;
	submitLabel: AddressFormActionLabels;
	cancelLabel?: AddressFormActionLabels;
	formLabel?: JSX.Element;
};

export const AddressForm: FC<Props> = ({
	addressInput,
	showAddressType = false,
	onSubmit,
	onCancel,
	submitLabel,
	cancelLabel,
	formLabel,
}) => {
	const {
		values,
		handleAutoCompleteInputChange,
		handleInputChange,
		handleSubmit,
		error,
		formRef,
		submitting,
	} = useForm<EditableAddress>(addressInput);
	const nickNameDisabled = useMemo(() => Boolean(addressInput.nickName), [addressInput]);
	const addressFormNLS = useLocalization('AddressForm');
	const { countries } = useCountry();
	const states = useMemo(
		() => countries.find((c) => c.displayName === values.country)?.states ?? [],
		[values.country, countries]
	);
	const helperText = useMemo(
		() => ({
			nickName: error.nickName ? addressFormNLS.Msgs.InvalidAddressName.t() : EMPTY_STRING,
			phone1: error.phone1 ? addressFormNLS.Msgs.InvalidFormat.t() : EMPTY_STRING,
			email1: error.email1 ? addressFormNLS.Msgs.InvalidFormat.t() : EMPTY_STRING,
		}),
		[addressFormNLS, error]
	);

	const verifiedAddressValues = useContactVerifiedAddress();
	const handleVerifyAddress = verifiedAddressValues.handleVerifyAddress;
	const onVerifyAddress = useCallback(
		async (address: EditableAddress) => {
			const submitValues = await onSubmit(address);
			if (submitValues) {
				handleVerifyAddress(submitValues);
			}
		},
		[onSubmit, handleVerifyAddress]
	);

	return (
		<Stack
			spacing={2}
			divider={<Divider />}
			component="form"
			noValidate
			onSubmit={handleSubmit(onVerifyAddress)}
			ref={formRef}
			sx={addressFormSX}
		>
			<AddressFormFields
				{...{
					address: values,
					handleAutoCompleteInputChange,
					handleChange: handleInputChange,
					nickNameDisabled,
					error,
					countries,
					states,
					helperText,
					showAddressType,
					formLabel,
				}}
			/>
			<AddressFormActions {...{ onCancel, submitLabel, cancelLabel, submitting }} />
			<ContentProvider value={verifiedAddressValues}>
				<VerifiedAddress />
			</ContentProvider>
		</Stack>
	);
};
0;
