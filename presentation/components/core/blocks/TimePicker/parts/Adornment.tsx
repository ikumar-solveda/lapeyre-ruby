/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { timePickerAdornmentSX } from '@/components/blocks/TimePicker/styles/adornment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { type FC, useCallback } from 'react';

export const TimePickerAdornment: FC<TextFieldProps> = (props) => {
	const { onClick: intercept, ...rest } = props;
	const onClick = useCallback((event: any) => intercept && intercept(event), [intercept]);

	return (
		<TextField
			{...rest}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<IconButton sx={timePickerAdornmentSX} onClick={onClick}>
							<AccessTimeIcon />
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);
};
