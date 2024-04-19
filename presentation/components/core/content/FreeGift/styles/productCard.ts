/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { SxProps, Theme } from '@mui/material';

export const freeGiftProductCardSX = (selected: boolean): SxProps<Theme> => ({
	height: 'unset',
	width: '200px',
	border: '1px solid',
	borderColor: 'divider',
	...(selected && { borderColor: 'primary.main' }),
});
