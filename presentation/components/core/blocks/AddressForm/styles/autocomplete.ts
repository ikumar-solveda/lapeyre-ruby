/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { SxProps, Theme } from '@mui/material';

export const addressFormAutocompleteSX: SxProps<Theme> = (theme: Theme) => ({
	'& + .MuiAutocomplete-popper': {
		zIndex: theme.zIndex.appBar - 1,
	},
});
