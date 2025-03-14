/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { getSettings } from '@/data/Settings-Server';
import { getUser } from '@/data/User-Server';
import { Settings } from '@/data/_Settings';
import { NEXT_DEFAULT_LOCALE } from '@/data/config/DEFAULTS';
import { Cache } from '@/data/types/Cache';
import { CONFIGURATION_IDS } from '@/data/types/Configuration';
import { TranslatableRoute } from '@/data/types/Route';
import { Globalization } from '@/data/types/UserContext';
import { encodeRedirectPath } from '@/data/utils/encodeRedirectPath';
import { getIdFromPath } from '@/data/utils/getIdFromPath';
import { getRequestId } from '@/data/utils/getRequestId';
import { isLocaleSensitiveRequest } from '@/data/utils/isLocaleSensitiveRequest';
import { traceWithId } from '@/data/utils/loggerUtil';
import { routeToPage } from 'integration/generated/routeToPageMap';
import { requestTranslation } from 'integration/generated/translations';
import { GetServerSidePropsContext } from 'next';

/**
 * A locale is supported if it is the default locale(`NEXT_DEFAULT_LOCALE`) or it is one of the supported languages.
 */
const isLocaleSupported = async ({ settings, locale }: { settings: Settings; locale?: string }) => {
	traceWithId(undefined, 'isLocaleSupported: entering', { locale });
	const { [CONFIGURATION_IDS.SUPPORTED_LANGUAGES]: supportedLanguages = [] } = settings;
	const supported =
		locale === NEXT_DEFAULT_LOCALE ||
		supportedLanguages.some((lang) => lang.localeName === locale?.toLowerCase());
	traceWithId(undefined, 'isLocaleSupported: exiting', { supported });
	return supported;
};

const findPreferredLocale = async ({
	settings,
	preferredLanguageId,
}: {
	settings: Settings;
	preferredLanguageId?: string;
}) => {
	const {
		[CONFIGURATION_IDS.SUPPORTED_LANGUAGES]: storeSupportedLanguages = [],
		[CONFIGURATION_IDS.DEFAULT_LANGUAGE]: storeDefaultLanguage = [],
	} = settings;
	return preferredLanguageId
		? storeSupportedLanguages.find((attr) => attr.languageId === preferredLanguageId.toString())
				?.localeName
		: storeDefaultLanguage.at(0)?.localeName;
};

/**
 * Retrieves the new static path identifier based on the current path identifier from the new locale
 * in Static Routes definitions.
 * @param currentPathIdentifier - The current path identifier.
 * @param newLocale - The new locale.
 * @returns The new path identifier if it is a static route and the new locale is different from the
 * locale that the current path identifier belongs to, otherwise undefined.
 */
const findPreferredLocalePathIdentifier = async (
	currentPathIdentifier: string,
	newLocale?: string
) => {
	const pageAndLocales = routeToPage[encodeRedirectPath(currentPathIdentifier)];
	if (newLocale && pageAndLocales) {
		const sameRoute = pageAndLocales.find((page) => page.locale === newLocale);
		if (sameRoute) {
			return currentPathIdentifier; // different locales sharing same translated route
		} else {
			const pageName = pageAndLocales[0].pageName;
			const routes = await requestTranslation({ locale: newLocale, section: 'Routes' });
			return (routes[pageName] as TranslatableRoute)?.route;
		}
	}
	return undefined;
};

const validateLocaleInternal = async (
	cache: Cache,
	context: GetServerSidePropsContext,
	skip = false
) => {
	if (!isLocaleSensitiveRequest(context.req)) {
		return undefined;
	}
	const settings = await getSettings(cache, context);
	const locale = context.locale;
	const isSupported = await isLocaleSupported({ settings, locale });
	if (isSupported) {
		// Only process supported locales
		if (skip || locale !== NEXT_DEFAULT_LOCALE || settings.supportedLanguages.length === 1) {
			/**
			 * Skip changing locale if:
			 * - `skip` is true, or
			 * - locale is not default, or
			 * - store has only one supported language
			 */
			return undefined;
		} else {
			/**
			 * Redirect to store default locale or user preferred locale if the locale is `default`(`NEXT_DEFAULT_LOCALE`).
			 */
			const { storeToken } = settings;
			const user = await getUser(cache, context);
			const preferredLanguageId = (
				user?.globalization as Globalization
			)?.preferredLanguageId?.toString();
			const preferredLocale = await findPreferredLocale({ settings, preferredLanguageId });
			const identifier = getIdFromPath(context.query.path, storeToken);
			const newPathIdentifier = await findPreferredLocalePathIdentifier(
				identifier,
				preferredLocale
			);
			const resolvedUrl = newPathIdentifier
				? context.resolvedUrl.replace(
						encodeRedirectPath(identifier),
						encodeRedirectPath(newPathIdentifier)
				  )
				: context.resolvedUrl === '/'
				? ''
				: context.resolvedUrl;
			return preferredLocale
				? {
						redirect: {
							destination: `/${preferredLocale}${resolvedUrl}`,
							permanent: false,
						},
				  }
				: undefined;
		}
	} else {
		// NOT FOUND if the locale is not supported by the store
		return {
			notFound: true,
		};
	}
};

/**
 * Verifies the locale and performs necessary actions based on the locale.
 * @param cache - The cache object.
 * @param context - The GetServerSidePropsContext object.
 * @param skip - Optional parameter to skip the verification process.
 * @returns If the locale is default and requires redirection to store default locale or user
 * 					preferred locale, returns an object with redirect information.
 * 					If locale is not supported by the store, return NOT FOUND.
 * 					Skip process if locale is not 'default', only one supported language for the store, returns undefined.
 */
export const validateLocale = async (
	cache: Cache,
	context: GetServerSidePropsContext,
	skip = false
) => {
	traceWithId(getRequestId(context), 'validateLocale: entering', { skip });
	const validatedLocale = await validateLocaleInternal(cache, context, skip);
	traceWithId(getRequestId(context), 'validateLocale: exiting', { validatedLocale });
	return validatedLocale;
};
