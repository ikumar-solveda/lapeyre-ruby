/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */
import { Linkable } from '@/components/blocks/Linkable';
import { InProgressOrderDetailsEditNameDialog } from '@/components/content/InProgressOrderDetails/parts/EditNameDialog';
import { InProgressOrderDetailsName } from '@/components/content/InProgressOrderDetails/parts/Name';
import { InProgressOrderDetailsSummary } from '@/components/content/InProgressOrderDetails/parts/Summary';
import type { useInProgressOrderDetails } from '@/data/Content/InProgressOrderDetails';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Breadcrumbs, Stack, Typography } from '@mui/material';
import { type FC, useContext } from 'react';

export const InProgressOrderDetailsHeader: FC = () => {
	const { InProgressOrders } = useLocalization('Routes');
	const InProgressOrderDetailsNLS = useLocalization('InProgressOrderDetails');
	const { data } = useContext(ContentContext) as ReturnType<typeof useInProgressOrderDetails>;

	return (
		<Stack>
			<Breadcrumbs aria-label={InProgressOrderDetailsNLS.title.t()}>
				<Linkable
					href={InProgressOrders.route.t()}
					id={InProgressOrders.route.t()}
					data-testid={InProgressOrders.route.t()}
				>
					<Typography variant="pageTitle" component="h2">
						{InProgressOrderDetailsNLS.inProgressOrdersBreadCrumbText.t()}
					</Typography>
				</Linkable>
				<Typography variant="pageTitle" component="h2">
					{data?.orderId}
				</Typography>
			</Breadcrumbs>
			<InProgressOrderDetailsName />
			<InProgressOrderDetailsSummary />
			<InProgressOrderDetailsEditNameDialog />
		</Stack>
	);
};
