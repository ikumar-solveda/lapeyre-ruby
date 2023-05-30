/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, ComponentPropsWithRef } from 'react';
import { TableBody as Body } from '@mui/material';
import { combineSX } from '@/utils/combineSX';
import { tableBodySX } from '@/components/blocks/Table/styles/tableBody';

export const TableBody: FC<ComponentPropsWithRef<typeof Body>> = ({ sx, ...otherProps }) => (
	<Body {...otherProps} sx={combineSX([tableBodySX, sx])} />
);
