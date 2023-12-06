/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { adminOrganizationManagementTableCellTypography } from '@/components/content/AdminOrganizationManagement/styles/Table/cellTypography';
import { OrganizationManagementTableData } from '@/data/types/Admin_OrganizationManagement';
import { Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';

export const AdminOrganizationManagementDistinguishedNameCell: FC<
	CellContext<OrganizationManagementTableData, unknown>
> = ({ column, row }) => {
	const { distinguishedName } = row.original;
	return (
		<TableCellResponsiveContent label={column.columnDef.header as string}>
			<Typography sx={adminOrganizationManagementTableCellTypography}>
				{distinguishedName}
			</Typography>
		</TableCellResponsiveContent>
	);
};
