/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { tableCellSX } from '@/components/email/blocks/Table/styles/tableCell';
import { combineSX } from '@/utils/combineSX';
import Cell from '@mui/material/TableCell';
import { ComponentPropsWithRef, FC } from 'react';

export const TableCell: FC<ComponentPropsWithRef<typeof Cell>> = ({ sx, ...otherProps }) => (
	<Cell {...otherProps} sx={combineSX([...[tableCellSX, sx]])} />
);
