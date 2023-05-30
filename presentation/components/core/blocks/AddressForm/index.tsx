/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { AddressFormActions } from '@/components/blocks/AddressForm/parts/Actions';
import { AddressFormFields } from '@/components/blocks/AddressForm/parts/Fields';
import { addressFormSX } from '@/components/blocks/AddressForm/styles/form';
import { useForm } from '@/utils/useForm';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { useCountry } from '@/data/Content/Country';
import { useLocalization } from '@/data/Localization';
import { EditableAddress, AddressFormActionLabels } from '@/data/types/Address';
import { Stack, Divider } from '@mui/material';
import { useMemo, FC } from 'react';

type Props = {
	addressInput: EditableAddress;
	showAddressType?: boolean;
	onSubmit: (address: EditableAddress) => void;
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
	const { values, handleAutoCompleteInputChange, handleInputChange, handleSubmit, error, formRef } =
		useForm<EditableAddress>(addressInput);
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

	return (
		<Stack
			spacing={2}
			divider={<Divider />}
			component="form"
			noValidate
			onSubmit={handleSubmit(onSubmit)}
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
			<AddressFormActions {...{ onCancel, submitLabel, cancelLabel }} />
		</Stack>
	);
};
