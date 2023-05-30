/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme, ButtonProps, Interpolation } from '@mui/material';

export const buttonVariants: {
	props: Partial<ButtonProps<'button', SxProps>>;
	style: Interpolation<{ theme: Theme }>;
}[] = [
	{
		props: { variant: 'inline' },
		style: {
			display: 'inline',
			padding: '0',
			fontSize: '0.9rem',
			boxShadow: 'none',
			minWidth: 'unset',
			color: 'primary.main',
			textDecoration: 'underline',
			textDecorationSkipInk: 'auto',
			textDecorationThickness: '1px',
			textUnderlineOffset: '.15em',
			fontWeight: 500,
			'&:hover': {
				color: 'primary.dark',
				textDecoration: 'underline',
				textDecorationThickness: '1px',
				background: 'none',
			},
		},
	},
];
