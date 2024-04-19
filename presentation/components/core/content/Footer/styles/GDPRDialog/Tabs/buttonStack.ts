/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { resBreak } from '@/utils/resBreak';
import { StackProps } from '@mui/material';

export const footerGDPRDialogTabsButtonsStack: StackProps = {
	direction: resBreak({ mobile: 'column', tablet: 'row' }),
	justifyContent: 'flex-end',
	p: 2,
	spacing: 1,
};
