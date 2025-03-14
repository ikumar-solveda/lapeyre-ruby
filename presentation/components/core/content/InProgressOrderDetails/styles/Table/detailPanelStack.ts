/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { resBreak } from '@/utils/resBreak';
import { StackProps } from '@mui/material';

export const inProgressOrderDetailsTableDetailPanelStack: StackProps = {
	direction: resBreak({ mobile: 'column', desktop: 'row' }),
	spacing: 1,
	padding: 1,
};
