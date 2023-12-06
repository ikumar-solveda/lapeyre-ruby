/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext } from 'react';
import { Typography } from '@mui/material';
import { PriceDisplay } from '@/components/blocks/PriceDisplay';
import { ContentContext } from '@/data/context/content';
import { dFix } from '@/utils/floatingPoint';
import { SubscriptionIBMStoreSummaryItem } from '@/data/Content/RecurringOrders';
import { RecurringOrdersContextValues } from '@/components/content/RecurringOrders/parts/Table';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { useLocalization } from '@/data/Localization';

export const RecurringOrdersTablePrice: FC = () => {
	const labels = useLocalization('Order');
	const { subscription } = useContext(ContentContext) as RecurringOrdersContextValues & {
		subscription: SubscriptionIBMStoreSummaryItem;
	};
	return (
		<TableCellResponsiveContent
			label={<Typography variant="overline">{labels.TotalPrice.t()}</Typography>}
		>
			<Typography data-testid="order-grand-total" id="order-grand-total">
				<PriceDisplay
					currency={subscription?.subscriptionInfo?.paymentInfo?.totalCost?.currency}
					min={dFix(`${subscription?.subscriptionInfo?.paymentInfo?.totalCost?.value?.toFixed(2)}`)}
				/>
			</Typography>
		</TableCellResponsiveContent>
	);
};
