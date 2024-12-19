/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { StateLabels } from '@/data/constants/quotes';
import { SxProps } from '@mui/material';

export const quotesTableStatusDotSX = (status: number): SxProps => ({
	color: `quotes.status.${StateLabels[status].toLowerCase()}`,
	fontSize: 12,
	mr: 1,
});
