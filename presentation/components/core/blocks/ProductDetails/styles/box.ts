/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SxProps, Theme } from '@mui/material';

export const productDetailsBoxSX =
	(isSelected?: boolean): SxProps<Theme> =>
	(_theme) => ({
		width: '250px',
		height: '120px',
		borderRadius: 1,
		position: 'relative',
		color: 'button.primary',
		alignItems: 'center',
		display: 'flex',
		backgroundColor: 'inherit',
		border: '2px solid',
		borderColor: isSelected ? 'border.active' : 'border.inactive',
	});
