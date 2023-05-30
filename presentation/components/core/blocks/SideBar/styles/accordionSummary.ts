/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material/styles';

export const sidebarAccordionSummarySX = ({
	isMobile = false,
}: {
	isMobile: boolean;
}): SxProps<Theme> => ({
	lineHeight: (theme) => theme.spacing(8),
	height: (theme) => theme.spacing(8),
	...(isMobile && {
		backgroundColor: 'primary.main',
		color: 'primary.contrastText',
	}),
});
