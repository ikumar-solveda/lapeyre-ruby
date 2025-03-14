/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */
import { resBreak } from '@/utils/resBreak';
import { SxProps, Theme } from '@mui/material';

export const inProgressOrderDetailsTableItemDetailsImageSX: SxProps<Theme> = (theme) => ({
	width: 'auto',
	maxHeight: resBreak<'maxHeight'>({ mobile: theme.spacing(10), desktop: theme.spacing(12) }),
});
