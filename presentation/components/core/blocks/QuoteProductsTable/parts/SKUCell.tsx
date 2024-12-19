/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCellProductImage } from '@/components/blocks/ProductImage';
import { quoteProductsTableSkuCellStack } from '@/components/blocks/QuoteProductsTable/styles/skuCellStack';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { orderItemTableV2DetailsImageSX } from '@/components/content/OrderItemTableV2/styles/detailsImage';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { ProductType } from '@/data/types/Product';
import type { ProductItem, QuoteProductsTableContextValues } from '@/data/types/Quote';
import { Stack, Typography } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import { useContext, useMemo, type FC } from 'react';

export const QuoteProductsTableSKUCell: FC<CellContext<ProductItem, string>> = ({ getValue }) => {
	const localization = useLocalization('QuoteProductsTable');
	const sku = useMemo(() => getValue(), [getValue]);
	const { productsDetailsData } = useContext(ContentContext) as QuoteProductsTableContextValues;
	const product = useMemo(
		() => productsDetailsData?.find((product: ProductType) => product.partNumber === sku),
		[productsDetailsData, sku]
	);
	return (
		<TableCellResponsiveContent label={localization.Product.t()}>
			<Stack {...quoteProductsTableSkuCellStack}>
				<TableCellProductImage
					src={product?.thumbnail as string}
					alt={product?.name as string}
					isThumbnail={true}
					sx={orderItemTableV2DetailsImageSX}
				/>
				<Stack>
					<Typography variant="body2">{product?.name}</Typography>
					<Typography>{sku}</Typography>
				</Stack>
			</Stack>
		</TableCellResponsiveContent>
	);
};
