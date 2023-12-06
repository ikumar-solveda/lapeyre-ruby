/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { OneClick } from '@/components/blocks/OneClick';
import { adminOrderApprovalDetailsCommentsButtonsSX } from '@/components/content/AdminOrderApprovalDetails/styles/commentsButtons';
import { adminOrderApprovalDetailsCommentsSubtitleSX } from '@/components/content/AdminOrderApprovalDetails/styles/commentsSubtitle';
import { adminOrderApprovalDetailsCommentsTitleSX } from '@/components/content/AdminOrderApprovalDetails/styles/commentsTitle';
import { adminOrderApprovalDetailsPaperSX } from '@/components/content/AdminOrderApprovalDetails/styles/paper';
import { useAdmin_OrderApprovalDetails } from '@/data/Content/Admin_OrderApprovalDetails';
import { useAdmin_OrderApprovalsManagementTable } from '@/data/Content/Admin_OrderApprovalsManagementTable';
import { useLocalization } from '@/data/Localization';
import { APPROVALS_STATUS } from '@/data/constants/admin_approvalsManagement';
import { ContentContext } from '@/data/context/content';
import { REG_EX } from '@/utils/address';
import { Divider, Grid, Paper, TextField, Typography } from '@mui/material';
import { FC, useContext, useEffect } from 'react';

export const AdminOrderApprovalDetailsComments: FC = () => {
	const { CommentsTitle, CommentsSubtitle, CommentsTextPlaceHolder, Reject, Approve, NoComments } =
		useLocalization('OrderApprovalDetails');
	const { orderId, comments, onChange, onApprovalAction, onRejectAction } = useContext(
		ContentContext
	) as ReturnType<typeof useAdmin_OrderApprovalDetails>;
	const { onSearch, data } = useAdmin_OrderApprovalsManagementTable();
	const details = data?.resultList?.at(0);

	useEffect(() => {
		onSearch({ entityId: orderId as string });
	}, [orderId]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Paper elevation={4} sx={adminOrderApprovalDetailsPaperSX}>
			<Grid container direction="column" spacing={2}>
				<Grid container direction="column">
					<Grid item sx={adminOrderApprovalDetailsCommentsTitleSX}>
						<Typography variant="h4">{CommentsTitle.t()}</Typography>
					</Grid>
					{details?.status === APPROVALS_STATUS.pending ? (
						<Grid item sx={adminOrderApprovalDetailsCommentsSubtitleSX}>
							<Typography>{CommentsSubtitle.t()}</Typography>
						</Grid>
					) : null}
				</Grid>
				<Grid item>
					<Divider />
				</Grid>

				{details?.status === APPROVALS_STATUS.pending ? (
					<>
						<Grid item>
							<TextField
								required
								id="order-approval-detail-comment-text-field"
								data-testid="order-approval-detail-comment-text-field"
								name="comment"
								value={comments}
								inputProps={{
									maxLength: 512,
									pattern: REG_EX.NICKNAME_ALPHA_NUMERIC_SPECIAL_CHAR.source,
								}}
								onChange={onChange}
								placeholder={CommentsTextPlaceHolder.t()}
								multiline
								fullWidth
							/>
						</Grid>
						<Grid container sx={adminOrderApprovalDetailsCommentsButtonsSX} spacing={2}>
							<Grid item>
								<OneClick
									variant="outlined"
									data-testid="order-approval-details-reject-button"
									aria-label={Reject.t()}
									onClick={onRejectAction}
								>
									{Reject.t()}
								</OneClick>
							</Grid>
							<Grid item>
								<OneClick
									variant="contained"
									data-testid="order-approval-details-approve-button"
									aria-label={Approve.t()}
									onClick={onApprovalAction}
								>
									{Approve.t()}
								</OneClick>
							</Grid>
						</Grid>
					</>
				) : (
					<Grid item>{details?.comment ?? NoComments.t()}</Grid>
				)}
			</Grid>
		</Paper>
	);
};
