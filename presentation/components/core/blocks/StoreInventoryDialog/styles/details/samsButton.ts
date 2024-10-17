/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { resBreak } from '@/utils/resBreak';
import { SxProps } from '@mui/material';

export const storeInventoryDialogDetailsSAMSButtonSX: SxProps = {
	width: resBreak<'width'>({ mobile: '100%', desktop: 'fit-content' }),
};
