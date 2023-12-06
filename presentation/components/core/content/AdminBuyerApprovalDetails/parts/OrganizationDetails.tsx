/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { adminBuyerApprovalDetailsSectionPaperSX } from '@/components/content/AdminBuyerApprovalDetails/styles/sectionPaper';
import { adminBuyerApprovalDetailsValuesSX } from '@/components/content/AdminBuyerApprovalDetails/styles/values';
import { useAdmin_BuyerApprovalsDetails } from '@/data/Content/Admin_BuyerApprovalDetails';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { FC, useContext } from 'react';

export const AdminBuyerApprovalDetailsOrganizationDetails: FC = () => {
	const BuyerApprovalDetailsNLS = useLocalization('BuyerApprovalDetails');
	const { data } = useContext(ContentContext) as ReturnType<typeof useAdmin_BuyerApprovalsDetails>;
	return (
		<Paper elevation={4} sx={adminBuyerApprovalDetailsSectionPaperSX}>
			<Stack spacing={2}>
				<Typography variant="h4">{BuyerApprovalDetailsNLS.OrgDetailsTitle.t()}</Typography>
				<Divider />
				<Grid container>
					<Grid item xs={12} sm={3}>
						<Typography variant="body2">{BuyerApprovalDetailsNLS.Organization.t()}</Typography>
					</Grid>
					<Grid item>
						<Typography sx={adminBuyerApprovalDetailsValuesSX}>
							{data?.orgDetails.organizationDisplayName}
						</Typography>
					</Grid>
				</Grid>
			</Stack>
		</Paper>
	);
};
