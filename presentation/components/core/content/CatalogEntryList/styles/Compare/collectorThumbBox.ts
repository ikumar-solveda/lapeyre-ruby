/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const catalogEntryListCompareCollectorThumbBoxSX: SxProps<Theme> = (theme) => ({
	position: 'relative',
	display: 'flex',
	p: 1,
	gap: theme.spacing(1),
	alignItems: 'center',
	'&:not(:last-child)': {
		borderRightWidth: 0,
	},
});
