/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024, 2025.
 */

import { AddressCard } from '@/components/blocks/AddressCard';
import { Dialog } from '@/components/blocks/Dialog';
import { OneClick } from '@/components/blocks/OneClick';
import type { useVerifiedAddress } from '@/data/Content/_VerifiedAddress';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Address, MappedAddressInfo } from '@/data/types/Address';
import {
	Divider,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Stack,
	Typography,
} from '@mui/material';
import { type FC, useContext, useEffect } from 'react';

export const VerifiedAddress: FC = () => {
	const localization = useLocalization('VerifiedAddress');
	const {
		verifiedAddresses,
		enteredAddress,
		onClosePopup,
		handleChange,
		value,
		onUseAddress,
		open,
	} = useContext(ContentContext) as ReturnType<typeof useVerifiedAddress> & {
		onUseAddress: () => Promise<void>;
	};

	useEffect(() => {
		scrollTo(0, 0);
	}, [open]);

	return (
		<Dialog
			open={open}
			onClose={onClosePopup}
			title={localization.Title.t()}
			content={
				<Stack spacing={2}>
					<Typography>{localization.Description.t()}</Typography>
					<Divider />
					<FormControl>
						<RadioGroup
							aria-labelledby="verified-address-radio-buttons"
							name="verified-address-radio-buttons"
							value={value}
							onChange={handleChange}
						>
							<Stack spacing={2}>
								<Typography variant="body2">{localization.EnteredAddress.t()}</Typography>
								<FormControlLabel
									value={0}
									control={<Radio size="small" />}
									label={
										<AddressCard readOnly={true} address={enteredAddress as unknown as Address} />
									}
								/>
								<Typography variant="body2">{localization.RecommendedAddress.t()}</Typography>
								{verifiedAddresses?.map((address: MappedAddressInfo, index: number) => (
									<FormControlLabel
										key={index + 1}
										value={index + 1}
										control={<Radio size="small" />}
										label={<AddressCard readOnly={true} address={address as unknown as Address} />}
									/>
								))}
							</Stack>
						</RadioGroup>
					</FormControl>
				</Stack>
			}
			actions={
				<>
					<OneClick
						data-testid="verified-address-dialog-use-address-button"
						id="verified-address-dialog-use-address-button"
						variant="contained"
						onClick={onUseAddress}
					>
						<Typography>{localization.UseAddressButton.t()}</Typography>
					</OneClick>

					<OneClick
						data-testid="verified-address-dialog-cancel-button"
						id="verified-address-dialog-cancel-button"
						variant="outlined"
						onClick={onClosePopup}
					>
						<Typography>{localization.CancelButton.t()}</Typography>
					</OneClick>
				</>
			}
		/>
	);
};
