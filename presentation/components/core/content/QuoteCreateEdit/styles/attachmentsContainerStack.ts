/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { resBreak } from '@/utils/resBreak';
import type { StackProps } from '@mui/material';

export const quoteCreateEditAttachmentsContainerStack: StackProps = {
	sx: {
		width: resBreak<'width'>({ desktop: '50%' }),
	},
};
