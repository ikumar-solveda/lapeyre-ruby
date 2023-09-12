/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext } from 'react';
import { Divider, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Row } from '@tanstack/react-table';
import { skuListTableDetailPanelSX } from '@/components/content/SkuList/styles/tableDetailPanel';
import { ProductAttribute, ProductType, SkuListTableData } from '@/data/types/Product';
import { ContentContext } from '@/data/context/content';

export const SkuListTableDetailPanel: FC<{ row: Row<SkuListTableData> }> = ({ row }) => {
	const { product } = useContext(ContentContext) as { product: ProductType };
	const { definingAttributes } = row.original;
	const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
	const drawerAttrs =
		product.definingAttributes.length > 2 ? product.definingAttributes.slice(2) : [];
	const ofInterest = definingAttributes.filter(({ identifier }) =>
		drawerAttrs.find((a) => a.identifier === identifier)
	);
	const drawerData = ofInterest.map(
		(attr) =>
			({
				...attr,
				[attr.identifier]: Array.isArray(attr.values?.[0]?.value)
					? attr.values[0].value[0]
					: attr.values?.[0]?.value,
			} as ProductAttribute & Record<string, string>)
	);
	return (
		<Paper>
			<Stack
				direction={{ xs: 'column', sm: 'row' }}
				spacing={2}
				divider={<Divider orientation={isMobile ? 'horizontal' : 'vertical'} flexItem />}
				sx={skuListTableDetailPanelSX}
			>
				{drawerData.map((drawerAttr) => (
					<Stack direction={{ xs: 'row', md: 'column' }} key={drawerAttr.identifier} spacing={1}>
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
