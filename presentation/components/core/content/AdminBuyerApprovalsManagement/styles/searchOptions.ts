/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { resBreak } from '@/utils/resBreak';
import { StackProps } from '@mui/material';

export const adminBuyerApprovalsManagementSearchOptionsSX: StackProps = {
	spacing: resBreak({ mobile: 1, desktop: 2 }),
	direction: resBreak({ mobile: 'column', desktop: 'row' }),
};
