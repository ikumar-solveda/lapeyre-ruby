/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps } from '@mui/material/styles';

const known: Record<string, boolean> = {
	New: true,
	Sale: true,
	Exclusive: true,
};

export const chipAdSX = (name: string): SxProps => ({
	boxShadow: '0px 1px 1px 1px rgba(0,0,0,0.15)',
	color: 'common.white',
	backgroundColor: 'primary.dark',
	fontWeight: 600,
	mr: 1,
	mb: 1,
	...(known[name] ? { background: '#c10c0d' } : {}),
	'> span.MuiChip-label': {
		pt: '2px',
	},
});
