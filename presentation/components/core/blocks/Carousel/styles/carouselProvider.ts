/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const carouselProviderSX: SxProps<Theme> = (theme) => ({
	position: 'relative',
	py: 0,
	px: 8,
	// mt: 3,
	// height: '320px',
	[theme.breakpoints.down(410)]: {
		'.carousel__slider.carousel__slider--horizontal': {
			height: 'inherit',
			'> .carousel__slider-tray-wrapper.carousel__slider-tray-wrap--horizontal': {
				height: 'inherit',
				'> .carousel__slider-tray.carousel__slider-tray--horizontal': {
					height: 'inherit',
					'> .carousel__slide': {
						height: 'inherit',
					},
				},
			},
		},
	},

	'.carousel__back-button, .carousel__next-button': {
		position: 'absolute',
		top: '50%',
		transform: 'translateY(-50%)',
		height: (theme) => theme.spacing(5),
		width: (theme) => theme.spacing(5),
		borderRadius: '50%',
		background: 'none',
		border: '1px solid transparent',

		'&:hover': {
			cursor: 'pointer',
			color: 'primary.main',
			borderColor: 'primary.light',
		},
	},

	'.carousel__back-button': {
		left: 0,
	},

	'.carousel__next-button': {
		right: 0,
	},

	div: {
		outline: 'none',
	},
});
