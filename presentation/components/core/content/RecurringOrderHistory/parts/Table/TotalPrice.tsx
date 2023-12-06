/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { PriceDisplay } from '@/components/blocks/PriceDisplay';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { RecurringOrdersHistoryRowContextValue } from '@/components/content/RecurringOrderHistory/parts/Table';
import { useLocalization } from '@/data/Localization';
import { dFix } from '@/data/Settings';
import { ContentContext } from '@/data/context/content';
import { Typography } from '@mui/material';
import { FC, useContext } from 'react';

export const RecurringOrderHistoryTableTotalPrice: FC = () => {
	const { order } = useContext(ContentContext) as RecurringOrdersHistoryRowContextValue;
	const { grandTotal, grandTotalCurrency } = order;
	const labels = useLocalization('Order');
	return (
		<TableCellResponsiveContent
			label={<Typography variant="overline">{labels.TotalProductPrice.t()}</Typography>}
		>
			<Typography>
				<PriceDisplay currency={grandTotalCurrency} min={dFix(grandTotal)} />
			</Typography>
		</TableCellResponsiveContent>
	);
};
