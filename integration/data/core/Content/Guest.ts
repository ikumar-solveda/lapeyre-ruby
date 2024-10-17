/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { EMPTY_STRING } from '@/data/constants/marketing';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { guestIdentityLoginFetcher, guestIdentityLogoutFetcher } from '@/data/Content/GuestFetcher';
import { personMutatorKeyMatcher } from '@/data/Content/Login';
import { useSettings } from '@/data/Settings';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { useCallback } from 'react';
import { useSWRConfig } from 'swr';

export const useGuest = () => {
	const router = useNextRouter();
	const { settings } = useSettings();
	const { storeId } = getClientSideCommon(settings, router);
	// server-side param has cookie, client does not. need to separate cookie and preview header.
	const params = useExtraRequestParameters();
	const { mutate } = useSWRConfig();

	const guestLogin = useCallback(async () => {
		await guestIdentityLoginFetcher(true)(storeId, params);
		mutate(personMutatorKeyMatcher(EMPTY_STRING)); // current page
	}, [mutate, params, storeId]);

	/**
	 * Guest logout to create generic user data cookie
	 */
	const guestLogout = useCallback(async () => {
		await guestIdentityLogoutFetcher(false)(storeId, params);
		mutate(personMutatorKeyMatcher(EMPTY_STRING)); // current page
	}, [mutate, params, storeId]);

	return {
		guestLogin,
		guestLogout,
	};
};
