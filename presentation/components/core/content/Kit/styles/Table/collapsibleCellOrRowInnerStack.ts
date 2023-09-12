/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { resBreak } from '@/utils/resBreak';
import { StackProps } from '@mui/material';

export const kitTableCollapsibleCellOrRowInnerStack: StackProps = {
	direction: resBreak({ mobile: 'row', desktop: 'column' }),
	spacing: 1,
};
