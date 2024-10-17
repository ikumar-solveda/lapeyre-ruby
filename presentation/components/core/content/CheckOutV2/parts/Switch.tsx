/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { FormControlLabel, FormGroup, Switch, SwitchProps } from '@mui/material';
import { FC } from 'react';

type Props = SwitchProps & { label: string };

export const CheckOutV2Switch: FC<Props> = ({ checked, onChange, disabled, label }) => (
	<FormGroup>
		<FormControlLabel
			control={
				<Switch
					id="checkout-switch"
					data-testid="checkout-switch"
					checked={checked}
					onChange={onChange}
					disabled={disabled}
				/>
			}
			label={label}
		/>
	</FormGroup>
);
