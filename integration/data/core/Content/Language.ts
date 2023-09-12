/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { usePageDataFromId } from '@/data/_PageDataFromId';
import { DEFAULT_LANGUAGE } from '@/data/config/DEFAULTS';
import {
	LANGUAGE_MAP,
	REVERSE_LANGUAGE_MAP,
	SHORT_LANGUAGE_MAP,
} from '@/data/constants/environment';
import { LANGUAGE_SESSION_KEY, SLASH } from '@/data/constants/language';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { useLanguageState } from '@/data/state/useLanguageState';
import { useSessionState } from '@/data/state/useSessionState';
import { useMediaQuery, useTheme } from '@mui/material';
import { requestTranslation } from 'integration/generated/translations';
import { ParsedUrlQuery } from 'node:querystring';
import { useEffect, useMemo, useState } from 'react';

const createSessionId = () => Date.now().toString();
const DEFAULT_ENTRY = [EMPTY_STRING];
type LocaleRoutesType = ReturnType<typeof useLocalization<'Routes'>>;
export type LanguagePromptType = { open: boolean; langId?: string };

/**
 * Determines if current route is a static one and what its equivalent route in the target locale is
 * @param newLocale target locale (not current locale)
 * @param asPath current route
 * @param routes static routes in current locale
 * @returns if current route is static, returns current route's equivalent route in target locale,
 *          otherwise just returns the current route
 */
const findPathNameByLocale = async (
	newLocale: string,
	query: ParsedUrlQuery,
	routes: LocaleRoutesType
) => {
	const { path = [], ...rest } = query;
	const pathArray = Array.isArray(path) ? path : [path as string];
	const currentRoute = pathArray.length > 0 ? pathArray.at(-1) : undefined;
	const [pageName] =
		currentRoute !== undefined
			? Object.entries(routes).find(
					([_, value]) => typeof value === 'object' && value?.route.t() === currentRoute
			  ) ?? DEFAULT_ENTRY
			: DEFAULT_ENTRY;

	if (pageName !== EMPTY_STRING) {
		const routesForLanguage = await requestTranslation({ locale: newLocale, section: 'Routes' });
		const pageRoute = routesForLanguage[pageName] as Record<string, string>;
		const newPath = [...pathArray.slice(0, -1), pageRoute['route']];
		return { pathname: newPath.join(SLASH), query: rest };
	} else {
		return { pathname: pathArray.join(SLASH), query: rest };
	}
};

/**
 * This hook can only be called from HeaderLanguage component to make sure the useEffect only run once.
 */
export const useLanguage = () => {
	const localization = useLocalization('Language');
	const { settings } = useSettings();
	const { data: pageData } = usePageDataFromId();
	const pageLocale = useMemo(() => pageData?.language?.replaceAll('_', '-'), [pageData]);
	const { sessionData, actions: sessionActions } = useSessionState();
	const {
		language,
		actions: { saveLanguage, updateRejectedLanguage },
	} = useLanguageState();

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
	const [promptForSwitch, setPromptForSwitch] = useState<LanguagePromptType>({ open: false });

	const router = useNextRouter();
	const { query, locale } = router;
	const routes = useLocalization('Routes');

	const currentLanguage = useMemo(
		() =>
			REVERSE_LANGUAGE_MAP[locale as keyof typeof REVERSE_LANGUAGE_MAP] ??
			settings.defaultLanguage ??
			DEFAULT_LANGUAGE,
		[locale, settings.defaultLanguage]
	);

	const languageTitle = useMemo(
		() =>
			isMobile
				? SHORT_LANGUAGE_MAP[currentLanguage as keyof typeof SHORT_LANGUAGE_MAP].toLocaleUpperCase()
				: localization[currentLanguage as keyof typeof localization].t(),
		[currentLanguage, isMobile, localization]
	);

	const getSetSessionId = () => {
		let sessionId = sessionData[LANGUAGE_SESSION_KEY];
		if (!sessionId) {
			sessionId = createSessionId();
			sessionActions.saveSessionData({ [LANGUAGE_SESSION_KEY]: sessionId });
		}
		return sessionId;
	};

	const selectLanguage = (languageId: string) => async (_event: React.MouseEvent<HTMLElement>) => {
		const newLocale = LANGUAGE_MAP[languageId as keyof typeof LANGUAGE_MAP];
		if (newLocale !== locale) {
			const url = await findPathNameByLocale(newLocale, query, routes);
			router.push(url, undefined, { locale: newLocale });
			delete language.rejectedLocale[newLocale];
			updateRejectedLanguage(language.rejectedLocale);
			saveLanguage(newLocale, getSetSessionId() as string);
		}
		handleClose();
	};

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const yesAction = async () => {
		const newLocale = LANGUAGE_MAP[promptForSwitch.langId as keyof typeof LANGUAGE_MAP];
		saveLanguage(newLocale, getSetSessionId());
		const url = await findPathNameByLocale(newLocale, query, routes);
		router.push(url, undefined, { locale: newLocale });
		setPromptForSwitch(() => ({ open: false }));
	};

	const noAction = () => {
		const rejectedLocale = LANGUAGE_MAP[promptForSwitch.langId as keyof typeof LANGUAGE_MAP];
		updateRejectedLanguage({ ...language.rejectedLocale, [rejectedLocale]: true });
		setPromptForSwitch(() => ({ open: false }));
	};

	const onLocale = async () => {
		const siteLocale = LANGUAGE_MAP[settings.defaultLanguage as keyof typeof LANGUAGE_MAP];
		if (!language.locale) {
			// first landing into site (ever) -- set language to site default
			saveLanguage(siteLocale, '');
		}

		const desiredLocale = language.locale || siteLocale;
		if (desiredLocale) {
			// if site isn't in desired locale -- switch
			if (desiredLocale !== locale) {
				const url = await findPathNameByLocale(desiredLocale, query, routes);
				router.push(url, undefined, { locale: desiredLocale });
			} else if (
				pageLocale &&
				desiredLocale !== pageLocale &&
				language.sessionId !== sessionData[LANGUAGE_SESSION_KEY] &&
				!language.rejectedLocale[pageLocale]
			) {
				// check if current page's locale is different from desired locale and we haven't prompted
				//   user to switch before and this wasn't the session we switched to the desired locale --
				//   then prompt now
				setPromptForSwitch(() => ({
					open: true,
					langId: REVERSE_LANGUAGE_MAP[pageLocale as keyof typeof REVERSE_LANGUAGE_MAP],
				}));
			}
		}
	};

	useEffect(() => {
		window.addEventListener('touchmove', handleClose);
		return () => {
			window.removeEventListener('touchmove', handleClose);
		};
	}, []);

	useEffect(() => {
		onLocale();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [locale]);

	return {
		promptForSwitch,
		settings,
		localization,
		anchorEl,
		languageTitle,
		selectLanguage,
		handleClick,
		handleClose,
		yesAction,
		noAction,
	};
};
