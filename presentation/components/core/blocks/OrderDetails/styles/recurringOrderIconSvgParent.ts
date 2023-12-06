/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const recurringOrderIconSvgParentSX: SxProps<Theme> = (theme: Theme) => ({
	position: 'relative',
	flex: '0 0 auto',
	backgroundColor: 'action.hover',
	width: theme.spacing(7),
	height: theme.spacing(7),
	borderRadius: '50%',
	textAlign: 'center',
	'.MuiSvgIcon-root': {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translateY(-50%) translateX(-50%)',
		color: 'primary.main',
	},
});
