/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { TableCellProductImage } from '@/components/blocks/ProductImage';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { orderItemTableV2DetailsImageSX } from '@/components/content/OrderItemTableV2/styles/detailsImage';
import { quoteBrowseAndAddTableSkuCellStack } from '@/components/content/QuoteBrowseAndAddTable/styles/skuCellStack';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type { ProductType } from '@/data/types/Product';
import type { QuoteBrowseAndAddTableContextValues } from '@/data/types/Quote';
import { Stack, Typography } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import { useContext, useMemo, type FC } from 'react';

export const QuoteBrowseAndAddTableSKUCell: FC<CellContext<ProductType, string>> = ({
	getValue,
}) => {
	const localization = useLocalization('QuoteProductsTable');
	const pN = useMemo(() => getValue(), [getValue]);
	const { productsDetailsData } = useContext(ContentContext) as QuoteBrowseAndAddTableContextValues;
	const product = useMemo(
		() => productsDetailsData?.find(({ partNumber }) => partNumber === pN),
		[productsDetailsData, pN]
	);
	return (
		<TableCellResponsiveContent label={localization.Product.t()}>
			<Stack {...quoteBrowseAndAddTableSkuCellStack}>
				<TableCellProductImage
					src={product?.thumbnail as string}
					alt={product?.name as string}
					isThumbnail={true}
					sx={orderItemTableV2DetailsImageSX}
				/>
				<Stack>
					<Typography variant="body2">{product?.name}</Typography>
					<Typography>{pN}</Typography>
				</Stack>
			</Stack>
		</TableCellResponsiveContent>
	);
};
