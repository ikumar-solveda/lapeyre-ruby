/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PriceDisplayBase } from '@/components/blocks/PriceDisplay';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { RecurringOrdersContextValues } from '@/components/content/RecurringOrders/parts/Table';
import { SubscriptionIBMStoreSummaryItem } from '@/data/Content/RecurringOrders';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { dFix } from '@/utils/floatingPoint';
import { Typography } from '@mui/material';
import { FC, useContext } from 'react';

export const RecurringOrdersTablePrice: FC = () => {
	const labels = useLocalization('Order');
	const { subscription } = useContext(ContentContext) as RecurringOrdersContextValues & {
		subscription: SubscriptionIBMStoreSummaryItem;
	};
	return (
		<TableCellResponsiveContent label={labels.TotalPrice.t()}>
			<Typography data-testid="order-grand-total" id="order-grand-total">
				{subscription ? (
					<PriceDisplayBase
						currency={subscription?.subscriptionInfo?.paymentInfo?.totalCost?.currency as string}
						min={dFix(
							`${subscription?.subscriptionInfo?.paymentInfo?.totalCost?.value?.toFixed(2)}`
						)}
					/>
				) : null}
			</Typography>
		</TableCellResponsiveContent>
	);
};
