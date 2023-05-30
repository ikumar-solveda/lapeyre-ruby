/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

const sapphireOrderManagementContent = (theme: Theme): SxProps => ({
	img: {
		opacity: 0.9,
		flex: 1,
	},
	width: '100vw',
	left: '50%',
	right: '50%',
	marginLeft: '-50vw',
	marginRight: '-50vw',

	'.marketing-text': {
		width: '600px',
		maxWidth: '90%',
		p: `0 ${theme.spacing(2)} ${theme.spacing(1)}`,
		fontWeight: 500,
		color: 'black',
		backgroundColor: 'rgba(255, 255, 255, 0.6)',
		border: '2px solid white',
		borderRadius: '6px',
		h4: {
			fontWeight: 400,
		},
		[theme.breakpoints.up('sm')]: {
			p: `${theme.spacing(1)} ${theme.spacing(3)} ${theme.spacing(2)}`,
		},
	},

	[theme.breakpoints.up('sm')]: {
		'.marketing-text': {
			p: `${theme.spacing(2)} ${theme.spacing(4)}`,
		},
	},

	[theme.breakpoints.down('sm')]: {
		'.marketing-text': {
			p: `${theme.spacing(1)} ${theme.spacing(2)}`,
		},
	},
});

export default sapphireOrderManagementContent;
