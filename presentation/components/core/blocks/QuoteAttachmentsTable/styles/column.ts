/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import type { SxProps } from '@mui/material';

export const quoteAttachmentsTableCellSX = (meta: Record<string, any>): SxProps => ({
	...(meta?.width !== undefined && {
		width: meta.width,
		maxWidth: meta.width,
	}),
});
