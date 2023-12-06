/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { adminOrganizationManagementTableCellTypography } from '@/components/content/AdminOrganizationManagement/styles/Table/cellTypography';
import { useLocalization } from '@/data/Localization';
import { ORGANIZATION_MANAGEMENT_TABLE } from '@/data/constants/admin_organizationManagement';
import { OrganizationManagementTableData } from '@/data/types/Admin_OrganizationManagement';
import { Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';

export const AdminOrganizationManagementNameCell: FC<
	CellContext<OrganizationManagementTableData, unknown>
> = ({ column, row }) => {
	const route = useLocalization('Routes').OrganizationManagementEdit.route;
	const { organizationName, organizationId } = row.original;

	return (
		<TableCellResponsiveContent label={column.columnDef.header as string}>
			<Linkable
				href={{ pathname: route.t(), query: { organizationId } }}
				id={`${ORGANIZATION_MANAGEMENT_TABLE}-${organizationId}`}
				data-testid={`${ORGANIZATION_MANAGEMENT_TABLE}-${organizationId}`}
			>
				<Typography sx={adminOrganizationManagementTableCellTypography}>
					{organizationName}
				</Typography>
			</Linkable>
		</TableCellResponsiveContent>
	);
};
