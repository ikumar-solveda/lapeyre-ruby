/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { gpsiacTableSkuListTableCollapsibleIconSX } from '@/components/content/GroupedProductStoreInventoryAtCartTable/styles/skuListTable/collapsibleIcon';
import { useLocalization } from '@/data/Localization';
import { ProductType } from '@/data/types/Product';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { IconButton } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';

export const GPSIACTableSkuListTableCollapsibleCell: FC<CellContext<ProductType, unknown>> = ({
	row,
}) => {
	const { showAttributes } = useLocalization('productDetail');
	const open = row.getIsExpanded();
	return (
		<TableCellResponsiveContent label={showAttributes.t()}>
			<IconButton color="primary" onClick={row.getToggleExpandedHandler()}>
				<KeyboardArrowRightIcon sx={gpsiacTableSkuListTableCollapsibleIconSX(open)} />
			</IconButton>
		</TableCellResponsiveContent>
	);
};
