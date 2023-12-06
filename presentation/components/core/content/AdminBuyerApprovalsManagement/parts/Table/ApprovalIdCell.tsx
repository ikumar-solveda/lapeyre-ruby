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

export const AdminBuyerApprovalsManagementTableApprovalIdCell: FC<
	CellContext<AdminApprovalsManagementTableData, unknown>
> = ({ column, row }) => {
	const { approvalStatusId } = row.original;
	const { BuyerApprovalDetails } = useLocalization('Routes');
	return (
		<TableCellResponsiveContent label={column.columnDef.header as string}>
			<Linkable
				href={{ pathname: BuyerApprovalDetails.route.t(), query: { approvalStatusId } }}
				color="primary"
				id={`buyer-approval-details-${row.id}`}
				data-testid={`buyer-approval-details-${row.id}`}
			>
				<Typography>{approvalStatusId}</Typography>
			</Linkable>
		</TableCellResponsiveContent>
	);
};
