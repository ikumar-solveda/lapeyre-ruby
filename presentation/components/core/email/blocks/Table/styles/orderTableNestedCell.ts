/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { orderTableCellSX } from '@/components/email/blocks/Table/styles/orderTableCell';
import { SxProps } from '@mui/material';

export const orderTableNestedCellSX: SxProps = {
	...orderTableCellSX,
	'tr:not(:last-child)> &': {
		borderBottomWidth: 1,
		borderBottomStyle: 'solid',
	},
};
