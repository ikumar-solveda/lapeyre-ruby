/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { quoteBrowseAndAddTableDetailPanelDrawerStack } from '@/components/content/QuoteBrowseAndAddTable/styles/detailPanelDrawerStack';
import { quoteBrowseAndAddTableDetailPanelStack } from '@/components/content/QuoteBrowseAndAddTable/styles/detailPanelStack';
import { ContentContext } from '@/data/context/content';
import type { ProductAttribute, ProductType } from '@/data/types/Product';
import type { QuoteBrowseAndAddTableContextValues } from '@/data/types/Quote';
import { getSkuListDisplayableColumns } from '@/utils/getSkuListDisplayableColumns';
import { Divider, Paper, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { Row } from '@tanstack/react-table';
import { type FC, useContext, useMemo } from 'react';

export const QuoteBrowseAndAddTableDetailPanel: FC<{ row: Row<ProductType> }> = ({ row }) => {
	const sku = row.original.partNumber;
	const { productsDetailsData } = useContext(ContentContext) as QuoteBrowseAndAddTableContextValues;
	const product = useMemo(
		() => productsDetailsData.find(({ partNumber }) => partNumber === sku),
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
				{...quoteBrowseAndAddTableDetailPanelStack}
				divider={<Divider orientation={isMobile ? 'horizontal' : 'vertical'} flexItem />}
			>
				{drawerData.map((drawerAttr) => (
					<Stack {...quoteBrowseAndAddTableDetailPanelDrawerStack} key={drawerAttr.identifier}>
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
