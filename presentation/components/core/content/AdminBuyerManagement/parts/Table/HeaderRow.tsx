/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { adminBuyerManagementTableHeadSX } from '@/components/content/AdminBuyerManagement/styles/Table/head';
import { ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeans } from '@/data/Content/Admin_BuyerManagement';
import { TableSortLabel } from '@mui/material';
import { HeaderGroup, flexRender } from '@tanstack/react-table';
import { FC } from 'react';

export const AdminBuyerManagementTableHeaderRow: FC<{
	headerGroup: HeaderGroup<ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeans>;
}> = ({ headerGroup }) => (
	<TableRow
		sx={adminBuyerManagementTableHeadSX}
		id={`buyer-management-table-header-row-${headerGroup.id}`}
		data-testid={`buyer-management-table-header-row-${headerGroup.id}`}
	>
		{headerGroup.headers.map((header) => (
			<TableCell
				colSpan={header.colSpan}
				key={`buyer-management-table-header-row-${headerGroup.id}-cell-${header.id}`}
				id={`buyer-management-table-header-row-${headerGroup.id}-cell-${header.id}`}
				data-testid={`buyer-management-table-header-row-${headerGroup.id}-cell-${header.id}`}
			>
				<TableSortLabel
					active={header.column.getIsSorted() !== false}
					hideSortIcon={header.column.getIsSorted() === false}
					direction={(header.column.getIsSorted() || undefined) as 'desc' | 'asc' | undefined}
					onClick={header.column.getToggleSortingHandler()}
				>
					{flexRender(header.column.columnDef.header, header.getContext())}
				</TableSortLabel>
			</TableCell>
		))}
	</TableRow>
);
