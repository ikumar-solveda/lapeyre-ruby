/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { resBreak } from '@/utils/resBreak';
import { StackProps } from '@mui/material';

export const requisitionListsFileUploadStack: StackProps = {
	spacing: resBreak({ mobile: 1, desktop: 2 }),
	direction: resBreak({ mobile: 'column', desktop: 'row' }),
	justifyContent: 'flex-start',
	alignItems: resBreak({ mobile: 'flex-start', desktop: 'center' }),
};
