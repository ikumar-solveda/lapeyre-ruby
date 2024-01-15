/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { SxProps, Theme } from '@mui/material';

export type AnyObject = Record<string, unknown>;
export type AttributesObject = {
	[key: string]: string | boolean | number | SxProps<Theme> | AnyObject;
};
