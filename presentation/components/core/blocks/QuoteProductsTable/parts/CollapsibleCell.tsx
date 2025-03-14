/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { quoteProductsTableCollapsibleIconSX } from '@/components/blocks/QuoteProductsTable/styles/collapsibleIcon';
import { quoteProductsTableCollapsibleIconButtonSX } from '@/components/blocks/QuoteProductsTable/styles/collapsibleIconButton';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { useLocalization } from '@/data/Localization';
import type { ProductItem } from '@/data/types/Quote';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { IconButton } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import type { FC } from 'react';

export const QuoteProductsTableCollapsibleCell: FC<CellContext<ProductItem, unknown>> = ({
	row,
}) => {
	const pdp = useLocalization('productDetail');
	const open = row.getIsExpanded();
	return (
		<TableCellResponsiveContent label={pdp.showAttributes.t()}>
			<IconButton
				color="primary"
				onClick={row.getToggleExpandedHandler()}
				sx={quoteProductsTableCollapsibleIconButtonSX}
				title={pdp.showAttributes.t()}
				id="quote-products-table-collapsible-cell-button"
				data-testid="quote-products-table-collapsible-cell-button"
			>
				<KeyboardArrowRightIcon sx={quoteProductsTableCollapsibleIconSX(open)} />
			</IconButton>
		</TableCellResponsiveContent>
	);
};
