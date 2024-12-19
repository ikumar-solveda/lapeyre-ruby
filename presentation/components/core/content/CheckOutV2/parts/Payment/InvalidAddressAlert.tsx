/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import type { Props } from '@/components/content/CheckOutV2/parts/Payment/Selection';
import { useLocalization } from '@/data/Localization';
import type { PersonSingleContact } from '@/data/types/Address';
import { validateAddress } from '@/utils/address';
import { Alert } from '@mui/material';
import { useMemo, type FC } from 'react';

type CheckOutV2InvalidAddressAlertProps = {
	availableAddress: PersonSingleContact[];
	values: Props['values'];
};
export const CheckOutV2InvalidAddressAlert: FC<CheckOutV2InvalidAddressAlertProps> = ({
	availableAddress,
	values,
}) => {
	const shippingNLS = useLocalization('Shipping');
	const invalid = useMemo(() => {
		const selectedBillingAddress = availableAddress.find(
			(address) => values.billing_address_id === address?.addressId
		);
		return selectedBillingAddress && !validateAddress(selectedBillingAddress);
	}, [availableAddress, values.billing_address_id]);

	return invalid ? (
		<Alert variant="outlined" severity="error" sx={{ mt: 1 }}>
			{shippingNLS.Msgs.Incomplete.t()}
		</Alert>
	) : null;
};
