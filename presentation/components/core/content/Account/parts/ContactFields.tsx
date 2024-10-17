/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { IfTrue } from '@/components/blocks/IfTrue';
import { SelectWithResize } from '@/components/blocks/SelectWithResize';
import { EditablePersonInfo } from '@/data/Content/PersonInfo';
import { useLocalization } from '@/data/Localization';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { CurrencyConfiguration, LanguageConfiguration } from '@/data/types/Configuration';
import { REG_EX } from '@/utils/address';
import { ErrorState } from '@/utils/useForm';
import {
	FormControl,
	InputLabel,
	MenuItem,
	SelectChangeEvent,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { isEmpty, noop } from 'lodash';
import { ChangeEvent, FC, useMemo } from 'react';

type Props = {
	values: EditablePersonInfo;
	handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
	handleSelectChange?: (event: SelectChangeEvent) => void;
	handleLanguageSelectChange?: (event: SelectChangeEvent) => void;
	supportedCurrencies?: CurrencyConfiguration[];
	supportedLanguages?: LanguageConfiguration[];
	error: ErrorState<EditablePersonInfo>;
};

export const AccountContactFields: FC<Props> = ({
	values,
	handleInputChange,
	handleSelectChange = noop, // noop is not passed in
	handleLanguageSelectChange = noop, // noop is not passed in
	supportedCurrencies = [],
	supportedLanguages = [],
	error,
}) => {
	const MyAccountLabels = useLocalization('MyAccount');
	const addressFormNLS = useLocalization('AddressForm');
	const hasSupportedLanguages = !isEmpty(supportedLanguages);
	const hasSupportedCurrencies = !isEmpty(supportedCurrencies);
	const helperText = useMemo(
		() => ({
			phone1: error.phone1 ? addressFormNLS.Msgs.InvalidFormat.t() : EMPTY_STRING,
			email1: error.email1 ? addressFormNLS.Msgs.InvalidFormat.t() : EMPTY_STRING,
		}),
		[addressFormNLS, error]
	);
	return (
		<Stack spacing={2}>
			<Typography variant="subtitle1" component="h4">
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
			<IfTrue condition={hasSupportedLanguages}>
				<FormControl variant="outlined" fullWidth error={error.preferredLanguage}>
					<InputLabel>{addressFormNLS.Labels.PreferredLanguage.t()}</InputLabel>
					<SelectWithResize
						required
						data-testid="language"
						id="language"
						name="preferredLanguage"
						fullWidth
						value={values.preferredLanguage}
						onChange={handleLanguageSelectChange}
						inputProps={{ placeholder: addressFormNLS.Labels.SelectPreferredLanguage.t() }}
					>
						{supportedLanguages.map((language) => (
							<MenuItem value={language.languageId} key={language.languageId}>
								{language.languageDescription}
							</MenuItem>
						))}
					</SelectWithResize>
				</FormControl>
			</IfTrue>
			<IfTrue condition={hasSupportedCurrencies}>
				<FormControl variant="outlined" fullWidth error={error.preferredCurrency}>
					<InputLabel>{addressFormNLS.Labels.PreferredCurrency.t()}</InputLabel>
					<SelectWithResize
						required
						data-testid="currency"
						id="currency"
						name="preferredCurrency"
						fullWidth
						value={values.preferredCurrency}
						onChange={handleSelectChange}
						inputProps={{ placeholder: addressFormNLS.Labels.SelectPreferredCurrency.t() }}
					>
						{supportedCurrencies.map((currency) => (
							<MenuItem value={currency.currencyCode} key={currency.currencyCode}>
								{currency.currencyDescription}
							</MenuItem>
						))}
					</SelectWithResize>
				</FormControl>
			</IfTrue>
		</Stack>
	);
};
