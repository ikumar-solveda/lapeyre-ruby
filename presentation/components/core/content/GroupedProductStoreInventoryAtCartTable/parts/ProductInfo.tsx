/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCellProductImage } from '@/components/blocks/ProductImage';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { gpsiacTableProductImageSX } from '@/components/content/GroupedProductStoreInventoryAtCartTable/styles/productImage';
import { useLocalization } from '@/data/Localization';
import { ProductType } from '@/data/types/Product';
import { Stack, Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';

export const GPSIACTableProductInfo: FC<CellContext<ProductType, unknown>> = ({ row }) => {
	const localization = useLocalization('OrderItemTable');
	const { original: _row } = row;
	const { name: productName, shortDescription, thumbnail } = _row;

	return (
		<TableCellResponsiveContent label={`product info`} alignItems="center">
			<Stack spacing={1} justifyContent="flex-start" direction="row">
				{thumbnail ? (
					<TableCellProductImage
						src={thumbnail}
						alt={localization.Labels.ProductThumbnail.t()}
						isThumbnail={true}
						sx={gpsiacTableProductImageSX}
					/>
				) : null}
				<Stack>
					<Typography variant="h6" color="primary.main">
						{productName}
					</Typography>
					<Typography variant="subtitle2">{shortDescription}</Typography>
				</Stack>
			</Stack>
		</TableCellResponsiveContent>
	);
};
