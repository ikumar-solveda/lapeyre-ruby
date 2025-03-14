/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { PriceDisplayBase } from '@/components/blocks/PriceDisplay';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import type { ProductItem, QuoteProductsTableContextValues } from '@/data/types/Quote';
import { CellContext } from '@tanstack/react-table';
import { useContext, useMemo, type FC } from 'react';

export const QuoteProductsTableOfferedPriceCell: FC<CellContext<ProductItem, number>> = ({
	getValue,
}) => {
	const localization = useLocalization('QuoteProductsTable');
	const offeredPrice = useMemo(() => getValue(), [getValue]);
	const { settings } = useSettings();
	const { currency = settings.defaultCurrency } = useContext(
		ContentContext
	) as QuoteProductsTableContextValues;

	return (
		<TableCellResponsiveContent label={localization.OfferedPrice.t()}>
			<PriceDisplayBase min={offeredPrice} currency={currency} />
		</TableCellResponsiveContent>
	);
};
