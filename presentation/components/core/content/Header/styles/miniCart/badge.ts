/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { headerBreak } from '@/components/content/Header/styles/break';
import { SxProps } from '@mui/material';

export const headerMiniCartBadgeSX: SxProps = {
	'.MuiBadge-badge': {
		right: 1,
		top: 6,
		border: `2px solid`,
		color: 'primary.dark',
		backgroundColor: 'background.paper',
		padding: '1px 4px',
		display: headerBreak({ mobile: '', desktop: 'none' }),
	},
};
