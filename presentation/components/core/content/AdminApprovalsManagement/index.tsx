/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TabData, Tabs } from '@/components/blocks/Tabs';
import { adminApprovalsManagementTabSX } from '@/components/content/AdminApprovalsManagement/styles/tab';
import { adminApprovalsManagementTabPaperSX } from '@/components/content/AdminApprovalsManagement/styles/tabPaper';
import { AdminBuyerApprovalsManagement } from '@/components/content/AdminBuyerApprovalsManagement';
import { AdminOrderApprovalsManagement } from '@/components/content/AdminOrderApprovalsManagement';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { useUser } from '@/data/User';
import { ID } from '@/data/types/Basic';
import { Paper, Stack, Typography } from '@mui/material';
import { FC, useMemo } from 'react';

export const AdminApprovalsManagement: FC<{ id: ID }> = () => {
	const localization = useLocalization('BuyerOrganizationAdminTools');
	const approvalsManagementNLS = useLocalization('ApprovalsManagement');
	const router = useNextRouter();
	const { tab } = router.query;
	const { user: { buyerAdmin = false } = {} } = useUser();
	const tabs: TabData[] = useMemo(
		() =>
			[
				buyerAdmin && {
					id: 'buyer',
					title: approvalsManagementNLS.BuyersTab.t(),
					content: <AdminBuyerApprovalsManagement />,
				},
				{
					id: 'order',
					title: approvalsManagementNLS.OrdersTab.t(),
					content: <AdminOrderApprovalsManagement />,
				},
			].filter(Boolean) as TabData[],
		[approvalsManagementNLS, buyerAdmin]
	);
	const initial = useMemo(() => {
		const found = tabs.findIndex(({ id }) => id === tab);
		return found === -1 ? 0 : found;
	}, [tab, tabs]);

	return (
		<Stack spacing={2}>
			<Typography variant="h3">{approvalsManagementNLS.ApprovalsManagement.t()}</Typography>
			<Paper sx={adminApprovalsManagementTabPaperSX}>
				<Tabs
					tabs={tabs}
					collectionName={localization.BuyerOrderApproval.t()}
					tabSX={adminApprovalsManagementTabSX}
					initial={initial}
				/>
			</Paper>
		</Stack>
	);
};

export default AdminApprovalsManagement;
