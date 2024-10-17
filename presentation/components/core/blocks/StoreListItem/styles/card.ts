/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2024.
 */

import { SxProps, Theme } from '@mui/material';

export const storeListItemCardSX =
	(selected: boolean, highlight: boolean): SxProps<Theme> =>
	(theme: Theme) => ({
		width: '100%',
		px: 2,
		py: 1,
		...(selected && { backgroundColor: 'background.selectedStore' }),
		...(highlight && {
			'&:hover': {
				outline: `0.2em solid ${theme.palette.primary.main}`,
				cursor: 'pointer',
			},
		}),
	});
