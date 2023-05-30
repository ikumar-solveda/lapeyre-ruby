/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps } from '@mui/material';

export const previewWidgetFrameInfoButton: SxProps = {
	boxShadow: '0 1px 3px 0 #00000033',
	minHeight: '30px',
	minWidth: '30px',
	pointerEvents: 'auto',
	float: 'right',
	p: 0.25,
	borderRadius: '4px',
	borderColor: 'info.main',
	backgroundColor: 'white',
	'&:hover': {
		backgroundColor: 'white',
		borderColor: 'info.main',
	},
};
