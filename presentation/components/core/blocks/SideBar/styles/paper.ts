/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps } from '@mui/material/styles';

export const sidebarPaperSX = ({
	isMobile = false,
	scrollable = false,
}: {
	isMobile: boolean;
	scrollable: boolean;
}): SxProps => ({
	...(isMobile && { borderRadius: 0 }),
	...(scrollable && { overflowY: 'auto' }),
});
