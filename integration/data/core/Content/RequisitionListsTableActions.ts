/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useNotifications } from '@/data/Content/Notifications';
import { cartCalculator } from '@/data/Content/_Cart';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import {
	requisitionListCopy,
	requisitionListDelete,
	requisitionListSubmitToCart,
} from '@/data/Content/_RequisitionList';
import { useLocalization } from '@/data/Localization';
import { getContractIdParamFromContext, useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { DATA_KEY_CART } from '@/data/constants/dataKey';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { RequisitionListsItem, RequisitionListsResponse } from '@/data/types/RequisitionLists';
import { generateKeyMatcher } from '@/data/utils/generateKeyMatcher';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { requisitionListsMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/requisitionListsKeyMatcher';
import { processError } from '@/data/utils/processError';
import { Row } from '@tanstack/react-table';
import { FormEvent, useCallback, useMemo, useState } from 'react';
import { KeyedMutator, useSWRConfig } from 'swr';
import { CopyListProps } from '../types/RequisitionLists';

export const useRequisitionListsTableActions = ({
	row,
	mutateRequisitionLists,
}: {
	row: Row<RequisitionListsItem>;
	mutateRequisitionLists: KeyedMutator<RequisitionListsResponse>;
}) => {
	const { RequisitionListDetails } = useLocalization('Routes');
	const [copyListDialogValues, setCopyListDialogValues] = useState<CopyListProps | null>(null);
	const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
	const { mutate } = useSWRConfig();
	const { settings } = useSettings();
	const router = useNextRouter();
	const { user } = useUser();
	const { showSuccessMessage, notifyError } = useNotifications();
	const successMessageNLS = useLocalization('success-message');
	const extraParams = useExtraRequestParameters();
	const { storeId, langId } = getClientSideCommon(settings, router);
	const { contractId } = getContractIdParamFromContext(user?.context) ?? {};
	const readOnly = row.original.memberId !== user?.userId;
	const { description: listName = '', status = '', orderId = '' } = row.original;
	const copyValue = useMemo(() => ({ listName: '', status, orderId }), [orderId, status]);

	const onCopyClick = useCallback(() => {
		setCopyListDialogValues(copyValue);
	}, [copyValue]);

	const closeCopyListDialog = () => {
		setCopyListDialogValues(null);
	};

	const onCopyListDialogSubmit = useCallback(
		async (
			{ listName: name, status, ...props }: CopyListProps,
			_event?: FormEvent<HTMLFormElement>
		) => {
			try {
				const { requisitionListId } = await requisitionListCopy(true)({
					storeId,
					data: { langId, name, status, ...props },
				});
				await mutate(requisitionListsMutatorKeyMatcher(EMPTY_STRING), undefined);
				await mutateRequisitionLists();
				setCopyListDialogValues(null);
				router.push({
					pathname: RequisitionListDetails.route.t(),
					query: { id: requisitionListId },
				});
				showSuccessMessage(successMessageNLS.CREATE_REQUISITIONLIST_SUCCESS.t([name]));
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
				throw e;
			}
		},
		[
			langId,
			mutate,
			mutateRequisitionLists,
			notifyError,
			showSuccessMessage,
			storeId,
			successMessageNLS,
			RequisitionListDetails,
			router,
		]
	);

	const onAddToCart = useCallback(async () => {
		try {
			await requisitionListSubmitToCart(true)(
				{
					storeId,
					requisitionListId: orderId,
					langId,
					data: { ...(contractId && { contractId: [contractId] }) },
				},
				extraParams
			);
			await cartCalculator(true)({ storeId, query: undefined, params: extraParams });
			await mutate(generateKeyMatcher({ [DATA_KEY_CART]: true })(EMPTY_STRING), undefined);
			// notification
			showSuccessMessage(successMessageNLS.addedItemRLSuccessfully.t({ v: listName ?? '' }), true);
			// TODO: add onAddToCart Event call
		} catch (e) {
			notifyError(processError(e as TransactionErrorResponse));
		}
	}, [
		contractId,
		extraParams,
		langId,
		listName,
		mutate,
		notifyError,
		orderId,
		showSuccessMessage,
		storeId,
		successMessageNLS,
	]);

	const onDeleteClick = useCallback(() => {
		setOpenDeleteConfirm(true);
	}, []);

	const onDeleteCancel = useCallback(async () => {
		setOpenDeleteConfirm(false);
	}, []);

	const onDeleteConfirm = useCallback(async () => {
		try {
			await requisitionListDelete(true)(
				{
					storeId,
					requisitionListId: orderId,
				},
				extraParams
			);
			await mutate(requisitionListsMutatorKeyMatcher(EMPTY_STRING), undefined);
			await mutateRequisitionLists();
			// notification
			showSuccessMessage(successMessageNLS.DELETE_REQUISITIONLIST_SUCCESS.t([listName]));
			// TODO: add onAddToCart Event call
		} catch (e) {
			notifyError(processError(e as TransactionErrorResponse));
		}
		setOpenDeleteConfirm(false);
	}, [
		storeId,
		orderId,
		extraParams,
		mutate,
		mutateRequisitionLists,
		showSuccessMessage,
		successMessageNLS,
		listName,
		notifyError,
	]);

	return {
		onCopyClick,
		closeCopyListDialog,
		onCopyListDialogSubmit,
		onAddToCart,
		onDeleteClick,
		onDeleteConfirm,
		openDeleteConfirm,
		onDeleteCancel,
		copyListDialogValues,
		readOnly,
	};
};
