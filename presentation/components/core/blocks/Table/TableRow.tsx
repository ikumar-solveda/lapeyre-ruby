/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, ComponentPropsWithRef } from 'react';
import { TableRow as Row } from '@mui/material';
import { combineSX } from '@/utils/combineSX';
import { tableRowSX } from '@/components/blocks/Table/styles/tableRow';

export const TableRow: FC<ComponentPropsWithRef<typeof Row>> = ({ sx, ...otherProps }) => (
	<Row {...otherProps} sx={combineSX([tableRowSX, sx])} role={undefined} />
);
