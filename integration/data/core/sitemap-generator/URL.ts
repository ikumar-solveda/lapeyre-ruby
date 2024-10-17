/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { Settings } from '@/data/_Settings';
import { STRING_TRUE } from '@/data/constants/catalog';
import { LANGUAGE_MAP_LOWERCASE } from '@/data/constants/environment';
import {
	DEFAULT_HOST,
	DEFAULT_PORT,
	HEADLESS,
	HEADLESS_STORE_DOT_STORE_CONTEXT_ROOT,
	STORE_WEB_SERVER_CONTEXT_PATH,
	STORE_WEB_SERVER_HOST_NAME,
	STORE_WEB_SERVER_SSL_PORT,
} from '@/data/constants/sitemap';
import { KnownLanguageId } from '@/data/types/Sitemap';
import { StoreURLKeyword } from '@/data/types/URLKeyword';
import { isEmpty } from 'lodash';

type Props = {
	path: string;
	settings: Settings;
	searchParams: Record<string, string>;
	languageId: KnownLanguageId;
	query?: Record<string, string>;
	storeToken?: StoreURLKeyword;
};

const getContextPath = (props: Props) => {
	const { settings } = props;
	const { userData } = settings;
	const isHeadless = `${userData[HEADLESS]}`.toLowerCase() === STRING_TRUE;
	const headlessContext = userData[HEADLESS_STORE_DOT_STORE_CONTEXT_ROOT] ?? '';
	const nonHeadlessContext = userData[STORE_WEB_SERVER_CONTEXT_PATH] ?? '';
	const context = isHeadless ? headlessContext : nonHeadlessContext;
	return context;
};

/**
 * Override this to add special handling based on storeId (from `searchParams` or `settings`)
 * @param param0 as below
 * @returns string representing the URL of the input path with store-context applied
 */
export const getURL = async (props: Props) => {
	const { path, languageId, settings, searchParams, query = {}, storeToken } = props;
	const { userData } = settings;
	const defaultHost = userData[STORE_WEB_SERVER_HOST_NAME] || DEFAULT_HOST;
	const defaultPort = userData[STORE_WEB_SERVER_SSL_PORT] || DEFAULT_PORT;
	const { hostName, portNumber, HostName = defaultHost, PortNumber = defaultPort } = searchParams;
	const host = hostName || HostName;
	const port = portNumber || PortNumber;
	const contextPath = getContextPath(props);
	const token = storeToken?.desktopURLKeyword;
	const storePath = token ? `/${token}` : '';
	const locale = languageId ? `/${LANGUAGE_MAP_LOWERCASE[languageId]}` : '';
	const params = isEmpty(query) ? '' : `?${new URLSearchParams(query).toString()}`;
	const urlPath = path === '/' ? '' : path;

	/**
	 * React.JS stores (Emerald, Sapphire) URLs might come out odd because they may have both
	 *   `headlessStore.storeContextRoot` value specified and a store-token available, e.g.,
	 *   https://localhost:6443/Emerald/en-US/emerald?catalogId=11501
	 *
	 *   Additionally, as per the example, the presence of the locale-token would probably cause some
	 *   confusion as we have not dealt with those for the React.JS stores.
	 *
	 *   These instances should probably be special-cased using an override.
	 *
	 *   We **could** potentially special-case this ourselves by not attaching the locale-token and
	 *   store-token if store is headless and has `headlessStore.storeContextRoot` specified (as a way
	 *   of identifying React.JS stores), but in most instances this will be a per-customer override,
	 *   so we will leave the full unadulterated URL available (with its components) as below.
	 */
	const url = `https://${host}:${port}${contextPath}${locale}${storePath}/${urlPath}${params}`;
	return url;
};
