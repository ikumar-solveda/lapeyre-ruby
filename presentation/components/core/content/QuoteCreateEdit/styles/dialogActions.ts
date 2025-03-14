/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024, 2025.
 */

import type { SxProps } from '@mui/material/styles';

type Props = {
	singleButton: boolean;
};

/**
 * @deprecated this export will be removed in future versions
 */
export const quoteCreateEditDialogActionsSX = (
	{ singleButton }: Props = { singleButton: false }
): SxProps => ({
	px: 0,
	py: 2,
	justifyContent: singleButton ? 'flex-end' : 'space-between',
});
