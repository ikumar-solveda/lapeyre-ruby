/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { RecurringOrdersContextValues } from '@/components/content/RecurringOrders/parts/Table';
import { RecurringOrdersTablePopUp } from '@/components/content/RecurringOrders/parts/Table/PopUp';
import { recurringOrdersActionButtonSX } from '@/components/content/RecurringOrders/styles/actionButton';
import { SubscriptionIBMStoreSummaryItem } from '@/data/Content/RecurringOrders';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { Close, Replay } from '@mui/icons-material';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import { FC, useContext, useMemo, useState } from 'react';

export const RecurringOrdersTableActions: FC = () => {
	const labels = useLocalization('Order');
	const { subscription, onReOrder } = useContext(ContentContext) as RecurringOrdersContextValues & {
		subscription: SubscriptionIBMStoreSummaryItem;
	};
	const isActive = useMemo(() => subscription?.state === 'Active', [subscription]);
	const [open, setOpen] = useState<boolean>(false);

	const handleClickListItem = () => {
		setOpen(true);
	};

	const handleCancelRecurringDialog = () => {
		setOpen(false);
	};
	return (
		<TableCellResponsiveContent label={labels.Actions.t()}>
			<Stack direction="row" columnGap={1} alignItems="flex-start">
				<Tooltip title={labels.TooltipReOrder.t()}>
					<IconButton
						data-testid="re-order"
						id="re-order"
						sx={recurringOrdersActionButtonSX}
						onClick={onReOrder(
							subscription?.purchaseDetails?.parentOrderIdentifier?.parentOrderId as string
						)}
					>
						<Replay color="primary" />
					</IconButton>
				</Tooltip>
				<Tooltip title={labels.TooltipCancel.t()}>
					<Box component="span">
						<IconButton
							data-testid="cancel"
							id="cancel"
							sx={recurringOrdersActionButtonSX}
							onClick={handleClickListItem}
							disabled={!isActive}
						>
							<Close color={isActive ? 'primary' : 'disabled'} />
						</IconButton>
					</Box>
				</Tooltip>
				{open ? (
					<RecurringOrdersTablePopUp
						id="Cancel"
						keepMounted
						open={open}
						frequency={subscription?.subscriptionInfo?.fulfillmentSchedule?.frequencyInfo}
						orderId={subscription?.purchaseDetails?.parentOrderIdentifier?.parentOrderId as string}
						subscriptionId={subscription?.subscriptionIdentifier?.subscriptionId as string}
						onCloseDialog={handleCancelRecurringDialog}
					/>
				) : null}
			</Stack>
		</TableCellResponsiveContent>
	);
};
