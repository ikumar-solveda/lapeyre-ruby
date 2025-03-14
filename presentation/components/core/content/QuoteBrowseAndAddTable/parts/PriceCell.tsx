/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { PriceDisplayBase } from '@/components/blocks/PriceDisplay';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import type { ProductDisplayPrice, ProductType } from '@/data/types/Product';
import type { QuoteBrowseAndAddTableContextValues } from '@/data/types/Quote';
import { CellContext } from '@tanstack/react-table';
import { useContext, useMemo, type FC } from 'react';

const EMPTY_PRICE: ProductDisplayPrice = {
	offer: 0,
	list: 0,
};

export const QuoteBrowseAndAddTablePriceCell: FC<CellContext<ProductType, ProductDisplayPrice>> = ({
	getValue,
}) => {
	const localization = useLocalization('QuoteProductsTable');
	const { settings } = useSettings();
	const { currency = settings.defaultCurrency } = useContext(
		ContentContext
	) as QuoteBrowseAndAddTableContextValues;
	const { offer = 0, list = 0 } = useMemo(() => getValue() ?? EMPTY_PRICE, [getValue]);
	return (
		<TableCellResponsiveContent label={localization.Price.t()}>
			<PriceDisplayBase min={offer || list} currency={currency} />
		</TableCellResponsiveContent>
	);
};
