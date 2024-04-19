/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useNotifications } from '@/data/Content/Notifications';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { logoutFetcher } from '@/data/Content/_Logout';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useSettings } from '@/data/Settings';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { personMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/personMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { SyntheticEvent, useCallback } from 'react';
import { mutate } from 'swr';
export { logoutFetcher };

export const useLogout = () => {
	const { settings } = useSettings();
	const { storeId, csrSession } = settings ?? {};
	const router = useNextRouter();
	const params = useExtraRequestParameters();
	const { notifyError } = useNotifications();

	const handleLogout = useCallback(
		async (props: SyntheticEvent) => {
			props.preventDefault();
			if (csrSession) {
				return;
			}
			try {
				await logoutFetcher(true)(storeId ?? '', { updateCookies: true }, params);
				await router.push('/').finally(() => {
					mutate(personMutatorKeyMatcher(''), undefined);
				});
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[notifyError, params, router, csrSession, storeId]
	);

	return {
		handleLogout,
		settings,
	};
};
