/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { resBreak } from '@/utils/resBreak';
import { StackProps } from '@mui/material';

export const gpsiacTableSkuListTableDetailPanelDrawerStack: StackProps = {
	direction: resBreak({ mobile: 'row', desktop: 'column' }),
	spacing: 1,
};
