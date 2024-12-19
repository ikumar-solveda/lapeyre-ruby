/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { Settings } from '@/data/Settings';
import { User } from '@/data/User';
import { dataRouteManifest, dataRouteProtection } from '@/data/containers/manifest';
import { Order } from '@/data/types/Order';
import { PageDataFromId } from '@/data/types/PageDataFromId';
import { getTranslationKeyFromPath } from '@/data/utils/getTranslationKeyFromPath';
import { TranslationTable, requestTranslation } from 'integration/generated/translations';
import { ParsedUrlQuery } from 'querystring';

type PageDataLookupProps = {
	pub: boolean;
	path: ParsedUrlQuery['path'];
	localeId: string; // localeId is the languageId
	user: Partial<User>;
	cart?: Order | boolean; // boolean represent having cart or not
	settings?: Settings;
	locale?: string;
};

type ProtectedRouteGetter = {
	translations: Awaited<ReturnType<typeof requestTranslation>>;
	user: Partial<User>;
	translateKey?: string;
	cart?: Order | boolean;
	settings?: Settings;
};

type LocalRoutes = TranslationTable['Routes'];
const TAUTOLOGY = () => ({ allowed: true, redirectToRoute: undefined, redirectToUrl: undefined });
const SESSION_ERROR = { allowed: false, redirectToRoute: 'SessionError', redirectToUrl: undefined };

// Handle server side session error here, redirect to session error page and clear cookie if there is session error.
const resolveRedirect = (
	user: Partial<User>,
	translateKey: keyof LocalRoutes,
	cart?: Order | boolean,
	settings?: Settings
) =>
	user.sessionError
		? SESSION_ERROR
		: ((translateKey && dataRouteProtection[translateKey]) || TAUTOLOGY)(user, cart, settings);
/**
 * Returns the redirect information from route protection if it exists.
 */
const getProtectedRouteKey = ({
	translations,
	user,
	translateKey,
	cart,
	settings,
}: ProtectedRouteGetter): { translateKey?: string; redirect?: string } => {
	const hasCart = typeof cart === 'boolean' ? cart : !!cart?.orderItem;
	const { allowed, redirectToRoute, redirectToUrl } = resolveRedirect(
		user,
		translateKey as keyof LocalRoutes,
		hasCart,
		settings
	);
	const redirectDefinition =
		!allowed &&
		redirectToRoute &&
		translations.hasOwnProperty(redirectToRoute) &&
		translations[redirectToRoute];

	const redirect =
		typeof redirectDefinition === 'object' ? `${redirectDefinition.route}` : redirectToUrl;

	return {
		translateKey: allowed ? translateKey : undefined,
		redirect: redirect?.toString() || undefined,
	};
};

/**
 * Loads the Routes translations for the passed in localeId and looks
 * for a route match in the rout manifest. If found, it returns a PageData
 * object.
 */
export const getStaticRoutePageData = async ({
	pub,
	path,
	localeId,
	locale,
	user,
	cart,
	settings,
}: PageDataLookupProps): Promise<PageDataFromId | string | undefined> => {
	const { translations, foundEntry } = await getTranslationKeyFromPath({ locale, localeId, path });
	const [idReverseTranslate, translationsFromRoutId] = foundEntry;
	let redirect;
	let translateKey = idReverseTranslate;
	if (!pub && translateKey !== 'SessionError') {
		// not to redirect from session error to session error
		// redirect only need to be handled server-side for response status code 3xx.
		const protectedRouteKey = getProtectedRouteKey({
			translations,
			user,
			translateKey: idReverseTranslate,
			cart,
			settings,
		});
		redirect = protectedRouteKey.redirect;
		translateKey = protectedRouteKey.translateKey;
	}
	const routeKey =
		translateKey &&
		Object.entries(dataRouteManifest)
			.find(([key]) => key === translateKey)
			?.at(-1);

	const {
		title = '',
		description = '',
		keywords = '',
	} = routeKey && typeof translationsFromRoutId === 'object' ? translationsFromRoutId : {};
	return redirect
		? redirect
		: routeKey
		? {
				layout: {
					name: routeKey.toString(),
					containerName: routeKey.toString(),
					isStoreDefault: true,
				},
				page: {
					type: routeKey.toString(),
					title: title.toString(),
					metaDescription: description.toString(),
					metaKeyword: keywords.toString(),
				},
				identifier: '',
				tokenExternalValue: `${routeKey}`,
				tokenName: '',
				tokenValue: '',
		  }
		: undefined;
};
