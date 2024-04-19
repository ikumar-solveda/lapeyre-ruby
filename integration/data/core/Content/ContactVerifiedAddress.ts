/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useNotifications } from '@/data/Content/Notifications';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { avsContactUpdateOrCreate } from '@/data/Content/_PersonContactFetcher';
import { useVerifiedAddress } from '@/data/Content/_VerifiedAddress';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { EditableAddress } from '@/data/types/Address';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { processError } from '@/data/utils/processError';
import { useCallback } from 'react';

export const useContactVerifiedAddress = () => {
	const success = useLocalization('success-message');
	const { notifyError, showSuccessMessage } = useNotifications();
	const {
		enteredAddress,
		setEnteredAddress,
		verifiedAddresses,
		setVerifiedAddresses,
		handleChange,
		value,
		open,
		onClosePopup,
		handleVerifyAddress,
		verifyCallback,
		setVerifyCallback,
	} = useVerifiedAddress<EditableAddress>();
	const { settings } = useSettings();
	const storeId = settings?.storeId ?? '';
	const params = useExtraRequestParameters();

	const onUseAddress = useCallback(async () => {
		if (enteredAddress) {
			try {
				const address =
					value === 0 ? enteredAddress : { ...enteredAddress, ...verifiedAddresses?.at(value - 1) };
				if (address) {
					const { addressLine1, addressLine2, addressId, nickName, ..._address } = address;
					const data = {
						addressLine: [address.addressLine1, address.addressLine2 ?? ''],
						..._address,
					};
					const query = { bypassAVS: 'true' };
					const res = await avsContactUpdateOrCreate(
						true,
						!!address.addressId
					)({ storeId, nickName, query, data, params });
					const msgKey = address.addressId ? 'EDIT_ADDRESS_SUCCESS' : 'ADD_ADDRESS_SUCCESS';
					showSuccessMessage(success[msgKey].t([nickName]));
					verifyCallback && verifyCallback.callback({ ...address, ...res });
					setVerifiedAddresses(undefined);
					setVerifyCallback(undefined);
				}
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		}
	}, [
		value,
		enteredAddress,
		verifiedAddresses,
		storeId,
		params,
		showSuccessMessage,
		success,
		verifyCallback,
		setVerifiedAddresses,
		setVerifyCallback,
		notifyError,
	]);

	return {
		enteredAddress,
		setEnteredAddress,
		verifiedAddresses,
		setVerifiedAddresses,
		handleChange,
		onUseAddress,
		value,
		open,
		onClosePopup,
		handleVerifyAddress,
	};
};
