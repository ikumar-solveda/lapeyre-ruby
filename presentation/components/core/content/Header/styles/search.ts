/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { headerBreak } from '@/components/content/Header/styles/break';
import { SxProps } from '@mui/material';

export const headerSearchSX = ({ isMobile }: { isMobile?: boolean }): SxProps => ({
	width: isMobile ? 'inherit' : '45ch',
	display: isMobile
		? headerBreak({ mobile: 'flex', desktop: 'none' })
		: headerBreak({ mobile: 'none', desktop: 'inherit' }),
	...(isMobile ? { mb: 2, mx: 2 } : {}),

	'.MuiOutlinedInput-input': {
		'&::-webkit-input-placeholder': {
			opacity: 0.8,
		},
	},
});
