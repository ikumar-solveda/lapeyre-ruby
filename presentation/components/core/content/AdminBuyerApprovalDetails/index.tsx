/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { AdminBuyerApprovalDetailsAddress } from '@/components/content/AdminBuyerApprovalDetails/parts/Address';
import { AdminBuyerApprovalDetailsBuyerDetails } from '@/components/content/AdminBuyerApprovalDetails/parts/BuyerDetails';
import { AdminBuyerApprovalDetailsComments } from '@/components/content/AdminBuyerApprovalDetails/parts/Comments';
import { AdminBuyerApprovalDetailsOrganizationDetails } from '@/components/content/AdminBuyerApprovalDetails/parts/OrganizationDetails';
import { adminBuyerApprovalDetailsBackIconSX } from '@/components/content/AdminBuyerApprovalDetails/styles/backIcon';
import { adminBuyerApprovalDetailsPaperSX } from '@/components/content/AdminBuyerApprovalDetails/styles/paper';
import { adminBuyerApprovalDetailsStackSX } from '@/components/content/AdminBuyerApprovalDetails/styles/stack';
import { useAdmin_BuyerApprovalsDetails } from '@/data/Content/Admin_BuyerApprovalDetails';
import { useDateTimeFormat } from '@/data/Content/_DateTimeFormatter';
import { useLocalization } from '@/data/Localization';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ContentProvider } from '@/data/context/content';
import { ID } from '@/data/types/Basic';
import { ArrowBackIos } from '@mui/icons-material';
import { Divider, Paper, Stack, Typography } from '@mui/material';
import { FC, useMemo } from 'react';

export const AdminBuyerApprovalDetails: FC<{ id: ID }> = () => {
	const { ApprovalsManagement } = useLocalization('Routes');
	const BuyerApprovalDetailsNLS = useLocalization('BuyerApprovalDetails');
	const buyerApprovalDetails = useAdmin_BuyerApprovalsDetails();
	const dateFormatter = useDateTimeFormat();
	const submitTime = useMemo(
		() =>
			buyerApprovalDetails?.data?.approvalDetails?.submitTime
				? dateFormatter.format(new Date(buyerApprovalDetails?.data?.approvalDetails?.submitTime))
				: EMPTY_STRING,
		[buyerApprovalDetails, dateFormatter]
	);
	return (
		<ContentProvider value={buyerApprovalDetails}>
			<Paper sx={adminBuyerApprovalDetailsPaperSX}>
				{buyerApprovalDetails.isLoading ? (
					<ProgressIndicator />
				) : (
					<>
						<Stack direction="row" sx={adminBuyerApprovalDetailsStackSX}>
							<Linkable
								href={ApprovalsManagement.route.t()}
								color="primary"
								id="back-to-buyer-approvals-management"
								data-testid="back-to-buyer-approvals-management"
								aria-label="back-to-buyer-approvals-management"
								variant="h4"
							>
								<ArrowBackIos sx={adminBuyerApprovalDetailsBackIconSX} />
							</Linkable>
							<Stack spacing={1}>
								<Typography variant="h4">
									{buyerApprovalDetails.data?.approvalDetails?.approvalStatusId}
								</Typography>
								<Stack direction="row" spacing={3}>
									<Typography>{BuyerApprovalDetailsNLS.Submitted.t()}</Typography>
									<Typography>{submitTime}</Typography>
								</Stack>
							</Stack>
						</Stack>
						<Divider />
						<AdminBuyerApprovalDetailsOrganizationDetails />
						<AdminBuyerApprovalDetailsBuyerDetails />
						<AdminBuyerApprovalDetailsAddress />
						<AdminBuyerApprovalDetailsComments />
					</>
				)}
			</Paper>
		</ContentProvider>
	);
};
