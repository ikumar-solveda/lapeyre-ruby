/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useNotifications } from '@/data/Content/Notifications';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useSettings } from '@/data/Settings';
import { ID, TransactionErrorResponse } from '@/data/types/Basic';
import { personMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/personMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { logger } from '@/logging/logger';
import { transactionsLoginIdentity } from 'integration/generated/transactions';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { SyntheticEvent } from 'react';
import { mutate } from 'swr';

export const logoutFetcher =
	(pub: boolean) =>
	async (
		storeId: string,
		query: {
			[key: string]: string | boolean | ID[] | number;
		},
		params: RequestParams
	) => {
		try {
			return await transactionsLoginIdentity(pub).loginIdentityLogout(storeId, query, params);
		} catch (error) {
			if (pub) {
				throw error;
			} else {
				logger.error('Logout: logoutFetcher: error: %o', error);
				return error;
			}
		}
	};

export const useLogout = () => {
	const { settings } = useSettings();
	const router = useNextRouter();
	const params = useExtraRequestParameters();
	const { notifyError } = useNotifications();

	const handleLogout = async (props: SyntheticEvent) => {
		props.preventDefault();
		if (settings?.csrSession) {
			return;
		}
		try {
			await logoutFetcher(true)(settings?.storeId ?? '', { updateCookies: 'true' }, params);
			await router.push('/').finally(() => {
				mutate(personMutatorKeyMatcher(''), undefined);
			});
		} catch (e) {
			notifyError(processError(e as TransactionErrorResponse));
		}
	};

	return {
		handleLogout,
		settings,
	};
};
