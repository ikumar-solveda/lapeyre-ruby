/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useNotifications } from '@/data/Content/Notifications';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { requisitionListsFileUpload } from '@/data/Content/_RequisitionList';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { CSV_FILE_EXTENSION } from '@/data/constants/requisitionLists';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { FileInputValue } from '@/data/types/FormInput';
import { requisitionListsMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/requisitionListsKeyMatcher';
import { processError } from '@/data/utils/processError';
import { ContentType } from 'integration/generated/transactions/http-client';
import { FormEvent } from 'react';
import { mutate } from 'swr';

export const initialUploadInputValues = {
	name: EMPTY_STRING,
	file: {
		files: null,
		value: EMPTY_STRING,
	} as FileInputValue,
};

export const useRequisitionListsFileUpload = () => {
	const { settings } = useSettings();
	const { notifyError } = useNotifications();
	const params = useExtraRequestParameters();
	const router = useNextRouter();
	const { RequisitionListsUploadLogs } = useLocalization('Routes');

	const onUpload = async (
		values: typeof initialUploadInputValues,
		_event?: FormEvent<HTMLFormElement>
	) => {
		const {
			name,
			file: { files },
		} = values;
		if (files) {
			const requisitionListName =
				name !== EMPTY_STRING
					? name + CSV_FILE_EXTENSION
					: (values.file.files?.[0]?.name as string);
			try {
				await requisitionListsFileUpload(true)(
					{
						storeId: settings.storeId,
						data: {
							UpLoadedFile: new File([files[0]], requisitionListName),
							URL: '/requisition_list',
						},
					},
					{ ...params, type: ContentType.FormData }
				);
				await mutate(requisitionListsMutatorKeyMatcher(EMPTY_STRING), undefined);
				router.push(RequisitionListsUploadLogs.route.t());
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		}
	};

	return {
		onUpload,
	};
};
