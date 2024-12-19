/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { CheckCircle } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

import { AddressCardMain } from '@/components/blocks/AddressCard/Main';
import { addressCardSX } from '@/components/blocks/AddressCard/styles/card';
import { addressCardHeaderSX } from '@/components/blocks/AddressCard/styles/header';
import { addressCardPrimaryIconContainerSX } from '@/components/blocks/AddressCard/styles/primaryIconContainer';
import { addressCardTypographySX } from '@/components/blocks/AddressCard/styles/typography';
import { Card } from '@/components/blocks/Card';
import { useAddressBook } from '@/data/Content/AddressBook';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Address } from '@/data/types/Address';
import { AddressTypes, makePrintable, validateAddress } from '@/utils/address';

type AddressCardProps = {
	address: Address;
	actions?: any[];
	showType?: boolean;
	selectedAddressId?: string;
	selectedNickName?: string;
	readOnly?: boolean;
	shouldShowPrimary?: boolean;
};
/**
 * Address card display component
 * displays the details of a single address
 * @param props
 */
export const AddressCard: FC<AddressCardProps> = (props) => {
	const cardText = useLocalization('AddressCard');
	const addrBookText = useLocalization('AddressBook');
	const {
		actions,
		showType,
		readOnly,
		address,
		selectedNickName,
		selectedAddressId,
		shouldShowPrimary = false,
	} = props;
	const { getPrimaryAddressMessage } = useContext(ContentContext) as ReturnType<
		typeof useAddressBook
	>;
	const addressData = useMemo(() => makePrintable(address), [address]);
	const { nickName, addressId, addressType } = address;
	const isSelected = useMemo(
		() => selectedAddressId === addressId || nickName === selectedNickName,
		[addressId, nickName, selectedAddressId, selectedNickName]
	);
	const showInvalid = useMemo(() => isSelected && !validateAddress(address), [address, isSelected]);

	const cardHeader = (
		<Stack direction="row" justifyContent="space-between" sx={addressCardHeaderSX}>
			<Stack>
				{nickName ? (
					<Typography variant="subtitle2" display="block" noWrap sx={addressCardTypographySX}>
						{addressData.nickName}
					</Typography>
				) : null}
				{showType && addressType ? (
					<Typography variant="caption">
						{AddressTypes.Shipping === addressType
							? addrBookText.ShippingLabel.t()
							: AddressTypes.Billing === addressType
							? addrBookText.BillingLabel.t()
							: AddressTypes.Both === addressType
							? addrBookText.ShippingBillingLabel.t()
							: ''}
					</Typography>
				) : null}
			</Stack>
			{isSelected ? <CheckCircle color="primary" /> : null}
		</Stack>
	);

	const cardMain = useMemo(
		() => (
			<>
				<AddressCardMain addressData={addressData} />
				{address.primary === 'true' && shouldShowPrimary ? (
					<Stack direction="row" spacing={1} color="primary" sx={addressCardPrimaryIconContainerSX}>
						<CheckCircle color="primary" fontSize="small" />
						<Typography variant="caption" color="primary" fontSize="small">
							{(getPrimaryAddressMessage && getPrimaryAddressMessage(address)) ||
								cardText.PrimaryAddress.t()}
						</Typography>
					</Stack>
				) : null}
			</>
		),
		[address, addressData, cardText, getPrimaryAddressMessage, shouldShowPrimary]
	);

	return readOnly ? (
		cardMain
	) : (
		<Card
			testId={`address-card-${nickName}`}
			extraSX={[addressCardSX(isSelected, showInvalid)]}
			cardHeader={cardHeader}
			cardMain={cardMain}
			actions={actions}
			confirmLabel={cardText.Confirm.t()}
			cancelLabel={cardText.Cancel.t()}
		/>
	);
};
