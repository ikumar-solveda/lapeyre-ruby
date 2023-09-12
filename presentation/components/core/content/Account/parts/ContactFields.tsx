/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { EditablePersonInfo } from '@/data/Content/PersonInfo';
import { useLocalization } from '@/data/Localization';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { REG_EX } from '@/utils/address';
import { ErrorState } from '@/utils/useForm';
import { Stack, TextField, Typography } from '@mui/material';
import { ChangeEvent, FC, useMemo } from 'react';

type Props = {
	values: EditablePersonInfo;
	handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
	error: ErrorState<EditablePersonInfo>;
};

export const AccountContactFields: FC<Props> = ({ values, handleInputChange, error }) => {
	const MyAccountLabels = useLocalization('MyAccount');
	const addressFormNLS = useLocalization('AddressForm');
	const helperText = useMemo(
		() => ({
			phone1: error.phone1 ? addressFormNLS.Msgs.InvalidFormat.t() : EMPTY_STRING,
			email1: error.email1 ? addressFormNLS.Msgs.InvalidFormat.t() : EMPTY_STRING,
		}),
		[addressFormNLS, error]
	);
	return (
		<Stack spacing={2}>
			<Typography variant="h5" component="h4">
				{MyAccountLabels.ContactInformation.t()}
			</Typography>
			<TextField
				id="address-form-firstName"
				data-testid="address-form-firstName"
				name="firstName"
				label={addressFormNLS.Labels.FirstName.t()}
				onChange={handleInputChange}
				value={values.firstName}
				inputProps={{ maxLength: 40 }}
				fullWidth
				error={error.firstName}
				autoComplete="given-name"
				required
			/>
			<TextField
				required
				id="address-form-lastName"
				data-testid="address-form-lastName"
				name="lastName"
				error={error.lastName}
				label={addressFormNLS.Labels.LastName.t()}
				onChange={handleInputChange}
				value={values.lastName}
				inputProps={{ maxLength: 40 }}
				fullWidth
				autoComplete="family-name"
			/>
			<TextField
				required
				id="address-form-email"
				data-testid="address-form-email"
				name="email1"
				type="email"
				label={addressFormNLS.Labels.Email.t()}
				onChange={handleInputChange}
				value={values.email1}
				error={error.email1}
				helperText={helperText.email1}
				inputProps={{ maxLength: 35, pattern: REG_EX.EMAIL.source, placeholder: 'name@domain.com' }}
				fullWidth
				autoComplete="email"
			/>
			<TextField
				id="address-form-phone1"
				name="phone1"
				type="tel"
				data-testid="address-form-phone1"
				label={addressFormNLS.Labels.Phone.t()}
				onChange={handleInputChange}
				value={values.phone1}
				error={error.phone1}
				helperText={helperText.phone1}
				inputProps={{ maxLength: 32, pattern: REG_EX.PHONE.source }}
				fullWidth
				autoComplete="tel"
			/>
		</Stack>
	);
};
