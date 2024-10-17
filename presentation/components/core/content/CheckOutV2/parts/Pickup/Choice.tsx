/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { usePickup } from '@/data/Content/Pickup';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import {
	Divider,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Stack,
	Typography,
} from '@mui/material';
import { FC, useContext } from 'react';

export const CheckOutV2PickupChoice: FC = () => {
	const pickupNLS = useLocalization('Pickup');
	const { selfPickup, toggleSelfPickup } = useContext(ContentContext) as ReturnType<
		typeof usePickup
	>;
	return (
		<Stack spacing={2}>
			<Typography variant="subtitle1">{pickupNLS.PickupOrderMsg.t()}</Typography>
			<FormControl>
				<RadioGroup value={selfPickup} onChange={toggleSelfPickup}>
					<FormControlLabel
						data-testid="pickup-choice-self"
						id="pickup-choice-self"
						value="true"
						control={<Radio />}
						label={pickupNLS.IllPickupRadioLabel.t()}
					/>
					<FormControlLabel
						data-testid="pickup-choice-non-self"
						id="pickup-choice-non-self"
						value="false"
						control={<Radio />}
						label={pickupNLS.SomeoneElseRadioLabel.t()}
					/>
				</RadioGroup>
			</FormControl>
			<Divider />
		</Stack>
	);
};
