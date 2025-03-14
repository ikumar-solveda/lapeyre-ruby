/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { resBreak } from '@/utils/resBreak';
import type { SxProps, Theme } from '@mui/material';

export const inProgressOrderDetailsBrowseAndAddProductAutocompleteSX: SxProps<Theme> = (
	theme: Theme
) => ({
	width: resBreak<'width'>({ mobile: '100%', tablet: '400px' }),
	'& + .MuiAutocomplete-popper': {
		zIndex: theme.zIndex.appBar - 1,
	},
});
