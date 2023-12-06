/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { adminBuyerApprovalDetailsSectionPaperSX } from '@/components/content/AdminBuyerApprovalDetails/styles/sectionPaper';
import { adminBuyerApprovalDetailsValuesSX } from '@/components/content/AdminBuyerApprovalDetails/styles/values';
import { useAdmin_BuyerApprovalsDetails } from '@/data/Content/Admin_BuyerApprovalDetails';
import { useLocalization } from '@/data/Localization';
import { APPROVALS_STATUS } from '@/data/constants/admin_approvalsManagement';
import { ContentContext } from '@/data/context/content';
import { REG_EX } from '@/utils/address';
import { Button, Divider, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import { FC, useContext } from 'react';

export const AdminBuyerApprovalDetailsComments: FC = () => {
	const BuyerApprovalDetailsNLS = useLocalization('BuyerApprovalDetails');
	const { data, onChange, onApprovalAction, onRejectAction, comments } = useContext(
		ContentContext
	) as ReturnType<typeof useAdmin_BuyerApprovalsDetails>;
	return (
		<Paper elevation={4} sx={adminBuyerApprovalDetailsSectionPaperSX}>
			<Stack spacing={2} useFlexGap>
				<Typography variant="h4">{BuyerApprovalDetailsNLS.CommentsTitle.t()}</Typography>
				{data?.approvalDetails?.status === APPROVALS_STATUS.pending ? (
					<>
						<Typography>{BuyerApprovalDetailsNLS.CommentsSubtitle.t()}</Typography>
						<Divider />
						<TextField
							name="comments"
							placeholder={BuyerApprovalDetailsNLS.CommentsTextPlaceHolder.t()}
							fullWidth
							onChange={onChange}
							value={comments}
							inputProps={{
								maxLength: 512,
								pattern: REG_EX.NICKNAME_ALPHA_NUMERIC_SPECIAL_CHAR.source,
							}}
						/>
						<Grid container spacing={3} alignItems="center">
							<Grid item>
								<Button
									data-testid="buyer-approval-details-reject-button"
									id="buyer-approval-details-reject-button"
									variant="outlined"
									aria-label={BuyerApprovalDetailsNLS.Reject.t()}
									onClick={onRejectAction}
								>
									{BuyerApprovalDetailsNLS.Reject.t()}
								</Button>
							</Grid>
							<Grid item>
								<Button
									data-testid="buyer-approval-details-approve-button"
									id="buyer-approval-details-approve-button"
									variant="contained"
									aria-label={BuyerApprovalDetailsNLS.Approve.t()}
									onClick={onApprovalAction}
								>
									{BuyerApprovalDetailsNLS.Approve.t()}
								</Button>
							</Grid>
						</Grid>
					</>
				) : (
					<>
						<Divider />
						<Typography sx={adminBuyerApprovalDetailsValuesSX}>
							{data?.approvalDetails?.comment || BuyerApprovalDetailsNLS.NoComments.t()}
						</Typography>
					</>
				)}
			</Stack>
		</Paper>
	);
};
