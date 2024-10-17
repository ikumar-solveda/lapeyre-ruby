/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { gpsiacTableSkuListTableDetailPanelDrawerStack } from '@/components/content/GroupedProductStoreInventoryAtCartTable/styles/skuListTable/detailPanelDrawerStack';
import { gpsiacTableSkuListTableDetailPanelStack } from '@/components/content/GroupedProductStoreInventoryAtCartTable/styles/skuListTable/detailPanelStack';
import { ContentContext } from '@/data/context/content';
import { ProductAttribute, ProductType } from '@/data/types/Product';
import { GPSIACNestedSkuListTableContextValue } from '@/data/types/SkuListTable';
import { getSkuListDisplayableColumns } from '@/utils/getSkuListDisplayableColumns';
import { Divider, Paper, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Row } from '@tanstack/react-table';
import { FC, useContext, useMemo } from 'react';

export const GPSIACTableSkuListTableDetailPanel: FC<{ row: Row<ProductType> }> = ({ row }) => {
	// retrieve parent product to define overflow attributes of the sku
	const { parentProduct } = useContext(ContentContext) as GPSIACNestedSkuListTableContextValue;
	const { definingAttributes } = row.original;
	const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
	const drawerData = useMemo(() => {
		const { limit, overflow } = getSkuListDisplayableColumns(parentProduct, true);
		const drawerAttrs = overflow > 0 ? parentProduct.definingAttributes.slice(limit) : [];
		const ofInterest = definingAttributes.filter(({ identifier }) =>
			drawerAttrs.find((a) => a.identifier === identifier)
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
	}, [definingAttributes, parentProduct]);

	return (
		<Paper>
			<Stack
				{...gpsiacTableSkuListTableDetailPanelStack}
				divider={<Divider orientation={isMobile ? 'horizontal' : 'vertical'} flexItem />}
			>
				{drawerData.map((drawerAttr) => (
					<Stack {...gpsiacTableSkuListTableDetailPanelDrawerStack} key={drawerAttr.identifier}>
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
