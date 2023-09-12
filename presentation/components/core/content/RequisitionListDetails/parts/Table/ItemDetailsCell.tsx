/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { ProductImage } from '@/components/blocks/ProductImage';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { requisitionListDetailsTableItemDetailsImageSX } from '@/components/content/RequisitionListDetails/styles/Table/itemDetailsImage';
import { requisitionListDetailsTableItemDetailsStack } from '@/components/content/RequisitionListDetails/styles/Table/itemDetailsStack';
import { useOrderItemTableRow } from '@/data/Content/OrderItemTable';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { OrderItem } from '@/data/types/Order';
import { Stack, Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC, useContext } from 'react';

export const RequisitionListDetailsTableItemDetailsCell: FC<
	CellContext<OrderItem, string>
> = () => {
	const { details } = useContext(ContentContext) as ReturnType<typeof useOrderItemTableRow>;
	const { partNumber, name, color, thumbnail, href, loading } = details;
	const labels = useLocalization('OrderItemTable').Labels;
	const localization = useLocalization('RequisitionListItems');
	if (loading) {
		return <ProgressIndicator />;
	}
	return (
		<TableCellResponsiveContent label={localization.orderItem.t()}>
			<Stack {...requisitionListDetailsTableItemDetailsStack}>
				{thumbnail ? (
					<Linkable href={href} id={href} data-testid={href}>
						<ProductImage
							{...{
								src: thumbnail,
								alt: labels.ProductThumbnail.t(),
								isThumbnail: true,
								sx: requisitionListDetailsTableItemDetailsImageSX,
							}}
						/>
					</Linkable>
				) : null}
				<Stack direction="column" alignItems="flex-start">
					<Linkable href={href} id={href} data-testid={href}>
						<Typography data-testid="orderItem-name" id="orderItem-name">
							{color ? `${name}, ${color}` : name}
						</Typography>
					</Linkable>
					<Typography id="orderItem-partNumber" data-testid="orderItem-partNumber">
						{partNumber}
					</Typography>
				</Stack>
			</Stack>
		</TableCellResponsiveContent>
	);
};
