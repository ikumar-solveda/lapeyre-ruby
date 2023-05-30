/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps } from '@mui/material';

export const headerNavBarItemTouchDropButtonSX: SxProps = {
	mt: -2.5,
	mr: 2,
	minWidth: 0,
	borderTop: 1,
	borderTopColor: 'divider',
	'@media (hover: hover)': {
		display: 'none',
	},
	'&.MuiButton-text': {
		p: 0,
		textAlign: 'center',
		backgroundColor: 'transparent',
		color: 'divider',
		fontSize: 12,
		borderRadius: 0,
	},
};
