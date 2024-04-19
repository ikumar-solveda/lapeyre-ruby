/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { orderTableNestedHeaderSX } from '@/components/email/blocks/Table/styles/orderTableNestedHeader';
import { combineSX } from '@/utils/combineSX';
import Cell from '@mui/material/TableCell';
import { ComponentPropsWithRef, FC } from 'react';

export const OrderTableNestedHeader: FC<ComponentPropsWithRef<typeof Cell>> = ({
	sx,
	...otherProps
}) => <Cell {...otherProps} sx={combineSX([...[orderTableNestedHeaderSX, sx]])} />;
