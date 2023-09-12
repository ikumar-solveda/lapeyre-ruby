/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const headerPopperSX: SxProps<Theme> = (theme: Theme) => ({
	zIndex: theme.zIndex.appBar + 1,
});
