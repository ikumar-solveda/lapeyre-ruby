/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { dFix } from '@/data/Settings';
import { EditableVerifyAddress, MappedAddressInfo, VerifyCallbackFunc } from '@/data/types/Address';
import { isEmpty } from 'lodash';
import { useCallback, useState } from 'react';

export type VerifyCallback<T extends EditableVerifyAddress> = {
	callback: VerifyCallbackFunc<T>;
};

/**
 * The hook contains basic logic to use `@/components/content/VerifiedAddress` Dialog component.
 * It usually not suppose to be used directly by the component. For example, it is used indirectly
 * through hook `useContactVerifiedAddress` in `@/data/Content/ContactVerifiedAddress`.
 *
 * The type of generic typed internal state variable `enteredAddress` need to be specified when use it.
 *
 */
export const useVerifiedAddress = <T extends EditableVerifyAddress>() => {
	const [verifyCallback, setVerifyCallback] = useState<VerifyCallback<T>>();
	const [enteredAddress, setEnteredAddress] = useState<T>();
	const [verifiedAddresses, setVerifiedAddresses] = useState<MappedAddressInfo[]>();
	const [value, setValue] = useState<number>(0);

	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(dFix(event.target.value, 0));
	}, []);

	const handleVerifyAddress = useCallback(
		({
			validatedAddresses,
			editingAddress,
			callback,
		}: {
			validatedAddresses: MappedAddressInfo[];
			editingAddress: T;
			callback: VerifyCallbackFunc<T>;
		}) => {
			setVerifiedAddresses(validatedAddresses);
			setEnteredAddress(editingAddress);
			setVerifyCallback({ callback });
			setValue(0);
		},
		[]
	);

	const onClosePopup = useCallback(() => {
		setVerifiedAddresses(undefined);
		setVerifyCallback(undefined);
	}, []);

	const open = !isEmpty(verifiedAddresses);

	return {
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
	};
};
