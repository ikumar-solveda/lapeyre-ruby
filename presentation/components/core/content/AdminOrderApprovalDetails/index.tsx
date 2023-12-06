/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { OrderDetails } from '@/components/blocks/OrderDetails';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { AdminOrderApprovalDetailsComments } from '@/components/content/AdminOrderApprovalDetails/parts/Comments';
import { adminOrderApprovalDetailsBackSX } from '@/components/content/AdminOrderApprovalDetails/styles/back';
import { useAdmin_OrderApprovalDetails } from '@/data/Content/Admin_OrderApprovalDetails';
import { useDateTimeFormat } from '@/data/Content/_DateTimeFormatter';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { ContentProvider } from '@/data/context/content';
import { ID } from '@/data/types/Basic';
import { ArrowBackIos } from '@mui/icons-material';
import { Grid, Paper, Stack, Typography } from '@mui/material';
import { FC, useEffect, useMemo } from 'react';

const ROUTE_ID = 'back';
export const AdminOrderApprovalDetails: FC<{ id: ID }> = () => {
	const orderApprovalDetails = useAdmin_OrderApprovalDetails();
	const { order, orderItems, orderId, error, isLoading } = orderApprovalDetails;
	const OrderApprovalDetailsNLS = useLocalization('OrderApprovalDetails');
	const route = useLocalization('Routes').ApprovalsManagement.route.t();
	const statusText = `Status_${order?.orderStatus}` as keyof typeof OrderApprovalDetailsNLS;
	const router = useNextRouter();
	const { fullName } = router.query;
	const orderStatus = OrderApprovalDetailsNLS[statusText]?.t() ?? '';
	const formatter = useDateTimeFormat();
	const orderDate = useMemo(
		() => (order?.lastUpdateDate ? formatter.format(new Date(order?.lastUpdateDate)) : ''),
		[formatter, order]
	);

	const organization = useMemo(() => {
		const orgDName = order?.orgDistinguishedName.split(',');
		return orgDName?.length > 0 ? orgDName[0].split('=')[1] : null;
	}, [order?.orgDistinguishedName]);

	useEffect(() => {
		if (!orderId || error) {
			router.push({ pathname: route, query: { tab: 'order' } });
		}
	}, [orderId, error]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Paper sx={{ p: 2 }}>
			{isLoading ? (
				<ProgressIndicator />
			) : (
				<Stack spacing={2} useFlexGap>
					<Grid container spacing={2}>
						<Grid item xs={12} md={4}>
							<Stack direction="row">
								<Linkable
									href={{ pathname: route, query: { tab: 'order' } }}
									id={ROUTE_ID}
									data-testid={ROUTE_ID}
									aria-label={OrderApprovalDetailsNLS.BackToAM.t()}
									sx={adminOrderApprovalDetailsBackSX}
								>
									<ArrowBackIos />
								</Linkable>
								<Typography variant="h3">{OrderApprovalDetailsNLS.OrderDetails.t()}</Typography>
							</Stack>
						</Grid>
						<Grid item xs={12} md>
							<Typography variant="overline">{OrderApprovalDetailsNLS.OrderNumber.t()}</Typography>
							<Typography variant="body2">{orderId}</Typography>
						</Grid>
						{fullName ? (
							<Grid item xs={12} md>
								<Typography variant="overline">{OrderApprovalDetailsNLS.OrderedBy.t()}</Typography>
								<Typography variant="body2">{fullName}</Typography>
							</Grid>
						) : null}
						{organization ? (
							<Grid item xs={12} md>
								<Typography variant="overline">
									{OrderApprovalDetailsNLS.Organization.t()}
								</Typography>
								<Typography variant="body2">{organization}</Typography>
							</Grid>
						) : null}
						{orderDate ? (
							<Grid item xs={12} md>
								<Typography variant="overline">{OrderApprovalDetailsNLS.OrderDate.t()}</Typography>
								<Typography variant="body2">{orderDate}</Typography>
							</Grid>
						) : null}
						<Grid item xs={12} md>
							<Typography variant="overline">{OrderApprovalDetailsNLS.Status.t()}</Typography>
							<Typography variant="body2">{orderStatus}</Typography>
						</Grid>
					</Grid>
					<OrderDetails order={order} orderItems={orderItems} showHeading={false} />
					<ContentProvider value={orderApprovalDetails}>
						<AdminOrderApprovalDetailsComments />
					</ContentProvider>
				</Stack>
			)}
		</Paper>
	);
};
