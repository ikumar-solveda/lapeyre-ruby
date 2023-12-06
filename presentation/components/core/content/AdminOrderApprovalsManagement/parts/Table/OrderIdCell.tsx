/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { useLocalization } from '@/data/Localization';
import { AdminApprovalsManagementTableData } from '@/data/types/Admin_ApprovalsManagement';
import { Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';

export const AdminOrderApprovalsManagementTableOrderIdCell: FC<
	CellContext<AdminApprovalsManagementTableData, unknown>
> = ({ column, row }) => {
	const { entityId, submitter, approvalStatusId } = row.original;
	const { OrderApprovalDetails } = useLocalization('Routes');

	const fullName = [submitter?.firstName, submitter?.lastName].filter(Boolean).join(' ');
	return (
		<TableCellResponsiveContent label={column.columnDef.header as string}>
			<Linkable
				href={{
					pathname: OrderApprovalDetails.route.t(),
					query: { entityId, fullName, approvalStatusId },
				}}
				id={`order-approval-details-${entityId}`}
				data-testid={`order-approval-details-${entityId}`}
			>
				<Typography>{entityId}</Typography>
			</Linkable>
		</TableCellResponsiveContent>
	);
};
