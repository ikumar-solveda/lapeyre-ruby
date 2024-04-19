/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { orderTableNestedCellSX } from '@/components/email/blocks/Table/styles/orderTableNestedCell';
import { combineSX } from '@/utils/combineSX';
import Cell from '@mui/material/TableCell';
import { ComponentPropsWithRef, FC } from 'react';

export const OrderTableNestedCell: FC<ComponentPropsWithRef<typeof Cell>> = ({
	sx,
	...otherProps
}) => <Cell {...otherProps} sx={combineSX([...[orderTableNestedCellSX, sx]])} />;
