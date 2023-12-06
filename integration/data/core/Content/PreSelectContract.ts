/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { useNotifications } from '@/data/Content/Notifications';
import { contractSwitcher } from '@/data/Content/_Contract';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { getContractIdParamFromContext, useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { organizationContractMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/organizationContractMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { useCallback, useEffect, useMemo } from 'react';
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
	const { contractId, numberOfContracts } = useMemo(() => {
		const contractIds = getContractIdParamFromContext(user?.context)?.contractId;
		return {
			contractId: contractIds?.at(0) ?? '',
			numberOfContracts: contractIds?.length,
		};
	}, [user?.context]);
	const isLoggedIn = !!user?.isLoggedIn;
	const preSelectContract = useCallback(
		async (contractId: string) => {
			const data = { contractId };
			try {
				await contractSwitcher(true)({ storeId, params, data });
				await mutate(organizationContractMutatorKeyMatcher(EMPTY_STRING), undefined);
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[notifyError, params, storeId]
	);
	useEffect(() => {
		if (isLoggedIn && numberOfContracts && numberOfContracts > 1) {
			preSelectContract(contractId);
		}
	}, [contractId, isLoggedIn, numberOfContracts, preSelectContract]);
};
