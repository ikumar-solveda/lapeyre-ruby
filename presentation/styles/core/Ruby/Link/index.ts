/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ThemeOptions } from '@mui/material/styles';

export const Link: ThemeOptions = {
	components: {
		MuiLink: {
			defaultProps: {
				// The props to change the default for.
				underline: 'none',
			},
		},
	},
};
