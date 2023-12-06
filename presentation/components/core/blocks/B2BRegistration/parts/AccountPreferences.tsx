/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { b2bRegistrationGridLeftSX } from '@/components/blocks/B2BRegistration/styles/gridLeft';
import { b2bRegistrationGridRightSX } from '@/components/blocks/B2BRegistration/styles/gridRight';
import { SelectWithResize } from '@/components/blocks/SelectWithResize';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ContentContext } from '@/data/context/content';
import { useForm } from '@/utils/useForm';
import { FormControl, Grid, InputLabel, MenuItem, Typography } from '@mui/material';
import { FC, useContext } from 'react';

type Props = {
	prefix?: string;
};
export const B2BRegistrationAccountPreferences: FC<Props> = ({ prefix = EMPTY_STRING }) => {
	const localization = useLocalization('BuyerUserRegistration');
	const { handleSelectChange, values, error } = useContext(ContentContext) as ReturnType<
		typeof useForm
	>;
	const { settings } = useSettings();
	const { supportedCurrencies, supportedLanguages } = settings;
	const { language: langLocale, currency: currencyLocale } = useLocalization('CommerceEnvironment');
	const langKey = `${prefix}preferredLanguage`;
	const currKey = `${prefix}preferredCurrency`;

	return (
		<>
			<Typography variant="h5">{localization.AccountPreferences.t()}</Typography>
			<Grid container>
				<Grid item xs={12} sm={6} sx={b2bRegistrationGridLeftSX}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel>{localization.Language.t()}</InputLabel>
						<SelectWithResize
							required
							data-testid="language"
							id="language"
							name={langKey}
							fullWidth
							value={(values?.[langKey] as string) ?? ''}
							error={error?.[langKey]}
							onChange={handleSelectChange}
						>
							{supportedLanguages.map((languageId) => (
								<MenuItem value={languageId} key={languageId}>
									{langLocale[languageId as keyof typeof langLocale].t()}
								</MenuItem>
							))}
						</SelectWithResize>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6} sx={b2bRegistrationGridRightSX}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel>{localization.Currency.t()}</InputLabel>
						<SelectWithResize
							required
							data-testid="currency"
							id="currency"
							name={currKey}
							fullWidth
							value={(values?.[currKey] as string) ?? ''}
							error={error?.[currKey]}
							onChange={handleSelectChange}
						>
							{supportedCurrencies?.map((currency) => (
								<MenuItem value={currency} key={currency}>
									{currencyLocale[currency as keyof typeof currencyLocale].t()}
								</MenuItem>
							))}
						</SelectWithResize>
					</FormControl>
				</Grid>
			</Grid>
		</>
	);
};
