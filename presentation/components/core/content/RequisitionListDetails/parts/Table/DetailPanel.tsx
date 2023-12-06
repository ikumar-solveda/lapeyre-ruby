/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { requisitionListDetailsTableDetailPanelSX } from '@/components/content/RequisitionListDetails/styles/Table/detailPanel';
import { requisitionListDetailsTableDetailPanelStack } from '@/components/content/RequisitionListDetails/styles/Table/detailPanelStack';
import { useOrderItemTableRow } from '@/data/Content/OrderItemTable';
import { ContentContext } from '@/data/context/content';
import { ProductAttribute } from '@/data/types/Product';
import { Divider, Paper, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC, useContext } from 'react';

export const RequisitionListDetailsTableDetailPanel: FC = () => {
	const { details } = useContext(ContentContext) as ReturnType<typeof useOrderItemTableRow>;
	const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
	const drawerData = details.attributes.map(
		(attr) =>
			({
				...attr,
				[attr.identifier]: Array.isArray(attr.values?.[0].value)
					? attr.values[0].value[0]
					: attr.values?.[0].value,
			} as ProductAttribute & Record<string, string>)
	);
	return (
		<Paper elevation={0}>
			<Stack
				{...requisitionListDetailsTableDetailPanelStack}
				divider={<Divider orientation={isMobile ? 'horizontal' : 'vertical'} flexItem />}
				sx={requisitionListDetailsTableDetailPanelSX}
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
