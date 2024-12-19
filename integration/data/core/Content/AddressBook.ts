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
import { ADDRESS_TYPES } from '@/data/constants/address';
import { DATA_KEY_PERSON } from '@/data/constants/dataKey';
import { Address, EditableAddress } from '@/data/types/Address';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { isMappedAddressInfoArray } from '@/data/utils/contact';
import { getPrimaryAddresses } from '@/data/utils/getPrimaryAddresses';
import { makeEditableAddress } from '@/data/utils/makeEditableAddress';
import { personalContactInfoMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/personalContactInfoMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { SelectChangeEvent } from '@mui/material';
import type { PersonPerson } from 'integration/generated/transactions/data-contracts';
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
	const [openPrimaryConfirmDialog, setOpenPrimaryConfirmDialog] = useState<boolean>(false);
	const [selectedPrimaryAddress, setSelectedPrimaryAddress] = useState<EditableAddress>();
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
	const registrationAddressNickName = useMemo(() => data?.nickName, [data]);
	const { primaryShippingAddress, primaryBillingAddress, areSame } = useMemo(
		() => getPrimaryAddresses(addresses),
		[addresses]
	);

	const updatedAddressSequence = useMemo(
		() => [
			...addresses.filter((address) => address.primary === 'true'),
			...addresses.filter((address) => address.primary === 'false'),
		],
		[addresses]
	);
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

	const setAsPrimary = useCallback(
		(selectedAddress?: EditableAddress) => () => {
			setSelectedPrimaryAddress(selectedAddress);
			setOpenPrimaryConfirmDialog(true);
		},
		[]
	);

	const updateExistingPrimaryAddress = useCallback(async () => {
		const existingPrimaryAddressToUpdate = [];
		// If primary address is common for both shipping and billing then no need to update existing primary address.
		if (!areSame) {
			if (selectedPrimaryAddress?.addressType === ADDRESS_TYPES.SHIPPING_AND_BILLING) {
				existingPrimaryAddressToUpdate.push(primaryShippingAddress);
				existingPrimaryAddressToUpdate.push(primaryBillingAddress);
			} else if (
				selectedPrimaryAddress?.addressType === ADDRESS_TYPES.SHIPPING &&
				primaryShippingAddress?.addressType !== selectedPrimaryAddress?.addressType
			) {
				// In this case existing primary shipping address will be of type shipping and billing.
				existingPrimaryAddressToUpdate.push(primaryShippingAddress);
			} else if (
				selectedPrimaryAddress?.addressType === ADDRESS_TYPES.BILLING &&
				primaryBillingAddress?.addressType !== selectedPrimaryAddress?.addressType
			) {
				// In this case existing primary billing address will be of type shipping and billing.
				existingPrimaryAddressToUpdate.push(primaryBillingAddress);
			}

			if (existingPrimaryAddressToUpdate.length) {
				existingPrimaryAddressToUpdate.forEach(async (address) => {
					if (address) {
						const editableAddress = makeEditableAddress(address);
						address && (await onSave({ ...editableAddress, primary: 'false' }));
					}
				});
			}
		}
	}, [
		areSame,
		onSave,
		primaryBillingAddress,
		primaryShippingAddress,
		selectedPrimaryAddress?.addressType,
	]);

	const onPrimaryConfirm = useCallback(async () => {
		setOpenPrimaryConfirmDialog(false);
		await updateExistingPrimaryAddress();
		selectedPrimaryAddress && (await onSave({ ...selectedPrimaryAddress, primary: 'true' }));
		setSelectedPrimaryAddress(undefined);
		scrollTo(0, 0);
	}, [onSave, selectedPrimaryAddress, updateExistingPrimaryAddress]);

	const onCancelPrimaryConfirm = useCallback(async () => {
		setOpenPrimaryConfirmDialog(false);
		setSelectedPrimaryAddress(undefined);
	}, []);

	const onFilter = useCallback(
		(e: SelectChangeEvent<string>) => {
			const _type = e.target.value;
			setDisplayAddresses(
				updatedAddressSequence.filter(({ addressType }) => !_type || addressType?.includes(_type))
			);
			setType(_type);
		},
		[updatedAddressSequence]
	);

	const getCardActions = (address: EditableAddress) => {
		const { primary } = address;
		return [
			primary !== 'true' &&
				registrationAddressNickName !== address.nickName && {
					text: cardText.DeleteButton.t(),
					variant: 'outlined',
					handleClick: onDelete(address),
					enableConfirmation: true,
					sx: { px: 1.25 },
				},
			{
				text: cardText.EditButton.t(),
				handleClick: onCreateOrEdit(address),
				sx: { px: 1.25 },
			},
			primary !== 'true' && {
				text: cardText.SetAsPrimary.t(),
				handleClick: setAsPrimary(address),
				sx: { px: 1.25 },
			},
		].filter(Boolean);
	};

	const getPrimaryAddressMessage = useCallback(
		(address: Address) =>
			areSame
				? cardText.PrimaryAddress.t()
				: address.addressType === ADDRESS_TYPES.SHIPPING
				? cardText.PrimaryShippingAddress.t()
				: address.addressType === ADDRESS_TYPES.BILLING
				? cardText.PrimaryBillingAddress.t()
				: address.nickName === primaryShippingAddress?.nickName
				? cardText.PrimaryShippingAddress.t()
				: cardText.PrimaryBillingAddress.t(),
		[areSame, cardText, primaryShippingAddress]
	);

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
		setAsPrimary,
		openPrimaryConfirmDialog,
		onPrimaryConfirm,
		onCancelPrimaryConfirm,
		getPrimaryAddressMessage,
		primaryShippingAddress,
		primaryBillingAddress,
	};
};
