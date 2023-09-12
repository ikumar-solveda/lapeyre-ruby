/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useNotifications } from '@/data/Content/Notifications';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { requisitionListsCreator } from '@/data/Content/_RequisitionList';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { CreateListProps } from '@/data/types/RequisitionLists';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { requisitionListsMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/requisitionListsKeyMatcher';
import { processError } from '@/data/utils/processError';
import { FormEvent, useCallback } from 'react';
import { mutate } from 'swr';

export const useRequisitionListsCreation = () => {
	const { settings } = useSettings();
	const { RequisitionListDetails } = useLocalization('Routes');
	const router = useNextRouter();
	const { langId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const { CREATE_REQUISITIONLIST_SUCCESS } = useLocalization('success-message');
	const { showSuccessMessage, notifyError } = useNotifications();

	const onCreate = useCallback(
		async (values: CreateListProps, _event?: FormEvent<HTMLFormElement>) => {
			try {
				const { requisitionListId } = await requisitionListsCreator(true)(
					{ storeId: settings.storeId, langId, ...values },
					params
				);
				await mutate(requisitionListsMutatorKeyMatcher(EMPTY_STRING), undefined);
				router.push({
					pathname: RequisitionListDetails.route.t(),
					query: { id: requisitionListId },
				});
				showSuccessMessage(CREATE_REQUISITIONLIST_SUCCESS.t([values.name]));
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[
			settings.storeId,
			langId,
			params,
			router,
			RequisitionListDetails,
			showSuccessMessage,
			CREATE_REQUISITIONLIST_SUCCESS,
			notifyError,
		]
	);

	return {
		onCreate,
	};
};
