/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useCart } from '@/data/Content/Cart';
import { usePersonInfo } from '@/data/Content/PersonInfo';
import { useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { CART_FETCHING_REQUESTED } from '@/data/constants/customerService';
import { FetchOptionsType, ProcessedFetchOption } from '@/data/types/customerService';
import { processFetchOptions, registerCSRMessage } from '@/utils/customerService';
import { FC, useCallback, useEffect } from 'react';
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
	const { mutatePersonInfo } = usePersonInfo();
	const { mutateUser } = useUser();
	const { mutateCart } = useCart();

	const receiveParentMessage = useCallback(
		(message: { action: string; [extra: string]: any }) => {
			if (message.action === CART_FETCHING_REQUESTED) {
				mutateCart();
			}
		},
		[mutateCart]
	);
	useEffect(() => {
		settings.csrSession && registerCSRMessage(receiveParentMessage);
	}, [settings.csrSession, receiveParentMessage]);
	useEffect(() => {
		if (settings.csrSession) {
			// for the fetch intercept/wrapper in _document.tsx
			window.processFetchOptions = processFetchOptions(settings);
			mutatePersonInfo();
			mutateUser();
			mutateCart();
		}
	}, [mutateCart, mutatePersonInfo, mutateUser, settings]);
	return null;
};
