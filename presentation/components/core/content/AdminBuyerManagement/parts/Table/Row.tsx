/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { AdminBuyerManagementContextValues } from '@/components/content/AdminBuyerManagement/parts/Table';
import { AdminBuyerManagementTableAccess } from '@/components/content/AdminBuyerManagement/parts/Table/Access';
import { AdminBuyerManagementTableActions } from '@/components/content/AdminBuyerManagement/parts/Table/Actions';
import { AdminBuyerManagementTableFirstName } from '@/components/content/AdminBuyerManagement/parts/Table/FirstName';
import { AdminBuyerManagementTableLastName } from '@/components/content/AdminBuyerManagement/parts/Table/LastName';
import { AdminBuyerManagementTableLogonId } from '@/components/content/AdminBuyerManagement/parts/Table/LogonId';
import { AdminBuyerManagementTableRole } from '@/components/content/AdminBuyerManagement/parts/Table/Role';
import { adminBuyerManagementTableRowSX } from '@/components/content/AdminBuyerManagement/styles/Table/row';
import { ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeans } from '@/data/Content/Admin_BuyerManagement';
import { ContentProvider } from '@/data/context/content';
import { Switch } from '@/utils/switch';
import { Row } from '@tanstack/react-table';
import { FC, useMemo } from 'react';

export const AdminBuyerManagementTableRow: FC<
	{
		row: Row<ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeans>;
	} & AdminBuyerManagementContextValues
> = ({ row, ...ctxValues }) => {
	const value = useMemo(() => ({ ...ctxValues, buyer: row.original }), [ctxValues, row]);
	return (
		<ContentProvider value={value}>
			<TableRow
				id={`buyer-management-table-row-${row.id}`}
				data-testid={`buyer-management-table-row-${row.id}`}
				sx={adminBuyerManagementTableRowSX}
				responsive
			>
				{row.getVisibleCells().map((cell: any) => (
					<TableCell
						key={`buyer-management-table-cell-${cell.id}`} // cell.id is {row.id}_{column.id}
						id={`buyer-management-table-cell-${cell.id}`}
						data-testid={`buyer-management-table-cell-${cell.id}`}
						responsive
					>
						{Switch(cell.column.id)
							.case('firstName', () => <AdminBuyerManagementTableFirstName />)
							.case('lastName', () => <AdminBuyerManagementTableLastName />)
							.case('logonId', () => <AdminBuyerManagementTableLogonId />)
							.case('role', () => <AdminBuyerManagementTableRole />)
							.case('access', () => <AdminBuyerManagementTableAccess />)
							.case('actions', () => <AdminBuyerManagementTableActions />)
							.defaultTo(() => null)}
					</TableCell>
				))}
			</TableRow>
		</ContentProvider>
	);
};
