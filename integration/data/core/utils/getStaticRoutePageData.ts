/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { LANGUAGE_MAP } from '@/data/constants/environment';
import { dataRouteManifest, dataRouteProtection } from '@/data/containers/manifest';
import { PageDataFromId } from '@/data/types/PageDataFromId';
import { requestTranslation, TranslationTable } from 'integration/generated/translations';
import { DEFAULT_LANGUAGE } from '@/data/config/DEFAULTS';
import { ParsedUrlQuery } from 'querystring';
import { User } from '@/data/User';
import { Order } from '@/data/types/Order';

type PageDataLookupProps = {
	pub: boolean;
	path: ParsedUrlQuery['path'];
	localeId: string;
	user: Partial<User>;
	cart?: Order;
};

type ProtectedRouteGetter = {
	translations: Awaited<ReturnType<typeof requestTranslation>>;
	user: Partial<User>;
	translateKey?: string;
	cart?: Order;
};

type LocalRoutes = TranslationTable['Routes'];

// Handle server side session error here, redirect to session error page and clear cookie if there is session error.
const resolveRedirect = (user: Partial<User>, translateKey: keyof LocalRoutes, cart?: Order) =>
	user.sessionError
		? { allowed: false, redirectToRoute: 'SessionError', redirectToUrl: undefined }
		: (
				(translateKey && dataRouteProtection[translateKey]) ||
				(() => ({ allowed: true, redirectToRoute: undefined, redirectToUrl: undefined }))
		  )(user, cart);
/**
 * Returns the redirect information from route protection if it exists.
 */
const getProtectedRouteKey = ({
	translations,
	user,
	translateKey,
	cart,
}: ProtectedRouteGetter): { translateKey?: string; redirect?: string } => {
	const { allowed, redirectToRoute, redirectToUrl } = resolveRedirect(
		user,
		translateKey as keyof LocalRoutes,
		cart
	);
	const redirectDefinition =
		!allowed &&
		redirectToRoute &&
		translations.hasOwnProperty(redirectToRoute) &&
		translations[redirectToRoute];

	const redirect =
		typeof redirectDefinition === 'object' ? `/${redirectDefinition.route}` : redirectToUrl;

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
	user,
	cart,
}: PageDataLookupProps): Promise<PageDataFromId | string | undefined> => {
	const locale = Object.entries(LANGUAGE_MAP)
		.find(([key]) => key === localeId)
		?.at(-1);
	// TODO Pass translations in, use caching with getLocalization
	const translations = await requestTranslation({
		locale: locale || LANGUAGE_MAP[DEFAULT_LANGUAGE],
		section: 'Routes',
	});
	const [idReverseTranslate, translationsFromRoutId] =
		Object.entries(translations).find(
			([_, value]) => typeof value === 'object' && path && value?.route === [...path].join('/')
		) || [];
	let redirect;
	let translateKey = idReverseTranslate;
	if (!pub) {
		// redirect only need to be handled server-side for response status code 3xx.
		const protectedRouteKey = getProtectedRouteKey({
			translations,
			user,
			translateKey: idReverseTranslate,
			cart,
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
				tokenExternalValue: '',
				tokenName: '',
				tokenValue: '',
		  }
		: undefined;
};
