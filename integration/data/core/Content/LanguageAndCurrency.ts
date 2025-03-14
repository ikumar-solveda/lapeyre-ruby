/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { EMPTY_STRING } from '@/data/constants/marketing';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import {
	languageAndCurrencyUpdater,
	LanguageCurrencyBody,
} from '@/data/Content/_LanguageAndCurrency';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useCartSWRKey } from '@/data/Content/Cart';
import { useConfigurations } from '@/data/Content/Configurations';
import { usePathNameByLocale } from '@/data/Content/PathNameByLocale';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { useSettings } from '@/data/Settings';
import {
	CONFIGURATION_IDS,
	CurrencyConfiguration,
	LanguageConfiguration,
} from '@/data/types/Configuration';
import { Globalization } from '@/data/types/UserContext';
import { useUser } from '@/data/User';
import { cartMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/cartMutatorKeyMatcher';
import { personMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/personMutatorKeyMatcher';
import { SelectChangeEvent } from '@mui/material';
import { FormEvent, useCallback, useMemo, useState } from 'react';
import { mutate } from 'swr';

/**
 * Custom React hook that provides language and currency related functionality.
 * It retrieves configurations, settings, user information, and router details
 * to manage language and currency preferences.
 *
 * @returns An object containing various functions and state variables related to language and currency.
 */
export const useLanguageAndCurrency = () => {
	const { configurations } = useConfigurations();
	const { localeName: locale } = useStoreLocale();
	const { settings } = useSettings();
	const { user } = useUser();
	const currentCartSWRKey = useCartSWRKey();
	const { query, push } = useNextRouter();
	const { path, ...restQuery } = query;
	const { storeId } = settings;
	const preferredCurrency = (user?.globalization as Globalization)?.preferredCurrency ?? '';
	const [selectedLocale, setSelectedLocale] = useState(locale);
	const [selectedCurrency, setSelectedCurrency] = useState(preferredCurrency);
	const [dialogOpen, setDialogOpen] = useState(false);
	const params = useExtraRequestParameters();
	const newPathname = usePathNameByLocale({ locale: selectedLocale });
	const supportedLanguages = useMemo(
		() =>
			(configurations?.[CONFIGURATION_IDS.SUPPORTED_LANGUAGES] ??
				[]) as unknown as LanguageConfiguration[],
		[configurations]
	);
	const supportedCurrencies = useMemo(
		() =>
			(configurations?.[CONFIGURATION_IDS.SUPPORTED_CURRENCIES] ??
				[]) as unknown as CurrencyConfiguration[],
		[configurations]
	);
	const currentLanguageConfig = useMemo(
		() => supportedLanguages.find((lang) => lang.localeName === locale),
		[locale, supportedLanguages]
	);
	const currentCurrencyConfig = useMemo(
		() => supportedCurrencies.find((currency) => currency.currencyCode === preferredCurrency),
		[preferredCurrency, supportedCurrencies]
	);

	const handleClose = useCallback(() => {
		setDialogOpen(false);
	}, []);

	const updateLanguageAndCurrencyPreferences = useCallback(async () => {
		const data: LanguageCurrencyBody = {
			langId: supportedLanguages.find((lang) => lang.localeName === selectedLocale)?.languageId,
			currency: selectedCurrency,
			URL: EMPTY_STRING,
		};
		await languageAndCurrencyUpdater()({ storeId, data, params });
		handleClose();
		if (selectedLocale !== locale) {
			await push({ pathname: newPathname, query: restQuery }, undefined, {
				locale: selectedLocale,
			});
		}
		mutate(personMutatorKeyMatcher(EMPTY_STRING), undefined);
		mutate(cartMutatorKeyMatcher(EMPTY_STRING));
		mutate(cartMutatorKeyMatcher(currentCartSWRKey), undefined); // cart in other languages
	}, [
		supportedLanguages,
		selectedCurrency,
		storeId,
		params,
		handleClose,
		selectedLocale,
		locale,
		currentCartSWRKey,
		push,
		newPathname,
		restQuery,
	]);

	const handleSelectChange = useCallback((event: SelectChangeEvent) => {
		const elm = event.target;
		const { name, value } = elm;
		if (name === 'locale') {
			setSelectedLocale(value);
		} else {
			setSelectedCurrency(value);
		}
	}, []);

	const handleOpen = useCallback(() => {
		setSelectedCurrency(preferredCurrency);
		setSelectedLocale(locale);
		setDialogOpen(true);
	}, [locale, preferredCurrency]);

	const handleSubmit = useCallback(
		async (event: FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			return await updateLanguageAndCurrencyPreferences();
		},
		[updateLanguageAndCurrencyPreferences]
	);

	const onSubmit = useCallback(
		async () => await updateLanguageAndCurrencyPreferences(),
		[updateLanguageAndCurrencyPreferences]
	);

	return {
		handleOpen,
		dialogOpen,
		handleSelectChange,
		selectedCurrency,
		selectedLocale,
		handleClose,
		supportedLanguages,
		supportedCurrencies,
		handleSubmit,
		onSubmit,
		currentLanguageConfig,
		currentCurrencyConfig,
	};
};
