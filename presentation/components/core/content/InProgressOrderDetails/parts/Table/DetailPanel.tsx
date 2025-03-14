/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { inProgressOrderDetailsTableAttributeStack } from '@/components/content/InProgressOrderDetails/styles/Table/attributeStack';
import { inProgressOrderDetailsTableDetailPanelStack } from '@/components/content/InProgressOrderDetails/styles/Table/detailPanelStack';
import type { useInProgressOrderDetails } from '@/data/Content/InProgressOrderDetails';
import { ContentContext } from '@/data/context/content';
import type { OrderItem } from '@/data/types/Order';
import { Divider, Paper, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Row } from '@tanstack/react-table';
import { useContext, useMemo, type FC } from 'react';

const EMPTY_SKU = {};
export const InProgressOrderDetailsTableDetailPanel: FC<{ row: Row<OrderItem> }> = ({ row }) => {
	const { products } = useContext(ContentContext) as ReturnType<typeof useInProgressOrderDetails>;
	const sku = products[row.original.partNumber] ?? EMPTY_SKU;
	const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
	const drawerData = useMemo(
		() =>
			sku.attributes?.map(({ name, identifier, values }) => ({
				name,
				identifier,
				value: Array.isArray(values?.[0].value) ? values[0].value[0] : values?.[0].value,
			})),
		[sku]
	);
	return (
		<Paper elevation={0}>
			<Stack
				divider={<Divider orientation={isMobile ? 'horizontal' : 'vertical'} flexItem />}
				{...inProgressOrderDetailsTableDetailPanelStack}
			>
				{drawerData.map(({ name, identifier, value }) => (
					<Stack key={identifier} {...inProgressOrderDetailsTableAttributeStack}>
						<Typography variant="body2" component="p">
							{name}
						</Typography>
						<Typography component="p">{value}</Typography>
					</Stack>
				))}
			</Stack>
		</Paper>
	);
};
