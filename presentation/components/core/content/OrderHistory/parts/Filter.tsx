/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { orderHistoryActionsSX } from '@/components/content/OrderHistory/styles/orderHistoryActions';
import { orderHistoryFilterLabelSX } from '@/components/content/OrderHistory/styles/orderHistoryFilterLabel';
import { orderHistoryFilterMenuHeightSX } from '@/components/content/OrderHistory/styles/orderHistoryFilterMenuHeight';
import { useOrderHistory } from '@/data/Content/OrderHistory';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { Checkbox, FormControl, ListItemText, MenuItem, Select, Typography } from '@mui/material';
import { FC, useContext } from 'react';

export const OrderHistoryFilter: FC = () => {
	const { statuses, selectedStatuses, onStatus } = useContext(ContentContext) as {
		statuses: ReturnType<typeof useOrderHistory>['statuses'];
		selectedStatuses: ReturnType<typeof useOrderHistory>['selectedStatuses'];
		onStatus: ReturnType<typeof useOrderHistory>['onStatus'];
	};
	const localization = useLocalization('Order');

	return (
		<FormControl fullWidth sx={orderHistoryActionsSX}>
			<Select
				displayEmpty
				id="filter-by-statuses"
				data-testid="filter-by-statuses"
				multiple
				value={selectedStatuses}
				onChange={onStatus}
				renderValue={(selected: string[]) =>
					selected.length ? (
						selected.map((s) => statuses[s]).join(', ')
					) : (
						<Typography sx={orderHistoryFilterLabelSX}>{localization.FilterResults.t()}</Typography>
					)
				}
				MenuProps={{
					PaperProps: {
						sx: orderHistoryFilterMenuHeightSX,
					},
				}}
			>
				{Object.entries(statuses).map(([status, description]) => (
					<MenuItem key={status} value={status}>
						<Checkbox checked={!!selectedStatuses.find((s) => s === status)} />
						<ListItemText primary={description} />
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};
