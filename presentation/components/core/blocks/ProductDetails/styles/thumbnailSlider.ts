/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const productDetailsThumbnailSliderSX: SxProps<Theme> = (theme) => ({
	position: 'relative',
	textAlign: 'center',
	minWidth: theme.spacing(8),
	'.slide': {
		boxSizing: 'unset',
	},

	'div, button': {
		outline: 'none',
	},

	'.carousel__back-button, .carousel__next-button': {
		height: theme.spacing(5),
		width: theme.spacing(5),
		background: 'none',
		borderRadius: '50%',
		border: '1px solid transparent',

		'&:hover': {
			cursor: 'pointer',
			color: theme.palette.primary.main,
			borderColor: theme.palette.primary.light,
		},
	},

	'.carousel__inner-slide': {
		padding: '1px',
		'.ribbon-ad': {
			[theme.breakpoints.up('md')]: {
				display: 'none',
			},
		},
	},

	[theme.breakpoints.down('md')]: {
		maxHeight: theme.spacing(50),

		'.carousel__back-button, .carousel__next-button': {
			position: 'absolute',
			top: '50%',
			transform: 'translateY(-50%)',
		},

		'.carousel__back-button': {
			left: '0',
		},

		'.carousel__next-button': {
			right: 0,
		},

		'.carousel__dot-group': {
			position: 'absolute',
			left: 0,
			top: theme.spacing(1),
		},

		'.carousel__dot': {
			width: theme.spacing(2),
			height: theme.spacing(2),
			borderRadius: theme.spacing(1),
			margin: theme.spacing(0.5),
			border: `1px solid ${theme.palette.grey[300]}`,
			backgroundColor: theme.palette.grey[300],
			transition: `background-color ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeIn}`,

			'&:hover': {
				backgroundColor: theme.palette.secondary.light,
			},

			'&.carousel__dot--selected': {
				backgroundColor: theme.palette.grey[200],
				borderColor: theme.palette.grey[300],
			},
		},
	},
});
