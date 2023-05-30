/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useEffect, useMemo, useState } from 'react';
import { Paper, Typography, useTheme, useMediaQuery } from '@mui/material';
import { OrderItem } from '@/data/types/Order';
import { useLocalization } from '@/data/Localization';
import { useOrderItemTable } from '@/data/Content/OrderItemTable';
import { OrderItemTable as Table } from '@/components/content/OrderItemTable/parts/Table';
import { ContentProvider } from '@/data/context/content';
import { Row } from 'react-table';
import { Linkable } from '@/components/blocks/Linkable';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';

export const OrderItemTable: FC<{
	orderItems: OrderItem[];
	orderId: string | undefined;
	variant?: 'full' | 'compact' | 'auto' | 'mini';
	readOnly?: boolean;
}> = ({ orderItems, orderId = '', variant = 'auto', readOnly = false }) => {
	const orderItemTableNLS = useLocalization('OrderItemTable');
	const cartNLS = useLocalization('Cart');
	const [physicalStoreName, setPhysicalStoreName] = useState<string>('');
	const orderItemTable = useOrderItemTable(orderItems, orderId, physicalStoreName);
	const { data } = orderItemTable;

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const view = variant === 'auto' ? (isMobile ? 'compact' : 'full') : variant;
	const { storeLocator } = useStoreLocatorState();

	useEffect(() => {
		if (view !== 'mini') {
			setPhysicalStoreName(storeLocator.selectedStore?.physicalStoreName ?? '');
		} else {
			setPhysicalStoreName('');
		}
	}, [storeLocator.selectedStore, view]);

	const sort = useMemo(
		() => (rowA: Row, rowB: Row, columnId: string) => {
			const keyToCompare: string = rowA.values[columnId].key;
			const isNumeric: boolean | undefined = rowA.values[columnId].numeric;
			const rowAItem = rowA.values[columnId][keyToCompare];
			const rowBItem = rowB.values[columnId][keyToCompare];
			return keyToCompare === 'availability'
				? String(rowAItem?.inventoryStatus).localeCompare(String(rowBItem?.inventoryStatus))
				: isNumeric
				? Number.parseFloat(rowAItem) - Number.parseFloat(rowBItem)
				: String(rowAItem).localeCompare(String(rowBItem));
		},
		[]
	);

	const columns = useMemo(
		() => [
			{
				Header: orderItemTableNLS.Labels.ItemDetails.t(),
				accessor: 'itemDetails',
				sortType: sort,
			},
			{
				Header: orderItemTableNLS.Labels.Availability.t(),
				accessor: 'availability',
				sortType: sort,
			},
			{
				Header: orderItemTableNLS.Labels.Quantity.t(),
				accessor: 'quantity',
				sortType: sort,
			},
			{
				Header: orderItemTableNLS.Labels.Price.t(),
				accessor: 'price',
				sortType: sort,
			},
		],
		[orderItemTableNLS, sort]
	);

	return (
		<ContentProvider value={{ view, readOnly }}>
			<Paper elevation={view === 'mini' ? 0 : 1}>
				{orderItems?.length ? (
					<Table columns={columns} data={data} />
				) : (
					<Typography p={2} variant="h5">
						{`${orderItemTableNLS.Labels.Empty.t()} `}
						<Linkable href="/">{cartNLS.Msgs.ShopNow.t()}</Linkable>
					</Typography>
				)}
			</Paper>
		</ContentProvider>
	);
};
