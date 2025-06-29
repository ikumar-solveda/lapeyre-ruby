/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { OrderItemTable as Table } from '@/components/content/OrderItemTable/parts/Table';
import { ColumnWithKey, useOrderItemTable } from '@/data/Content/OrderItemTable';
import { useLocalization } from '@/data/Localization';
import { UNINITIALIZED_STORE } from '@/data/constants/inventory';
import { ContentProvider } from '@/data/context/content';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { OrderItem } from '@/data/types/Order';
import { StoreDetails } from '@/data/types/Store';
import { dFix } from '@/utils/floatingPoint';
import { Paper, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Row } from '@tanstack/react-table';
import { FC, useEffect, useMemo, useState } from 'react';

export type TableData = ReturnType<typeof useOrderItemTable>['data'][0];

/** @deprecated only used in min cart */
export const OrderItemTable: FC<{
	orderItems: OrderItem[];
	orderId: string | undefined;
	variant?: 'full' | 'compact' | 'auto' | 'mini';
	readOnly?: boolean;
}> = ({ orderItems, orderId = '', variant = 'auto', readOnly = false }) => {
	const orderItemTableNLS = useLocalization('OrderItemTable');
	const cartNLS = useLocalization('Cart');
	const [physicalStore, setPhysicalStore] = useState<StoreDetails>(UNINITIALIZED_STORE);
	const orderItemTable = useOrderItemTable(
		orderItems,
		orderId,
		physicalStore?.physicalStoreName ?? '',
		physicalStore
	);
	const { data } = orderItemTable;
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const view = variant === 'auto' ? (isMobile ? 'compact' : 'full') : variant;
	const { storeLocator } = useStoreLocatorState();

	useEffect(() => {
		if (view !== 'mini') {
			setPhysicalStore(storeLocator.selectedStore);
		}
	}, [storeLocator.selectedStore, view]);

	const sort = useMemo(
		() => (rowA: Row<TableData>, rowB: Row<TableData>, columnId: string) => {
			const keyToCompare = rowA.getValue<ColumnWithKey>(columnId).key;
			const isNumeric: boolean | undefined = rowA.getValue<ColumnWithKey>(columnId).numeric;
			const rowAItem = rowA.getValue<ColumnWithKey>(columnId)[keyToCompare];
			const rowBItem = rowB.getValue<ColumnWithKey>(columnId)[keyToCompare];
			return keyToCompare === 'availability'
				? String(rowAItem?.inventoryStatus).localeCompare(String(rowBItem?.inventoryStatus))
				: isNumeric
				? dFix(rowAItem) - dFix(rowBItem)
				: String(rowAItem).localeCompare(String(rowBItem));
		},
		[]
	);

	const columns = useMemo(
		() => [
			{
				header: orderItemTableNLS.Labels.ItemDetails.t(),
				accessorKey: 'itemDetails',
				sortingFn: sort,
			},
			{
				header: orderItemTableNLS.Labels.Availability.t(),
				accessorKey: 'availability',
				sortingFn: sort,
			},
			{
				header: orderItemTableNLS.Labels.Quantity.t(),
				accessorKey: 'quantity',
				sortingFn: sort,
			},
			{
				header: orderItemTableNLS.Labels.Price.t(),
				accessorKey: 'price',
				sortingFn: sort,
			},
		],
		[orderItemTableNLS, sort]
	);

	const ctxValue = useMemo(
		() => ({ view, readOnly, ...orderItemTable }),
		[view, readOnly, orderItemTable]
	);

	return (
		<ContentProvider value={ctxValue}>
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
