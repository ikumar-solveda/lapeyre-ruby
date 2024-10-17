/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { EMPTY_STRING } from '@/data/constants/marketing';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { SelfPickupType } from '@/data/types/CheckOut';
import { REG_EX } from '@/utils/address';
import { useForm } from '@/utils/useForm';
import { TextField, Typography } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

export const CheckOutV2PickupSelfForm: FC = () => {
	const pickupNLS = useLocalization('Pickup');
	const addressFormNLS = useLocalization('AddressForm');
	const { form } = useContext(ContentContext) as {
		form: ReturnType<typeof useForm<SelfPickupType>>;
	};
	const { error, handleInputChange, values } = form;
	const helperText = useMemo(
		() => ({
			firstName: error.firstName ? addressFormNLS.Msgs.InvalidFormat.t() : EMPTY_STRING,
			lastName: error.lastName ? addressFormNLS.Msgs.InvalidFormat.t() : EMPTY_STRING,
			phone1: error.phone ? addressFormNLS.Msgs.InvalidFormat.t() : EMPTY_STRING,
			email1: error.email ? addressFormNLS.Msgs.InvalidFormat.t() : EMPTY_STRING,
		}),
		[addressFormNLS, error]
	);
	return (
		<>
			<Typography>{pickupNLS.FirstName.t()}</Typography>

			<TextField
				id="pickup-form-firstName"
				data-testid="pickup-form-firstName"
				name="firstName"
				onChange={handleInputChange}
				value={values.firstName}
				inputProps={{ maxLength: 40 }}
				fullWidth
				error={error.firstName}
				autocomplete-valid="given-name"
				required
			/>

			<Typography>{pickupNLS.LastName.t()}</Typography>

			<TextField
				required
				id="pickup-form-lastName"
				data-testid="pickup-form-lastName"
				name="lastName"
				error={error.lastName}
				onChange={handleInputChange}
				value={values.lastName}
				inputProps={{ maxLength: 40 }}
				fullWidth
				autocomplete-valid="family-name"
			/>

			<Typography>{pickupNLS.Email.t()}</Typography>

			<TextField
				required
				id="pickup-form-email"
				data-testid="pickup-form-email"
				name="email"
				type="email"
				onChange={handleInputChange}
				value={values.email}
				error={error.email}
				helperText={helperText.email1}
				inputProps={{ maxLength: 35, pattern: REG_EX.EMAIL.source }}
				fullWidth
				autocomplete-valid="email"
			/>

			<Typography>{pickupNLS.Phone.t()}</Typography>

			<TextField
				required
				id="pickup-form-phone"
				data-testid="pickup-form-phone"
				name="phone"
				type="tel"
				onChange={handleInputChange}
				value={values.phone}
				error={error.phone}
				helperText={helperText.phone1}
				inputProps={{ maxLength: 32, pattern: REG_EX.PHONE.source }}
				fullWidth
				autocomplete-valid="tel"
			/>
		</>
	);
};
