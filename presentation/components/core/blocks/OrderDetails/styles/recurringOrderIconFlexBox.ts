/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { SxProps, Theme } from '@mui/material';

/** @deprecated  see `OrderDetailsV2` */
export const recurringOrderIconFlexBoxSX: SxProps<Theme> = (theme: Theme) => ({
	display: 'flex',
	flex: 'wrap',
	alignItems: 'center',
	'>.MuiBox-root:first-child': {
		pr: theme.spacing(2),
	},
});
