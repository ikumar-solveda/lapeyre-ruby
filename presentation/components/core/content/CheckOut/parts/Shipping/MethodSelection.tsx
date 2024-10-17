/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { IconLabel } from '@/components/blocks/IconLabel';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { shippingMethodSelectionFieldsetSX } from '@/components/content/CheckOut/styles/Shipping/methodSelection/fieldset';
import { shippingMethodSelectionFormHelperTextSX } from '@/components/content/CheckOut/styles/Shipping/methodSelection/formHelperText';
import { shippingMethodSelectionFormLabelSX } from '@/components/content/CheckOut/styles/Shipping/methodSelection/formLabel';
import { shippingMethodLoadingIndicatorSX } from '@/components/content/CheckOut/styles/Shipping/methodSelection/loadingIndicator';
import { shippingMethodSelectionOptionStackSX } from '@/components/content/CheckOut/styles/Shipping/methodSelection/optionStack';
import { shippingMethodSelectionRadioSX } from '@/components/content/CheckOut/styles/Shipping/methodSelection/radio';
import { shippingMethodRadioGroupSX } from '@/components/content/CheckOut/styles/Shipping/methodSelection/radioGroup';
import { useCheckOut } from '@/data/Content/CheckOut';
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

/** @deprecated */
export const ShippingMethodSelection: FC = () => {
	const shippingNLS = useLocalization('Shipping');
	const {
		availableMethods,
		selectedAddress,
		updateShippingInfo,
		selectedShipModeId,
		showError,
		isLoading,
	} = useContext(ContentContext) as ReturnType<typeof useCheckOut> & ReturnType<typeof useShipping>;

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
							sx={shippingMethodSelectionFieldsetSX}
							disabled={!validateAddress(selectedAddress)}
						>
							<FormHelperText sx={shippingMethodSelectionFormHelperTextSX} component="legend">
								{shippingNLS.Labels.SelectShippingMethod.t()}
							</FormHelperText>
							<RadioGroup
								aria-labelledby="shipping-method"
								sx={shippingMethodRadioGroupSX}
								data-testid="shipping-method-select"
								id="shipping-method-select"
								value={selectedShipModeId}
								onChange={onChange}
								name="shipMode"
							>
								{availableMethods.map((m) => (
									<Stack sx={shippingMethodSelectionOptionStackSX} key={m.shipModeId}>
										<FormControlLabel
											sx={shippingMethodSelectionFormLabelSX}
											value={m.shipModeId}
											control={<Radio sx={shippingMethodSelectionRadioSX} />}
											label={
												<Typography variant="body1">{m.description || m.shipModeCode}</Typography>
											}
										/>
									</Stack>
								))}
							</RadioGroup>
							{isLoading ? (
								<Box sx={shippingMethodLoadingIndicatorSX}>
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
