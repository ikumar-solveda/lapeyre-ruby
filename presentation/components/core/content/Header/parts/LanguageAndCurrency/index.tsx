/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { IfTrue } from '@/components/blocks/IfTrue';
import { LanguageAndCurrencySelectionDialog } from '@/components/content/Header/parts/LanguageAndCurrency/parts/SelectionDialog';
import { headerLanguageAndCurrencyButtonSX } from '@/components/content/Header/styles/languageAndCurrency/button';
import { headerLinkSX } from '@/components/content/Header/styles/link';
import { useLanguageAndCurrency } from '@/data/Content/LanguageAndCurrency';
import { useLocaleValidation } from '@/data/Content/LocaleValidation';
import { ContentProvider } from '@/data/context/content';
import { ValidateLocaleRequestContext } from '@/data/context/validateLocaleRequest';
import { useLocalization } from '@/data/Localization';
import { useUser } from '@/data/User';
import { combineSX } from '@/utils/combineSX';
import LanguageIcon from '@mui/icons-material/Language';
import { Button, Stack, Typography, useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';

import { useContext, useEffect, useMemo } from 'react';

export const HeaderLanguageAndCurrency = () => {
	const { user } = useUser();
	const { isLoggedIn } = user || {};
	const isNotMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.up('md'));
	const useLanguageAndCurrencyValue = useLanguageAndCurrency();
	const { validateAndUpdateLocale } = useLocaleValidation();
	const { handleOpen, currentCurrencyConfig, currentLanguageConfig } = useLanguageAndCurrencyValue;

	const nls = useLocalization('LanguageAndCurrency');
	const title = useMemo(() => {
		if (currentCurrencyConfig && currentLanguageConfig) {
			const { language, country: region } = currentLanguageConfig;
			const { currencyCode } = currentCurrencyConfig;
			return nls.SelectedLanguageCurrencyWithRegion.t({
				language: language.toUpperCase(),
				region,
				currencyCode,
			});
		} else {
			return nls.LanguageCurrency.t();
		}
	}, [nls, currentCurrencyConfig, currentLanguageConfig]);
	const ariaDescription = useMemo(() => {
		if (currentCurrencyConfig && currentLanguageConfig) {
			const { languageDescription } = currentLanguageConfig;
			const { currencyDescription } = currentCurrencyConfig;
			return nls.AriraDescription.t({
				language: languageDescription,
				currency: currencyDescription,
			});
		} else {
			return nls.LanguageCurrency.t();
		}
	}, [nls, currentCurrencyConfig, currentLanguageConfig]);

	const { setValidateRequested, validateRequested } = useContext(ValidateLocaleRequestContext);

	useEffect(() => {
		if (isLoggedIn && validateRequested) {
			validateAndUpdateLocale();
			setValidateRequested(false);
		}
	}, [isLoggedIn, setValidateRequested, validateAndUpdateLocale, validateRequested]);

	return (
		<ContentProvider value={useLanguageAndCurrencyValue}>
			<Typography variant="spanacce" id="language-and-currency-button-description">
				{ariaDescription}
			</Typography>
			<Button
				id="language-and-currency-button"
				data-testid="language-and-currency-button"
				aria-describedby="language-and-currency-button-description"
				component="a"
				sx={combineSX([headerLinkSX, headerLanguageAndCurrencyButtonSX])}
				onClick={handleOpen}
				title={title}
			>
				<Stack alignItems="center" component="span">
					<LanguageIcon />
					<IfTrue condition={isNotMobile}>
						<Typography component="span">{title}</Typography>
					</IfTrue>
				</Stack>
			</Button>
			<LanguageAndCurrencySelectionDialog />
		</ContentProvider>
	);
};
