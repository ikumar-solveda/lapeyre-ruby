/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { resBreak } from '@/utils/resBreak';
import type { StackProps } from '@mui/material';

export const quotesContentStack: StackProps = {
	spacing: 2,
	direction: resBreak({ mobile: 'column', desktop: 'row' }),
	alignItems: resBreak({ mobile: 'flex-start', desktop: 'center' }),
	justifyContent: 'space-between',
	sx: { py: 2 },
};
