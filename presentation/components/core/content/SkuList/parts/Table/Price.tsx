/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PriceDisplay } from '@/components/blocks/PriceDisplay';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { useLocalization } from '@/data/Localization';
import { SkuListTableData } from '@/data/types/Product';
import { Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';

export const SkuListTablePrice: FC<CellContext<SkuListTableData, unknown>> = ({ row }) => {
	const { Price } = useLocalization('productDetail');
	const { productPrice } = row.original;
	const disp = (productPrice?.offer || null) as number;

	return (
		<TableCellResponsiveContent label={Price.t()}>
			<Typography data-testid="offer-price" id="offer-price">
				<PriceDisplay currency={productPrice?.currency} min={disp} />
			</Typography>
		</TableCellResponsiveContent>
	);
};
