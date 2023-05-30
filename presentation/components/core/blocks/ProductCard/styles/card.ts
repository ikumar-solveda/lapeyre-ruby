/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps } from '@mui/material';

export const productCardSX: SxProps = {
	p: 2,
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	'&:hover': {
		boxShadow: 3,
	},
};
