/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { orderTableCellSX } from '@/components/email/blocks/Table/styles/orderTableCell';
import { combineSX } from '@/utils/combineSX';
import Cell from '@mui/material/TableCell';
import { ComponentPropsWithRef, FC } from 'react';

export const OrderTableCell: FC<ComponentPropsWithRef<typeof Cell>> = ({ sx, ...otherProps }) => (
	<Cell {...otherProps} sx={combineSX([...[orderTableCellSX, sx]])} />
);
