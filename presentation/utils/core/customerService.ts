/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Settings } from '@/data/Settings';
import { HEADLESS_STORE_STORE_CONTEXT_ROOT } from '@/data/config/DEFAULTS';
import { FOR_USER_ID, FOR_USER_SESSION, IFRAME_RESIZER } from '@/data/constants/customerService';
import {
	CSRUserContext,
	FetchOptionsType,
	ProcessedFetchOption,
} from '@/data/types/customerService';

export const processFetchOptions =
	(settings: Settings) =>
	({ url, options = {} }: FetchOptionsType): ProcessedFetchOption => {
		const storePath = (settings.userData[HEADLESS_STORE_STORE_CONTEXT_ROOT] ?? '')
			.split('/')
			.join('');
		const storageKey = `HCS${storePath}-${settings.identifier}-${FOR_USER_SESSION}`;
		const fromSession = window.sessionStorage?.getItem(storageKey);
		if (fromSession) {
			try {
				const csr = JSON.parse(fromSession) as CSRUserContext;
				const { WCToken, WCTrustedToken, forUserId } = csr;
				if (url.startsWith('/api/search/') || url.startsWith('/api/resources/')) {
					let reqUrl = url;
					if (url.indexOf(FOR_USER_ID) === -1) {
						reqUrl = url.includes('?')
							? url + '&' + FOR_USER_ID + '=' + forUserId
							: url + '?' + FOR_USER_ID + '=' + forUserId;
					}
					const { headers, ...rest } = options;
					const opts = { ...rest, headers: { ...headers, WCToken, WCTrustedToken } };
					return { reqUrl, options: opts };
				}
			} catch (e) {
				console.log('Not valid CSR JSON from session');
			}
			return undefined;
		}
	};

export const registerCSRMessage = (
	receiveMessage: (message: { [extra: string]: any; action: string }) => void
) => {
	{
		window[IFRAME_RESIZER] = {
			onMessage: receiveMessage,
			heightCalculationMethod: 'taggedElement',
		};
	}
};
