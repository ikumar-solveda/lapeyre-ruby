/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { quoteProductsTableDetailPanelDrawerStack } from '@/components/blocks/QuoteProductsTable/styles/detailPanelDrawerStack';
import { quoteProductsTableDetailPanelStack } from '@/components/blocks/QuoteProductsTable/styles/detailPanelStack';
import { ContentContext } from '@/data/context/content';
import { ProductAttribute, ProductType } from '@/data/types/Product';
import { ProductItem, QuoteProductsTableContextValues } from '@/data/types/Quote';
import { getSkuListDisplayableColumns } from '@/utils/getSkuListDisplayableColumns';
import { Divider, Paper, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Row } from '@tanstack/react-table';
import { FC, useContext, useMemo } from 'react';

export const QuoteProductsTableDetailPanel: FC<{ row: Row<ProductItem> }> = ({ row }) => {
	const sku = useMemo(() => row.original.sku, [row]);
	const { productsDetailsData } = useContext(ContentContext) as QuoteProductsTableContextValues;
	const product = useMemo(
		() => productsDetailsData?.find((product: ProductType) => product.partNumber === sku),
		[productsDetailsData, sku]
	);
	const { definingAttributes } = product as ProductType;
	const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
	const drawerData = useMemo(() => {
		const { limit, overflow } = getSkuListDisplayableColumns(product as ProductType, true);
		const drawerAttrs = overflow > 0 ? product?.definingAttributes.slice(limit) : [];
		const ofInterest = definingAttributes.filter(({ identifier }) =>
			drawerAttrs?.find((a) => a.identifier === identifier)
		);
		return ofInterest.map(
			(attr) =>
				({
					...attr,
					[attr.identifier]: Array.isArray(attr.values?.[0]?.value)
						? attr.values[0].value[0]
						: attr.values?.[0]?.value,
				} as ProductAttribute & Record<string, string>)
		);
	}, [definingAttributes, product]);

	return (
		<Paper>
			<Stack
				{...quoteProductsTableDetailPanelStack}
				divider={<Divider orientation={isMobile ? 'horizontal' : 'vertical'} flexItem />}
			>
				{drawerData.map((drawerAttr) => (
					<Stack {...quoteProductsTableDetailPanelDrawerStack} key={drawerAttr.identifier}>
						<Typography variant="body2" component="p">
							{drawerAttr.name}
						</Typography>
						<Typography component="p">{drawerAttr[drawerAttr.identifier]}</Typography>
					</Stack>
				))}
			</Stack>
		</Paper>
	);
};
