/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { useNotifications } from '@/data/Content/Notifications';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { logoutFetcher } from '@/data/Content/_Logout';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useSettings } from '@/data/Settings';
import { EventsContext } from '@/data/context/events';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { dynamicESpotMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/dynamicESpotMutatorKeyMatcher';
import { personMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/personMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { SyntheticEvent, useCallback, useContext } from 'react';
import { mutate } from 'swr';
export { logoutFetcher };

export const useLogout = () => {
	const { onLogout } = useContext(EventsContext);
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
				await mutate(personMutatorKeyMatcher(''), undefined, { revalidate: false });
				await mutate(dynamicESpotMutatorKeyMatcher(''), undefined);
				onLogout({ gtm: { settings } });
				await router.push('/');
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[notifyError, params, router, csrSession, storeId, onLogout, settings]
	);

	return {
		handleLogout,
		settings,
	};
};
