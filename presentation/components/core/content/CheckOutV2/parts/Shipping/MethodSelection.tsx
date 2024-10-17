/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { IconLabel } from '@/components/blocks/IconLabel';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { checkOutV2ShippingMethodSelectionFieldsetSX } from '@/components/content/CheckOutV2/styles/Shipping/methodSelection/fieldset';
import { checkOutV2ShippingMethodSelectionFormHelperTextSX } from '@/components/content/CheckOutV2/styles/Shipping/methodSelection/formHelperText';
import { checkOutV2ShippingMethodSelectionFormLabelSX } from '@/components/content/CheckOutV2/styles/Shipping/methodSelection/formLabel';
import { checkOutV2ShippingMethodLoadingIndicatorSX } from '@/components/content/CheckOutV2/styles/Shipping/methodSelection/loadingIndicator';
import { checkOutV2ShippingMethodSelectionOptionStackSX } from '@/components/content/CheckOutV2/styles/Shipping/methodSelection/optionStack';
import { checkOutV2ShippingMethodSelectionRadioSX } from '@/components/content/CheckOutV2/styles/Shipping/methodSelection/radio';
import { checkOutV2ShippingMethodRadioGroupSX } from '@/components/content/CheckOutV2/styles/Shipping/methodSelection/radioGroup';
import { useCheckOutV2 } from '@/data/Content/CheckOutV2';
import { useShipping } from '@/data/Content/Shipping';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { validateAddress } from '@/utils/address';
import { LocalShipping } from '@mui/icons-material';
import {
	Alert,
	Box,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Grid,
	Radio,
	RadioGroup,
	Stack,
	Typography,
} from '@mui/material';
import { isEmpty } from 'lodash';
import { ChangeEvent, FC, useCallback, useContext } from 'react';

export const CheckOutV2ShippingMethodSelection: FC = () => {
	const shippingNLS = useLocalization('Shipping');
	const {
		availableMethods,
		selectedAddress,
		updateShippingInfo,
		selectedShipModeId,
		showError,
		isLoading,
	} = useContext(ContentContext) as ReturnType<typeof useCheckOutV2> &
		ReturnType<typeof useShipping>;

	const onChange = useCallback(
		(_event: ChangeEvent<HTMLInputElement>, value: string) =>
			updateShippingInfo({ addressId: selectedAddress?.addressId ?? '', shipModeId: value }),
		[selectedAddress?.addressId, updateShippingInfo]
	);

	return (
		<Stack spacing={2} pb={2}>
			<IconLabel
				icon={<LocalShipping color="primary" />}
				label={
					<Typography variant="h5" id="shipping-method" data-testid="shipping-method">
						{shippingNLS.Labels.ShippingMethod.t()}
					</Typography>
				}
			/>
			<Box>
				{!validateAddress(selectedAddress) ? (
					<Typography mb={2}>{shippingNLS.Msgs.SelectShippingAddress.t()}</Typography>
				) : null}
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<FormControl
							variant="outlined"
							component="fieldset"
							sx={checkOutV2ShippingMethodSelectionFieldsetSX}
							disabled={!validateAddress(selectedAddress)}
						>
							<FormHelperText
								sx={checkOutV2ShippingMethodSelectionFormHelperTextSX}
								component="legend"
							>
								{shippingNLS.Labels.SelectShippingMethod.t()}
							</FormHelperText>
							<RadioGroup
								aria-labelledby="shipping-method"
								sx={checkOutV2ShippingMethodRadioGroupSX}
								data-testid="shipping-method-select"
								id="shipping-method-select"
								value={selectedShipModeId}
								onChange={onChange}
								name="shipMode"
							>
								{availableMethods.map((m) => (
									<Stack sx={checkOutV2ShippingMethodSelectionOptionStackSX} key={m.shipModeId}>
										<FormControlLabel
											sx={checkOutV2ShippingMethodSelectionFormLabelSX}
											value={m.shipModeId}
											control={<Radio sx={checkOutV2ShippingMethodSelectionRadioSX} />}
											label={
												<Typography variant="body1">{m.description || m.shipModeCode}</Typography>
											}
										/>
									</Stack>
								))}
							</RadioGroup>
							{isLoading ? (
								<Box sx={checkOutV2ShippingMethodLoadingIndicatorSX}>
									<ProgressIndicator />
								</Box>
							) : null}
						</FormControl>
					</Grid>
				</Grid>
			</Box>
			{showError && isEmpty(selectedShipModeId) ? (
				<Alert variant="outlined" severity="error">
					{shippingNLS.Msgs.SelectShipMethod.t()}
				</Alert>
			) : null}
		</Stack>
	);
};
