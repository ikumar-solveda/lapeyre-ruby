/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { skuListTableDetailPanelSX } from '@/components/content/SkuList/styles/tableDetailPanel';
import { ContentContext } from '@/data/context/content';
import { ProductAttribute, SkuListTableData } from '@/data/types/Product';
import { SkuListTableAuxiliaryContextValue } from '@/data/types/SkuListTable';
import { getSkuListDisplayableColumns } from '@/utils/getSkuListDisplayableColumns';
import { Divider, Paper, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Row } from '@tanstack/react-table';
import { FC, useContext, useMemo } from 'react';

export const SkuListTableDetailPanel: FC<{ row: Row<SkuListTableData> }> = ({ row }) => {
	const { product, embedded } = useContext(ContentContext) as SkuListTableAuxiliaryContextValue;
	const { definingAttributes } = row.original;
	const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
	const drawerData = useMemo(() => {
		const { limit, overflow } = getSkuListDisplayableColumns(product, embedded);
		const drawerAttrs = overflow > 0 ? product.definingAttributes.slice(limit) : [];
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
	}, [definingAttributes, embedded, product]);

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
