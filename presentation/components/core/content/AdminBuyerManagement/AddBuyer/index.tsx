/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { AdminBuyerManagementStepper } from '@/components/content/AdminBuyerManagement/parts/Stepper';
import { adminBuyerManagementPaperSX } from '@/components/content/AdminBuyerManagement/styles/paper';
import { useAdmin_BuyerManagementAddBuyer } from '@/data/Content/Admin_BuyerManagementAddBuyer';
import { useLocalization } from '@/data/Localization';
import { BUYER_MANAGEMENT_STEPS } from '@/data/constants/admin_buyerManagement';
import { initialAdminBuyerRegistrationValue as initialAdminBuyerValue } from '@/data/constants/admin_buyerRegistration';
import { ContentProvider } from '@/data/context/content';
import { ID } from '@/data/types/Basic';
import { Paper, Stack, Typography } from '@mui/material';
import { FC, useMemo } from 'react';

export const AdminBuyerManagementAddBuyer: FC<{ id: ID }> = () => {
	const localization = useLocalization('BuyerOrganizationAdminTools');
	const actionTitle = useLocalization('BuyerManagement').Title.t();
	const useBuyerManagementAddOrDetailsValue = useAdmin_BuyerManagementAddBuyer();

	const contextValue = useMemo(
		() => ({
			useBuyerManagementAddOrDetailsValue,
			initialAdminBuyerValue,
			steps: BUYER_MANAGEMENT_STEPS,
			actionTitle,
		}),
		[actionTitle, useBuyerManagementAddOrDetailsValue]
	);

	return (
		<ContentProvider value={contextValue}>
			<Stack spacing={2}>
				<Typography variant="h3">{localization.BuyerManagement.t()}</Typography>
				<Paper sx={adminBuyerManagementPaperSX}>
					<AdminBuyerManagementStepper />
				</Paper>
			</Stack>
		</ContentProvider>
	);
};
