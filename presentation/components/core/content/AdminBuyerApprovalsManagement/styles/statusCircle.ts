/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { APPROVALS_STATUS_COLOR_MAP } from '@/data/constants/admin_approvalsManagement';
import { SxProps } from '@mui/material';

export const adminBuyerApprovalManagementStatusCircleSX = (status: string): SxProps => ({
	color: APPROVALS_STATUS_COLOR_MAP[status as keyof typeof APPROVALS_STATUS_COLOR_MAP],
});
