/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */
import { resBreak } from '@/utils/resBreak';
import type { StackProps } from '@mui/material';

export const inProgressOrderDetailsTableAttributeStack: StackProps = {
	direction: resBreak({ mobile: 'row', desktop: 'column' }),
	spacing: 1,
};
