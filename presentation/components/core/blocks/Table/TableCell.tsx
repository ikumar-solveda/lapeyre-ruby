/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, ComponentPropsWithRef } from 'react';
import { TableCell as Cell } from '@mui/material';
import { combineSX } from '@/utils/combineSX';
import { tableCellSX } from '@/components/blocks/Table/styles/tableCell';

export const TableCell: FC<ComponentPropsWithRef<typeof Cell>> = ({ sx, ...otherProps }) => (
	<Cell {...otherProps} sx={combineSX([tableCellSX, sx])} role={undefined} />
);
