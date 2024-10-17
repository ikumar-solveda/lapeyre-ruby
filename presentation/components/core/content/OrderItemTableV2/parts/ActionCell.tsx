/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { OrderItemTableV2Actions } from '@/components/content/OrderItemTableV2/parts/Actions';
import { OrderTableData } from '@/data/types/OrderItemTableV2';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';

export const OrderItemTableV2ActionCell: FC<CellContext<OrderTableData, unknown>> = ({ row }) => (
	<TableCellResponsiveContent label={null}>
		<OrderItemTableV2Actions row={row.original} />
	</TableCellResponsiveContent>
);
