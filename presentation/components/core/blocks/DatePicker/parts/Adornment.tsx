/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { datePickerAdornmentSX } from '@/components/blocks/DatePicker/styles/adornment';
import EventIcon from '@mui/icons-material/Event';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { type FC, useCallback } from 'react';

export const DatePickerAdornment: FC<TextFieldProps> = (props) => {
	const { onClick: intercept, ...rest } = props;
	const onClick = useCallback((event: any) => intercept && intercept(event), [intercept]);

	return (
		<TextField
			{...rest}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<IconButton sx={datePickerAdornmentSX} onClick={onClick}>
							<EventIcon />
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);
};
