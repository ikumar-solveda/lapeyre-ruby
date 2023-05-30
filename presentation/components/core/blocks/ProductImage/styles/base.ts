/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const productImageBaseSX: SxProps<Theme> = {
	position: 'relative',
	maxHeight: '550px',
	transition: (theme) => theme.transitions.create('border-color'),
};
