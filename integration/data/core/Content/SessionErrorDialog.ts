/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SyntheticEvent, useCallback, useContext, useMemo } from 'react';
import { SessionErrorContext } from '@/data/context/sessionError';
import { useLocalization } from '@/data/Localization';
import { logoutFetcher, useLogout } from '@/data/Content/Logout';
import { useSettings } from '@/data/Settings';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { loginFetcher } from '@/data/Content/Login';
import { useUser } from '@/data/User';
import { processError } from '@/data/utils/processError';
import { useNotifications } from '@/data/Content/Notifications';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { mutate } from 'swr';
import { personMutatorKeyMatcher } from '@/data/utils/personMutatorKeyMatcher';

export const useSessionError = () => {
	const { sessionError, setSessionError } = useContext(SessionErrorContext);
	const { mutateUser, user } = useUser();
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
		async ({ email, logonPassword }: { email: string; logonPassword: string }) => {
			const data = {
				logonId: email,
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
				mutate(personMutatorKeyMatcher(''), undefined);
				mutateUser();
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[mutateUser, setSessionError, settings?.storeId, notifyError, params]
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
