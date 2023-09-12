/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { resBreak } from '@/utils/resBreak';
import { StackProps } from '@mui/material';

export const requisitionListDetailsTableDetailPanelStack: StackProps = {
	direction: resBreak({ tablet: 'column', desktop: 'row' }),
	spacing: 2,
};
