/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const carouselSlideSX: SxProps<Theme> = (theme) => ({
	'&.carousel__slide': {
		textAlign: 'center',
		display: 'flex',
		justifyContent: 'center',
	},
	'.carousel__inner-slide': {
		position: 'relative',
		maxWidth: '245px',
		[theme.breakpoints.down(410)]: {
			minWidth: '195px',
		},
		[theme.breakpoints.up(410)]: {
			minWidth: '225px',
		},
		// maxHeight: '330px',
		pb: '2px',
		display: 'flex',
		flexDirection: 'column',
		'.MuiCard-root': {
			flexGrow: 1,
		},
	},
});
