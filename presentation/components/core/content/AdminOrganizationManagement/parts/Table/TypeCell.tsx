/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { useLocalization } from '@/data/Localization';
import { OrganizationManagementTableData } from '@/data/types/Admin_OrganizationManagement';
import { Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';

export const AdminOrganizationManagementTableTypeCell: FC<
	CellContext<OrganizationManagementTableData, unknown>
> = ({ column, row }) => {
	const { orgEntityType } = row.original;
	const localization = useLocalization('OrganizationManagement');
	return (
		<TableCellResponsiveContent label={column.columnDef.header as string}>
			<Typography>
				{localization[`EntityType_${orgEntityType}` as keyof typeof localization].t()}
			</Typography>
		</TableCellResponsiveContent>
	);
};
