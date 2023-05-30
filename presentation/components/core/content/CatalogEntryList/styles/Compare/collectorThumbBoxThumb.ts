/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const catalogEntryListCompareCollectorThumbBoxThumbSX: SxProps<Theme> = (theme) => ({
	backgroundColor: 'common.white',
	border: `1px dashed black`,
	img: {
		p: 1,
		width: theme.spacing(10),
		height: theme.spacing(10),
		maxHeight: '100%',
		maxWidth: '100%',
	},
});
