/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC } from 'react';
import { HeaderGroup } from 'react-table';
import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { orderHistoryTableHeadSX } from '@/components/content/OrderHistory/styles/orderHistoryTableHead';

export const OrderHistoryTableHeaderRow: FC<{
	headerGroup: HeaderGroup<Record<string, unknown>>;
}> = ({ headerGroup }) => (
	<TableRow sx={orderHistoryTableHeadSX} {...headerGroup.getHeaderGroupProps()}>
		{headerGroup.headers.map((column) => (
			<TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell> // eslint-disable-line react/jsx-key
		))}
	</TableRow>
);
