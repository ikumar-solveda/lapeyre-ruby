/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { DATA_KEY_E_SPOT_DATA_FROM_NAME_DYNAMIC } from '@/data/constants/dataKey';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { loginFetcher } from '@/data/Content/Login';
import { logoutFetcher, useLogout } from '@/data/Content/Logout';
import { useNotifications } from '@/data/Content/Notifications';
import { SessionErrorContext } from '@/data/context/sessionError';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { useUser } from '@/data/User';
import { personMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/personMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { SyntheticEvent, useCallback, useContext, useMemo } from 'react';
import { mutate } from 'swr';

export const useSessionError = () => {
	const { sessionError, setSessionError } = useContext(SessionErrorContext);
	const { user } = useUser();
	const { settings } = useSettings();
	const params = useExtraRequestParameters();
	const { handleLogout } = useLogout();
	const { notifyError } = useNotifications();

	const errorsNLS = useLocalization('SessionError');
	type errorNLSKeys = keyof typeof errorsNLS;
	type ArgTypes = string | number;

	const message = useMemo(() => {
		if (!sessionError) {
			return null;
		} else {
			const messageKey = sessionError.messageKey as errorNLSKeys;
			const titleKey = sessionError.titleKey as errorNLSKeys;
			const errorParameters: [ArgTypes, ArgTypes, ArgTypes, ...ArgTypes[]] = ['', '', ''];
			const messageParameters = sessionError.errorParameters;
			if (messageParameters && messageParameters.length > 0) {
				errorParameters.splice(0, messageParameters.length, ...messageParameters);
			}
			const text =
				sessionError.messageKey in errorsNLS
					? errorsNLS[messageKey].t(errorParameters)
					: sessionError.errorMessage ?? '';
			const title = titleKey && titleKey in errorsNLS ? errorsNLS[titleKey].t() : '';

			return { text, title };
		}
	}, [errorsNLS, sessionError]);

	const onSubmit = useCallback(
		async ({
			email = '',
			logonId = '',
			logonPassword,
		}: {
			/**
			 * @deprecated do not use.
			 */
			email?: string;
			logonId?: string;
			logonPassword: string;
		}) => {
			const data = {
				logonId: logonId || email,
				logonPassword,
			};
			try {
				await logoutFetcher(true)(settings?.storeId ?? '', { updateCookies: 'true' }, params);
				await loginFetcher(true)(
					settings?.storeId ?? '',
					{
						updateCookies: 'true',
					},
					data,
					params
				);
				setSessionError(null);
				mutate(personMutatorKeyMatcher(EMPTY_STRING)); // current page
				mutate(personMutatorKeyMatcher(DATA_KEY_E_SPOT_DATA_FROM_NAME_DYNAMIC), undefined);
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[setSessionError, settings?.storeId, notifyError, params]
	);

	const handleCancel = useCallback(
		async (event: SyntheticEvent) => {
			await handleLogout(event);
			setSessionError(null);
		},
		[handleLogout, setSessionError]
	);

	return {
		message,
		handleCancel,
		onSubmit,
		setSessionError,
		logonId: user?.logonId ?? '',
	};
};
