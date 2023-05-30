/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { EMPTY_STRING } from '@/data/constants/marketing';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { NonSelfPickupType } from '@/data/types/CheckOut';
import { REG_EX } from '@/utils/address';
import { useForm } from '@/utils/useForm';
import { Typography, TextField } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

export const PickupNonSelfForm: FC = () => {
	const pickupNLS = useLocalization('Pickup');
	const { form } = useContext(ContentContext) as {
		form: ReturnType<typeof useForm<NonSelfPickupType>>;
	};
	const { error, handleInputChange, values } = form;
	const addressFormNLS = useLocalization('AddressForm');
	const helperText = useMemo(
		() => ({
			pickupPersonFullName: error.pickupPersonFullName
				? addressFormNLS.Msgs.InvalidFormat.t()
				: EMPTY_STRING,
			buyerFullName: error.buyerPersonFullName
				? addressFormNLS.Msgs.InvalidFormat.t()
				: EMPTY_STRING,
			email1: error.pickupPersonEmail ? addressFormNLS.Msgs.InvalidFormat.t() : EMPTY_STRING,
		}),
		[addressFormNLS, error]
	);
	return (
		<>
			<Typography>{pickupNLS.PickupPersonFullName.t()}</Typography>

			<TextField
				id="pickup-form-pickupPersonFullName"
				data-testid="pickup-form-pickupPersonFullName"
				name="pickupPersonFullName"
				onChange={handleInputChange}
				value={values.pickupPersonFullName}
				inputProps={{ maxLength: 80 }}
				fullWidth
				error={error.pickupPersonFullName}
				autocomplete-valid="pickupPersonFullName"
				required
			/>

			<Typography>{pickupNLS.PickupPersonEmail.t()}</Typography>

			<TextField
				required
				id="pickup-form-pickupPersonEmail"
				data-testid="pickup-form-pickupPersonEmail"
				name="pickupPersonEmail"
				type="pickupPersonEmail"
				onChange={handleInputChange}
				value={values.pickupPersonEmail}
				error={error.pickupPersonEmail}
				helperText={helperText.email1}
				inputProps={{ maxLength: 35, pattern: REG_EX.EMAIL.source }}
				fullWidth
				autocomplete-valid="pickupPersonEmail"
			/>

			<Typography>{pickupNLS.BuyerFullName.t()}</Typography>

			<TextField
				id="pickup-form-buyerPersonFullName"
				data-testid="pickup-form-buyerPersonFullName"
				name="buyerPersonFullName"
				onChange={handleInputChange}
				value={values.buyerPersonFullName}
				inputProps={{ maxLength: 80 }}
				fullWidth
				error={error.buyerPersonFullName}
				autocomplete-valid="buyerPersonFullName"
				required
			/>
		</>
	);
};
