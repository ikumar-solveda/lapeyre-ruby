/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type { ProductItem, QuoteProductsTableContextValues } from '@/data/types/Quote';
import { formatPrice } from '@/utils/formatPrice';
import { CellContext } from '@tanstack/react-table';
import { useContext, useMemo, type FC } from 'react';

export const QuoteProductsTablePriceCell: FC<CellContext<ProductItem, number>> = ({ getValue }) => {
	const localization = useLocalization('QuoteProductsTable');
	const { decimalPlaces, locale, currency } = useContext(
		ContentContext
	) as QuoteProductsTableContextValues;
	const price = useMemo(() => getValue(), [getValue]);
	return (
		<TableCellResponsiveContent label={localization.Price.t()}>
			{currency ? formatPrice(locale, currency, price, decimalPlaces) : price}
		</TableCellResponsiveContent>
	);
};
