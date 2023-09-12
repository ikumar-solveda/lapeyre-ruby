/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import TagManager from 'react-gtm-module';
import { Settings } from '@/data/Settings';
import {
	GA_VERSIONS,
	GA_VERSION_GA4,
	GA_VERSION_UA,
	GTM_AUTH,
	GTM_ID,
	GTM_PREVIEW,
	PAGE_DATA_LAYER,
} from '@/data/constants/gtm';

export const getGTMConfig = (settings: Settings) => {
	const { userData = {} } = settings ?? {};
	const versions = (userData[GA_VERSIONS] ?? '').split(',');
	const gtmId = userData[GTM_ID];
	const gtmAuth = userData[GTM_AUTH];
	const gtmPreview = userData[GTM_PREVIEW];
	const ga4 = !!versions.find((version) => version === GA_VERSION_GA4);
	const ua = !!versions.find((version) => version === GA_VERSION_UA);
	return { ga4, ua, gtmId, gtmAuth, gtmPreview };
};

/**
 * Initialize the Google Tag Manager environment by connecting to the configured container, i.e.,
 *   for each store, the following configuration is in the STORECONF table:
 * 1. 'google.analytics.versions': 'UA,GA4'
 * 2. 'google.tag.manager.auth': 'cnzsj5FrFmQu8pJAeDsjbQ'
 * 3. 'google.tag.manager.container.id': 'GTM-5HTXBL2'
 * 4. 'google.tag.manager.preview': 'env-1'
 *
 * @param gtmId The Google Tag Manager container ID.
 * @param auth The Google Tag Manager container auth value.
 * @param preview Google Tag Manager container preview value.
 */
export const initializeGTM = (gtmId: string, auth: string, preview: string) =>
	TagManager.initialize({ gtmId, auth, preview, dataLayerName: PAGE_DATA_LAYER });
