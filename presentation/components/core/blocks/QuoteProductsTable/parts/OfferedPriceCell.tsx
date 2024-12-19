/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { useLocalization } from '@/data/Localization';
import type { ProductItem } from '@/data/types/Quote';
import { CellContext } from '@tanstack/react-table';
import { useMemo, type FC } from 'react';

export const QuoteProductsTableOfferedPriceCell: FC<CellContext<ProductItem, number>> = ({
	getValue,
}) => {
	const localization = useLocalization('QuoteProductsTable');
	const offeredPrice = useMemo(() => getValue(), [getValue]);
	return (
		<TableCellResponsiveContent label={localization.OfferedPrice.t()}>
			{offeredPrice}
		</TableCellResponsiveContent>
	);
};
