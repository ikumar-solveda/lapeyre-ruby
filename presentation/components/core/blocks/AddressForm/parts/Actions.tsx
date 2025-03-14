/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { addressFormActionsSX } from '@/components/blocks/AddressForm/styles/actions';
import { useLocalization } from '@/data/Localization';
import { AddressFormActionLabels } from '@/data/types/Address';
import { Button, Stack } from '@mui/material';
import { FC } from 'react';

type Props = {
	onCancel?: () => void;
	submitLabel: AddressFormActionLabels;
	cancelLabel?: AddressFormActionLabels;
	submitting?: boolean;
};
export const AddressFormActions: FC<Props> = ({
	onCancel,
	submitLabel,
	cancelLabel,
	submitting,
}) => {
	const addressFormNLS = useLocalization('AddressForm');

	return (
		<Stack
			direction={{ xs: 'column', sm: 'row' }}
			justifyContent="space-between"
			spacing={1}
			sx={addressFormActionsSX}
		>
			{onCancel ? (
				<Button
					id="address-form-cancel"
					data-testid="address-form-cancel"
					variant="outlined"
					onClick={onCancel}
				>
					{cancelLabel ? addressFormNLS.Actions[cancelLabel].t() : null}
				</Button>
			) : null}

			<Button
				id="address-form-save"
				data-testid="address-form-save"
				variant="contained"
				type="submit"
				disabled={submitting}
			>
				{submitLabel ? addressFormNLS.Actions[submitLabel].t() : null}
			</Button>
		</Stack>
	);
};
