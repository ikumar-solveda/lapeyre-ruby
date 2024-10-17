/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { resBreak } from '@/utils/resBreak';
import { StackProps } from '@mui/material';

export const gpsiacTableSkuListTableDetailPanelStack: StackProps = {
	sx: { p: 2 },
	direction: resBreak({ mobile: 'column', tablet: 'row' }),
	spacing: 2,
};
