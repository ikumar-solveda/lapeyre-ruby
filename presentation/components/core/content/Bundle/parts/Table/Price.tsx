/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PriceDisplay } from '@/components/blocks/PriceDisplay';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { findPrice } from '@/components/content/Bundle/parts/Table';
import { useLocalization } from '@/data/Localization';
import { BundleTableRowData } from '@/data/types/Product';
import { Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';

export const BundleTablePrice: FC<CellContext<BundleTableRowData, unknown>> = ({ row }) => {
	const productDetailNLS = useLocalization('productDetail');
	const priceDisplayNLS = useLocalization('PriceDisplay');
	const rowData = row.original;
	const { value: disp, currency } = findPrice(rowData.selectedSku?.price ?? rowData.price);

	return (
		<TableCellResponsiveContent label={productDetailNLS.Price.t()}>
			<Typography variant="h6" data-testid="offer-price" id="offer-price">
				{disp ? (
					<PriceDisplay currency={currency as string} min={disp} />
				) : (
					priceDisplayNLS.Labels.Pending.t()
				)}
			</Typography>
		</TableCellResponsiveContent>
	);
};
