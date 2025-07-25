/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useNotifications } from '@/data/Content/Notifications';
import { contractDescriptionsFetcher, contractSwitcher } from '@/data/Content/_Contract';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useSettings } from '@/data/Settings';
import { DATA_KEY_CONTRACT } from '@/data/constants/dataKey';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { useCompareProductsState } from '@/data/state/useCompareProductsState';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { organizationContractMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/organizationContractMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { MouseEvent } from 'react';
import useSWR, { mutate } from 'swr';

export const useContract = () => {
	const { settings } = useSettings();
	const { notifyError } = useNotifications();
	const storeId = settings?.storeId as string;
	const params = useExtraRequestParameters();
	const { data, error } = useSWR(
		storeId ? [{ storeId }, DATA_KEY_CONTRACT] : null,
		async ([{ storeId }]) => contractDescriptionsFetcher(true)({ storeId, params }),
		{ keepPreviousData: true }
	);
	const router = useNextRouter();
	const {
		actions: { removeData },
	} = useCompareProductsState();

	const onContractSwitch = (contractId: string, compact: boolean) => async (event: MouseEvent) => {
		event.preventDefault();
		const data = { contractId };
		try {
			await contractSwitcher(true)({ storeId, params, data });
			await mutate(organizationContractMutatorKeyMatcher(EMPTY_STRING), undefined);
			await removeData();
			// if changed from popup -- go to home-page -- we want to avoid discrepancies, e.g., product
			//   doesn't exist in contract that was switched to
			if (compact) {
				router.push('/');
			}
		} catch (e) {
			notifyError(processError(e as TransactionErrorResponse));
		}
	};

	return { contracts: !error ? data?.contracts : undefined, onContractSwitch };
};
