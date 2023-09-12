/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useNotifications } from '@/data/Content/Notifications';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { selfFetcher, selfUpdater } from '@/data/Content/_Person';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { DATA_KEY_PERSON } from '@/data/constants/dataKey';
import { EditableAddress } from '@/data/types/Address';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { Person, PersonContact } from '@/data/types/Person';
import { personalContactInfoMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/personalContactInfoMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { useCallback, useMemo, useState } from 'react';
import useSWR, { mutate } from 'swr';

export type EditablePersonInfo = Omit<EditableAddress, 'addressType' | 'nickName'> & {
	parentOrgId?: string;
};
export type ChangePasswordValues = {
	xcred_logonPasswordOld: string;
	logonPassword: string;
	xcred_logonPasswordVerify: string;
};

const dataMap = (data?: Person): EditablePersonInfo => {
	const {
		firstName = '',
		lastName = '',
		email1 = '',
		addressLine = ['', ''],
		city = '',
		country = '',
		state = '',
		zipCode = '',
		phone1 = '',
		orgizationId: parentOrgId,
	} = data ?? {};
	return {
		firstName,
		lastName,
		email1,
		addressLine1: addressLine[0] ?? '',
		addressLine2: addressLine[1] ?? '',
		city,
		country,
		state,
		zipCode,
		phone1,
		parentOrgId,
	};
};

export const usePersonInfo = () => {
	const { settings } = useSettings();
	const params = useExtraRequestParameters();
	const personalInformationNLS = useLocalization('PersonalInformation');
	const { showSuccessMessage, notifyError } = useNotifications();
	const [editing, setEditing] = useState(false);
	const [changePassword, setChangePassword] = useState(false);
	const {
		data,
		error: personInfoError,
		mutate: mutatePersonInfo,
	} = useSWR(
		settings?.storeId
			? [
					{
						storeId: settings.storeId,
					},
					DATA_KEY_PERSON,
			  ]
			: null,
		async ([props]) => selfFetcher(true)(props.storeId, undefined, params)
	);

	const edit = useCallback(() => {
		setEditing(true);
	}, []);

	const cancelEdit = useCallback(() => {
		setEditing(false);
	}, []);

	const savePersonInfo = useCallback(
		async (info: EditablePersonInfo) => {
			const { addressLine1, addressLine2, ..._address } = info;
			const data = { addressLine: [addressLine1, addressLine2 ?? ''], ..._address };
			const storeId = settings?.storeId ?? '';
			try {
				await selfUpdater(true)(storeId, undefined, data, params);
				mutate(personalContactInfoMutatorKeyMatcher(''), undefined);
				setEditing(false);
				showSuccessMessage(personalInformationNLS.UpdateSuccessful.t());
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[
			notifyError,
			personalInformationNLS.UpdateSuccessful,
			settings?.storeId,
			showSuccessMessage,
			params,
		]
	);

	const closePasswordDialog = useCallback(() => {
		setChangePassword(false);
	}, []);

	const openPasswordDialog = useCallback(() => {
		setChangePassword(true);
	}, []);

	const updatePassword = useCallback(
		async (value: ChangePasswordValues) => {
			const data = { resetPassword: 'true', ...value };
			const storeId = settings?.storeId ?? '';
			try {
				await selfUpdater(true)(storeId, undefined, data, params);
				setChangePassword(false);
				showSuccessMessage(personalInformationNLS.UpdateSuccessful.t());
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[
			notifyError,
			personalInformationNLS.UpdateSuccessful,
			settings?.storeId,
			showSuccessMessage,
			params,
		]
	);

	const { personInfo, primaryAddress } = useMemo(() => {
		const personInfo = dataMap(data);
		const { nickName, addressLine, addressType, addressId } = data ?? {};
		const primaryAddress = nickName
			? ({
					...personInfo,
					addressId,
					addressLine,
					nickName,
					addressType,
					primary: 'true',
			  } as PersonContact)
			: undefined;
		return { personInfo, primaryAddress };
	}, [data]);

	return {
		personInfo,
		primaryAddress,
		mutatePersonInfo,
		personInfoError,
		editing,
		edit,
		cancelEdit,
		savePersonInfo,
		updatePassword,
		closePasswordDialog,
		openPasswordDialog,
		changePassword,
	};
};
