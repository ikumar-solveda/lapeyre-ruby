/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useSettings } from '@/data/Settings';
import { ID, TransactionErrorResponse } from '@/data/types/Basic';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { useUser } from '@/data/User';
import { transactionsLoginIdentity } from 'integration/generated/transactions';
import { useNotifications } from '@/data/Content/Notifications';
import { SyntheticEvent } from 'react';
import { processError } from '@/data/utils/processError';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { mutate } from 'swr';
import { personMutatorKeyMatcher } from '@/data/utils/personMutatorKeyMatcher';

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
				console.log('Logout error', error);
				return error;
			}
		}
	};

export const useLogout = () => {
	const { settings } = useSettings();
	const { mutateUser } = useUser();
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
				mutateUser();
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
