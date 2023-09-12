/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

export const tableCellResponsiveSX: SxProps<Theme> = (theme) => ({
	[theme.breakpoints.down('md')]: {
		// mobile view
		display: 'block',
		p: 1,
		':nth-of-type(odd)': {
			bgcolor: 'grey.100',
		},
	},
});
