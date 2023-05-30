/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps } from '@mui/material/styles';

export const addressCardSX = (selected: boolean, invalid = false): SxProps => ({
	position: 'relative',
	border: selected ? '2px solid' : '1px solid',
	borderColor: selected ? (invalid ? 'border.alert' : 'border.dark') : 'divider',
	a: { fontWeight: 400 },
});
