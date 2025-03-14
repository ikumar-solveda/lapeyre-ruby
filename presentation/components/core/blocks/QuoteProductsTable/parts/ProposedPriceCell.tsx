/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { NumberInput } from '@/components/blocks/NumberInput';
import { PriceDisplayBase } from '@/components/blocks/PriceDisplay';
import { quoteProductsTableProposedPriceCellInputSX } from '@/components/blocks/QuoteProductsTable/styles/proposedPriceCellInput';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { EMPTY_STRING } from '@/data/constants/marketing';
import type { useQuoteProducts } from '@/data/Content/QuoteProducts';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { dFix, useSettings } from '@/data/Settings';
import type { ProductItem, QuoteProductsTableContextValues } from '@/data/types/Quote';
import { getCurrencySymbol } from '@/utils/formatPrice';
import { CellContext } from '@tanstack/react-table';
import { debounce } from 'lodash';
import { useContext, useMemo, type FC } from 'react';

export const QuoteProductsTableProposedPriceCell: FC<CellContext<ProductItem, number>> = ({
	getValue,
	row,
}) => {
	const { settings } = useSettings();
	const localization = useLocalization('QuoteProductsTable');
	const proposedPrice = useMemo(() => getValue(), [getValue]);
	const {
		handleProposedPriceChange,
		editProposedPrice,
		currency = settings.defaultCurrency,
		decimalPlaces,
		locale,
	} = useContext(ContentContext) as ReturnType<typeof useQuoteProducts> &
		QuoteProductsTableContextValues;

	const debouncedQuantityChange = useMemo(
		() =>
			debounce((updatedPrice) => {
				if (updatedPrice !== null && updatedPrice > 0 && updatedPrice !== Number(proposedPrice)) {
					handleProposedPriceChange(updatedPrice, row.original.id as string);
				}
			}, 500),
		[handleProposedPriceChange, proposedPrice, row]
	);
	const currencySymbol = useMemo(
		() => getCurrencySymbol(locale, currency ?? settings.defaultCurrency),
		[currency, locale, settings]
	);
	return (
		<TableCellResponsiveContent label={localization.ProposedPrice.t()}>
			{editProposedPrice ? (
				<NumberInput
					data-testid="quote-products-table-proposed-price-cell-input"
					id="quote-products-table-proposed-price-cell-input"
					onChange={debouncedQuantityChange}
					value={proposedPrice}
					min={1}
					disallowEmptyOnBlur={true}
					sx={quoteProductsTableProposedPriceCellInputSX(`${proposedPrice}`.length)}
					precision={dFix(decimalPlaces ?? EMPTY_STRING, 0)}
					{...currencySymbol}
				/>
			) : (
				<PriceDisplayBase min={proposedPrice} currency={currency} />
			)}
		</TableCellResponsiveContent>
	);
};
