/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { resBreak } from '@/utils/resBreak';
import { StackProps } from '@mui/material';

export const bundleTableQuantityStack: StackProps = {
	direction: resBreak({ mobile: 'column', desktop: 'row' }),
	alignItems: resBreak({ mobile: 'flex-start', desktop: 'center' }),
	justifyContent: resBreak({ mobile: 'center', desktop: 'flex-start' }),
};
