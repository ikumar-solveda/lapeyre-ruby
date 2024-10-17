/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { SxProps, Theme } from '@mui/material';

export const numberInputContainerSX = (showControls: boolean): SxProps<Theme> =>
	showControls
		? {
				input: {
					textAlign: 'center',
					p: 1,
				},
		  }
		: {};
