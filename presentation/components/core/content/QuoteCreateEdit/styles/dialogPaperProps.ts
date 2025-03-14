/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024, 2025.
 */

import { quoteCreateEditDialogPaperSX } from '@/components/content/QuoteCreateEdit/styles/dialogPaper';
import type { DialogProps } from '@mui/material/Dialog';

/**
 * @deprecated this export will be removed in future versions
 */
export const quoteCreateEditDialogPaperProps: DialogProps['PaperProps'] = {
	sx: quoteCreateEditDialogPaperSX,
};
