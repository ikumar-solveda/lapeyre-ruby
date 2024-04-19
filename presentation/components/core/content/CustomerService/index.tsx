/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useSettings } from '@/data/Settings';
import { CART_FETCHING_REQUESTED } from '@/data/constants/customerService';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { FetchOptionsType, ProcessedFetchOption } from '@/data/types/customerService';
import { processFetchOptions, registerCSRMessage } from '@/utils/customerService';
import { cartMutatorKeyMatcher, userMutatorKeyMatcher } from '@/utils/mutatorKeyMatchers';
import { FC, useCallback, useEffect } from 'react';
import { mutate } from 'swr';
declare global {
	interface Window {
		parentIFrame: any;
		iFrameResizer: any;
		processFetchOptions: (props: FetchOptionsType) => ProcessedFetchOption;
	}
}

/**
 * A customer service initializer
 * @returns
 */
export const CustomerService: FC = () => {
	const { settings } = useSettings();

	const receiveParentMessage = useCallback((message: { action: string; [extra: string]: any }) => {
		if (message.action === CART_FETCHING_REQUESTED) {
			mutate(cartMutatorKeyMatcher(EMPTY_STRING), undefined);
		}
	}, []);
	useEffect(() => {
		settings.csrSession && registerCSRMessage(receiveParentMessage);
	}, [settings.csrSession, receiveParentMessage]);

	useEffect(() => {
		if (settings.csrSession) {
			const setupSession = async () => {
				await mutate(userMutatorKeyMatcher(EMPTY_STRING), undefined);
				mutate(cartMutatorKeyMatcher(EMPTY_STRING), undefined);
			};
			// for the fetch intercept/wrapper in _document.tsx
			window.processFetchOptions = processFetchOptions(settings);
			setupSession();
		}
	}, [settings]);
	return null;
};
