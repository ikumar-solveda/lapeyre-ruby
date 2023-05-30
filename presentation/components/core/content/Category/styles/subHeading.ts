/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material/styles';

export const categorySubHeadingSX: SxProps<Theme> = (theme) => ({
	[theme.breakpoints.down('md')]: {
		fontSize: '0.9rem',
		mt: 1,
	},
});
