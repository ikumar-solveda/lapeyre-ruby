/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useNotifications } from '@/data/Content/Notifications';
import { contactRemover, selfFetcher } from '@/data/Content/PersonContact';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { avsContactUpdateOrCreate } from '@/data/Content/_PersonContactFetcher';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { DATA_KEY_PERSON } from '@/data/constants/dataKey';
import { Address, EditableAddress } from '@/data/types/Address';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { isMappedAddressInfoArray } from '@/data/utils/contact';
import { personalContactInfoMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/personalContactInfoMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { SelectChangeEvent } from '@mui/material';
import { PersonPerson } from 'integration/generated/transactions/data-contracts';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

const dataMap = (data?: PersonPerson) => {
	const { contact = [], ...rest } = data ?? {};
	return [data ? rest : null, contact].flat(1).filter(Boolean) as Address[];
};

export const useAddressBook = () => {
	const [type, setType] = useState<string>('');
	const { mutate } = useSWRConfig();
	const [editableAddress, setEditableAddress] = useState<EditableAddress>();
	const cardText = useLocalization('AddressCard');
	const success = useLocalization('success-message');
	const { showSuccessMessage, notifyError } = useNotifications();
	const { settings } = useSettings();
	const params = useExtraRequestParameters();
	const key: [{ storeId: string }, string] = useMemo(
		() => [{ storeId: settings.storeId ?? '' }, DATA_KEY_PERSON],
		[settings.storeId]
	);
	const {
		data,
		error,
		mutate: mutateAddress,
	} = useSWR(key, async ([{ storeId }]) => selfFetcher(true)(storeId, undefined, params));
	const addresses = useMemo(() => dataMap(data), [data]);
	const [displayAddresses, setDisplayAddresses] = useState<Address[]>(addresses);

	const onDelete = useCallback(
		(address: EditableAddress) => async () => {
			try {
				await contactRemover(true)(settings?.storeId as string, address.nickName, {}, params);
				mutateAddress();
				mutate(personalContactInfoMutatorKeyMatcher(key), undefined);
				showSuccessMessage(success.DELETE_ADDRESS_SUCCESS.t([address.nickName]));
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[
			settings?.storeId,
			params,
			mutateAddress,
			mutate,
			key,
			showSuccessMessage,
			success.DELETE_ADDRESS_SUCCESS,
			notifyError,
		]
	);

	const postSubmit = useCallback(
		async (_address?: EditableAddress) => {
			await mutateAddress();
			await mutate(personalContactInfoMutatorKeyMatcher(key), undefined);
			setEditableAddress(undefined);
		},
		[key, mutate, mutateAddress]
	);

	const onSave = useCallback(
		async (address: EditableAddress) => {
			const { addressLine1, addressLine2, nickName, addressId, ..._address } = address;
			const data = { addressLine: [addressLine1, addressLine2 ?? ''], ..._address };
			const storeId = settings?.storeId ?? '';
			const query = { bypassAVS: 'false' };
			try {
				const res = await avsContactUpdateOrCreate(
					true,
					!!address.addressId
				)({ storeId, nickName, query, data, params });
				if (isMappedAddressInfoArray(res)) {
					return {
						validatedAddresses: res,
						editingAddress: address,
						callback: postSubmit,
					};
				} else {
					postSubmit({
						...address,
						addressId: res.addressId,
					});
					const msgKey = address.addressId ? 'EDIT_ADDRESS_SUCCESS' : 'ADD_ADDRESS_SUCCESS';
					showSuccessMessage(success[msgKey].t([address?.nickName]));
				}
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[settings?.storeId, params, postSubmit, showSuccessMessage, success, notifyError]
	);

	const onCreateOrEdit = useCallback(
		(address?: EditableAddress) => () => setEditableAddress(address),
		[]
	);

	const onFilter = useCallback(
		(e: SelectChangeEvent<string>) => {
			const _type = e.target.value;
			setDisplayAddresses(
				addresses.filter(({ addressType }) => !_type || addressType?.includes(_type))
			);
			setType(_type);
		},
		[addresses]
	);

	const getCardActions = (address: EditableAddress) => {
		const { primary } = address;
		return [
			{
				text: cardText.EditButton.t(),
				handleClick: onCreateOrEdit(address),
			},
			primary !== 'true' && {
				text: cardText.DeleteButton.t(),
				handleClick: onDelete(address),
				enableConfirmation: true,
			},
		].filter(Boolean);
	};

	useEffect(() => {
		onFilter({ target: { value: type } } as SelectChangeEvent<string>);
	}, [addresses]); // eslint-disable-line react-hooks/exhaustive-deps

	return {
		displayAddresses,
		onFilter,
		addresses,
		getCardActions,
		type,
		error,
		editableAddress,
		onSave,
		onCreateOrEdit,
	};
};
