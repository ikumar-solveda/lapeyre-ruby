/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { BundleTableRowData } from '@/data/types/Product';
import { CellContext } from '@tanstack/react-table';
import { Typography } from '@mui/material';
import { FC } from 'react';
import { PriceDisplay } from '@/components/blocks/PriceDisplay';
import { useLocalization } from '@/data/Localization';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { findPrice } from '@/components/content/Bundle/parts/Table';

export const BundleTablePrice: FC<CellContext<BundleTableRowData, unknown>> = ({ row }) => {
	const { Price } = useLocalization('productDetail');
	const rowData = row.original;
	const { value: disp, currency } = findPrice(rowData.selectedSku?.price ?? rowData.price);

	return (
		<TableCellResponsiveContent label={Price.t()}>
			<Typography variant="h6" data-testid="offer-price" id="offer-price">
				<PriceDisplay currency={currency as string} min={disp} />
			</Typography>
		</TableCellResponsiveContent>
	);
};
