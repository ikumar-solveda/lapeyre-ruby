/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { StackProps, SxProps, Theme } from '@mui/material';

const orderDetailsV2ActionStackSX: SxProps<Theme> = (theme) => ({
	px: 2,
	py: 2,
	[theme.breakpoints.down('lg')]: {
		px: 0,
	},
});

export const orderDetailsV2ActionStack: StackProps = {
	direction: { xs: 'column-reverse', md: 'row', lg: 'column-reverse' },
	justifyContent: 'space-between',
	gap: 2,
	sx: orderDetailsV2ActionStackSX,
};
