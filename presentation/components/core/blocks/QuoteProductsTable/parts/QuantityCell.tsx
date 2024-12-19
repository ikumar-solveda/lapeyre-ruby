/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { NumberInput } from '@/components/blocks/NumberInput';
import { quoteProductsTableQuantityCellInputSX } from '@/components/blocks/QuoteProductsTable/styles/quantityCellInput';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import type { useQuoteProducts } from '@/data/Content/QuoteProducts';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type { ProductItem, QuoteProductsTableContextValues } from '@/data/types/Quote';
import { CellContext } from '@tanstack/react-table';
import { debounce } from 'lodash';
import { useContext, useMemo, type FC } from 'react';

export const QuoteProductsTableQuantityCell: FC<CellContext<ProductItem, number>> = ({
	getValue,
	row,
}) => {
	const localization = useLocalization('QuoteProductsTable');
	const quantity = useMemo(() => getValue(), [getValue]);
	const { onProductQuantityChange, detailsView } = useContext(ContentContext) as ReturnType<
		typeof useQuoteProducts
	> &
		QuoteProductsTableContextValues;

	const debouncedQuantityChange = useMemo(
		() =>
			debounce((updatedQuantity) => {
				if (
					updatedQuantity !== null &&
					updatedQuantity > 0 &&
					updatedQuantity !== Number(quantity)
				) {
					onProductQuantityChange(updatedQuantity, row.original.id as string);
				}
			}, 500),
		[onProductQuantityChange, quantity, row]
	);
	return (
		<TableCellResponsiveContent label={localization.Quantity.t()}>
			{detailsView ? (
				quantity
			) : (
				<NumberInput
					onChange={debouncedQuantityChange}
					value={quantity}
					min={1}
					showControls
					disallowEmptyOnBlur={true}
					sx={quoteProductsTableQuantityCellInputSX(`${quantity}`.length)}
				/>
			)}
		</TableCellResponsiveContent>
	);
};
