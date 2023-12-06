/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { AdminBuyerManagementStepper } from '@/components/content/AdminBuyerManagement/parts/Stepper';
import { adminBuyerManagementPaperSX } from '@/components/content/AdminBuyerManagement/styles/paper';
import { useAdmin_BuyerManagementBuyerDetails } from '@/data/Content/Admin_BuyerManagementBuyerDetails';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { BUYER_MANAGEMENT_STEPS_EDIT } from '@/data/constants/admin_buyerManagement';
import { ContentProvider } from '@/data/context/content';
import { ID } from '@/data/types/Basic';
import { Paper, Stack, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { FC, useEffect, useMemo } from 'react';

export const AdminBuyerManagementBuyerDetails: FC<{ id: ID }> = () => {
	const localization = useLocalization('BuyerOrganizationAdminTools');
	const actionTitle = useLocalization('BuyerManagement').Edit.t();
	const parentPath = useLocalization('Routes').BuyerManagement.route.t();
	const { query, replace } = useNextRouter();
	const { buyerId } = query;
	const userId = useMemo(() => [buyerId].flat(1).at(-1), [buyerId]);
	const useBuyerManagementAddOrDetailsValue = useAdmin_BuyerManagementBuyerDetails({
		buyerId: userId ?? '',
	});
	const { initialAdminBuyerValue, currentAssignedRoles, setSelectedRoles, organizations } =
		useBuyerManagementAddOrDetailsValue;

	const contextValue = useMemo(
		() => ({
			useBuyerManagementAddOrDetailsValue,
			initialAdminBuyerValue,
			steps: BUYER_MANAGEMENT_STEPS_EDIT,
			actionTitle,
			preValidated: true,
		}),
		[actionTitle, useBuyerManagementAddOrDetailsValue, initialAdminBuyerValue]
	);

	useEffect(() => {
		if (!buyerId) {
			replace({ pathname: parentPath }, undefined, { shallow: true });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (currentAssignedRoles) {
			setSelectedRoles(currentAssignedRoles);
		}
	}, [currentAssignedRoles, setSelectedRoles]);

	return (
		<ContentProvider value={contextValue}>
			<Stack spacing={2}>
				<Typography variant="h3">{localization.BuyerManagement.t()}</Typography>
				<Paper sx={adminBuyerManagementPaperSX}>
					{isEmpty(initialAdminBuyerValue) || isEmpty(organizations) ? (
						<ProgressIndicator />
					) : (
						<AdminBuyerManagementStepper />
					)}
				</Paper>
			</Stack>
		</ContentProvider>
	);
};
