/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const footerContainerSX = (csrSession: boolean): SxProps<Theme> => ({
	borderRadius: '0',
	boxShadow: 3,
	alignSelf: 'stretch',
	justifySelf: 'flex-end',
	backgroundColor: 'background.paper',
	color: 'background.disabled',
	img: {
		height: (theme) => theme.spacing(3),
	},
	...(!csrSession && { mt: 'auto' }),
});
