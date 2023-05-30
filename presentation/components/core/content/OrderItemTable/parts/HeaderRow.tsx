/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC } from 'react';
import { HeaderGroup } from 'react-table';
import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export const OrderItemTableHeaderRow: FC<{
	headerGroup: HeaderGroup<Record<string, unknown>>;
}> = ({ headerGroup }) => (
	<TableRow {...headerGroup.getHeaderGroupProps()}>
		{headerGroup.headers.map((column) => (
			// eslint-disable-next-line react/jsx-key
			<TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
				{column.render('Header')}
				{column.isSorted ? (
					column.isSortedDesc ? (
						<ArrowDownwardIcon fontSize="small" />
					) : (
						<ArrowUpwardIcon fontSize="small" />
					)
				) : (
					''
				)}
			</TableCell>
		))}
	</TableRow>
);
