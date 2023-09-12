/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { resBreak } from '@/utils/resBreak';
import { StackProps } from '@mui/material';

export const productDetailsAddToCartStack = (standalone?: boolean): StackProps => ({
	direction: resBreak({ mobile: 'column', tablet: 'row' }),
	spacing: 1,
	justifyContent: resBreak({ mobile: 'center', tablet: standalone ? 'flex-end' : 'flex-start' }),
});
