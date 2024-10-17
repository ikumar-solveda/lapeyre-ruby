/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { EMPTY_STRING } from '@/data/constants/marketing';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useCartSWRKey } from '@/data/Content/Cart';
import { personMutatorKeyMatcher } from '@/data/Content/Login';
import { usePathNameByLocale } from '@/data/Content/PathNameByLocale';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { useSettings } from '@/data/Settings';
import { CONFIGURATION_IDS } from '@/data/types/Configuration';
import { Globalization } from '@/data/types/UserContext';
import { useUser } from '@/data/User';
import { cartMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/cartMutatorKeyMatcher';
import { useCallback, useMemo } from 'react';
import { mutate } from 'swr';

export const useLocaleValidation = () => {
	const { settings } = useSettings();
	const { user } = useUser();
	const currentCartSWRKey = useCartSWRKey();
	const router = useNextRouter();
	const { localeName: currentLocale } = useStoreLocale();
	const { query } = router;
	const { path, ...restQuery } = query;
	const preferredLanguageId = (user?.globalization as Globalization)?.preferredLanguageId ?? '';
	const storeSupportedLanguages = useMemo(
		() => settings[CONFIGURATION_IDS.SUPPORTED_LANGUAGES] ?? [],
		[settings]
	);

	const userPreferredLocale = useMemo(
		() =>
			storeSupportedLanguages.find((conf) => conf.languageId === preferredLanguageId.toString())
				?.localeName ?? '',
		[preferredLanguageId, storeSupportedLanguages]
	);
	const newPathname = usePathNameByLocale({ locale: userPreferredLocale });

	/**
	 * ONLY use after the shopper login.
	 *
	 * Updates the locale route based on the user's preferred locale and the current page name.
	 * If the current locale is different from the user's preferred locale,
	 * it generates a new route identifier using the preferred locale and navigates to that route.
	 * @returns {boolean} - Returns true if the locale route was updated, false otherwise.
	 */
	const validateAndUpdateLocale = useCallback(async () => {
		if (currentLocale !== userPreferredLocale) {
			await router.push({ pathname: newPathname, query: restQuery }, undefined, {
				locale: userPreferredLocale,
			});
			await mutate(personMutatorKeyMatcher(EMPTY_STRING), undefined);
			await mutate(cartMutatorKeyMatcher(EMPTY_STRING));
			await mutate(cartMutatorKeyMatcher(currentCartSWRKey), undefined); // cart in other languages
		}
	}, [currentCartSWRKey, currentLocale, newPathname, restQuery, router, userPreferredLocale]);

	return {
		validateAndUpdateLocale,
	};
};
