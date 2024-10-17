/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

type MaybeSX = SxProps<Theme> | undefined | false;

export const combineSX = (SxArray: MaybeSX[]) =>
	[...(Array.isArray(SxArray) ? SxArray.filter(Boolean) : [SxArray])].flat() as SxProps<Theme>;
