/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { resBreak } from '@/utils/resBreak';
import type { StackProps } from '@mui/material';

export const inProgressOrdersTitleStack: StackProps = {
	direction: resBreak({ mobile: 'row' }),
	justifyContent: resBreak({ mobile: 'space-between' }),
	alignItems: resBreak({ mobile: 'center' }),
};
