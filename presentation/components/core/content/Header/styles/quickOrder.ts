/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { headerBreak } from '@/components/content/Header/styles/break';
import type { SxProps } from '@mui/material';

export const headerQuickOrderSX: SxProps = {
	display: headerBreak({ mobile: 'none', desktop: 'block' }),
	textAlign: 'center',
};
