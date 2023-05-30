/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const accountToolIconSX = (disabled: boolean): SxProps<Theme> => ({
	position: 'relative',
	flex: 'none',
	backgroundColor: 'action.hover',
	width: (theme) => theme.spacing(7),
	height: (theme) => theme.spacing(7),
	borderRadius: '50%',
	mr: 2,

	'.MuiSvgIcon-root': {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translateY(-50%) translateX(-50%)',
		color: disabled ? 'text.disabled' : 'primary.main',
	},
});
