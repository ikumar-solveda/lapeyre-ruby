/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { useNotifications } from '@/data/Content/Notifications';
import { contractSwitcher } from '@/data/Content/_Contract';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { getContractIdParamFromContext, useSettings } from '@/data/Settings';
import { User, useUser } from '@/data/User';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { organizationContractMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/organizationContractMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { useCallback, useEffect } from 'react';
import { mutate } from 'swr';

/**
 * Used for pre-selecting the first contract if the current entitled contract is more than one.
 * Only can be used once in app.
 */
export const usePreSelectContract = () => {
	const { settings } = useSettings();
	const { notifyError } = useNotifications();
	const storeId = settings?.storeId as string;
	const { user } = useUser();
	const params = useExtraRequestParameters();

	const preSelectContract = useCallback(
		async (user?: User) => {
			const contractIds = getContractIdParamFromContext(user?.context)?.contractId ?? [];
			if (contractIds.length > 1) {
				try {
					await contractSwitcher(true)({ storeId, params, data: { contractId: contractIds[0] } });
					await mutate(organizationContractMutatorKeyMatcher(EMPTY_STRING), undefined);
				} catch (e) {
					notifyError(processError(e as TransactionErrorResponse));
				}
			}
		},
		[notifyError, params, storeId]
	);

	useEffect(() => {
		preSelectContract(user);
	}, [user]); // eslint-disable-line react-hooks/exhaustive-deps
};
