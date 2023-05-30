/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const numberInputContainerSX = (showControls: boolean): SxProps<Theme> =>
	showControls
		? {
				input: {
					textAlign: 'center',
					px: 1,
				},
		  }
		: {};
