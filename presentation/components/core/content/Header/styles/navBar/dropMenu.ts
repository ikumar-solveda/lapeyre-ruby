/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps } from '@mui/material';

export const headerNavBarDropMenuSX: SxProps = {
	borderTopRightRadius: 0,
	borderTopLeftRadius: 0,
	maxWidth: 'calc(100vw - 40px)',
	boxShadow: 2,
	backgroundColor: 'background.paper',
	color: 'background.contrastText',
	'@media (hover: hover)': {
		py: 0,
		px: 1,
	},

	'.MuiTooltip-popper[data-popper-placement*="bottom"] > &': {
		'@media (hover: hover)': {
			mt: 0,
			ml: -2,
		},
		'@media (hover: none)': {
			mt: 0.75,
		},
	},
};
