/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { bundleTableDetailPanelSX } from '@/components/content/Bundle/styles/Table/detailPanel';
import { resBreak } from '@/utils/resBreak';
import { StackProps } from '@mui/material';

export const bundleTableDetailPanelStack: StackProps = {
	direction: resBreak({ mobile: 'column', tablet: 'row' }),
	spacing: 2,
	sx: bundleTableDetailPanelSX,
};
