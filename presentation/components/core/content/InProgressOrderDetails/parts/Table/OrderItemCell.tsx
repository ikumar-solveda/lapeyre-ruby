/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { TableCellProductImage } from '@/components/blocks/ProductImage';
import { TableCellResponsiveContentV2 } from '@/components/blocks/Table/TableCellResponsiveContentV2';
import { InProgressOrdersTableResponsiveActions } from '@/components/content/InProgressOrderDetails/parts/Table/ResponsiveActions';
import { inProgressOrderDetailsTableItemDetailsImageSX } from '@/components/content/InProgressOrderDetails/styles/Table/itemDetailsImage';
import { inProgressOrderDetailsTableOrderItemCellStack } from '@/components/content/InProgressOrderDetails/styles/Table/orderItemCellStack';
import { AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE } from '@/data/constants/inProgressOrders';
import type { useInProgressOrderDetails } from '@/data/Content/InProgressOrderDetails';
import { ContentContext } from '@/data/context/content';
import type { OrderItem } from '@/data/types/Order';
import { CircularProgress, Stack, Typography } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import { FC, useContext } from 'react';

const EMPTY_SKU = {};
export const InProgressOrderDetailsTableOrderItemCell: FC<CellContext<OrderItem, unknown>> = (
	props
) => {
	const { row } = props;
	const { products } = useContext(ContentContext) as ReturnType<typeof useInProgressOrderDetails>;
	const sku = products[row.original.partNumber] ?? EMPTY_SKU;
	const { thumbnail, seo, name, partNumber, shortDescription } = sku;
	return (
		<TableCellResponsiveContentV2
			alignItems="center"
			menu={<InProgressOrdersTableResponsiveActions {...props} />}
		>
			{sku.partNumber ? (
				<Stack {...inProgressOrderDetailsTableOrderItemCellStack}>
					{thumbnail ? (
						<Linkable href={seo.href} id={seo.href} data-testid={seo.href}>
							<TableCellProductImage
								src={thumbnail}
								alt={shortDescription || name}
								isThumbnail
								sx={inProgressOrderDetailsTableItemDetailsImageSX}
							/>
						</Linkable>
					) : null}
					<Stack>
						<Linkable href={seo.href} id={seo.href} data-testid={seo.href}>
							<Typography
								data-testid={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-name-${row.id}`}
								id={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-name-${row.id}`}
							>
								{name}
							</Typography>
						</Linkable>
						<Typography
							data-testid={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-part-number-${row.id}`}
							id={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-part-number-${row.id}`}
						>
							{partNumber}
						</Typography>
					</Stack>
				</Stack>
			) : (
				<CircularProgress size={15} />
			)}
		</TableCellResponsiveContentV2>
	);
};
