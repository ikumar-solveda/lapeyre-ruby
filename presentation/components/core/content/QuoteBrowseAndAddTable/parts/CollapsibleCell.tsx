/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { quoteBrowseAndAddTableCollapsibleIconSX } from '@/components/content/QuoteBrowseAndAddTable/styles/collapsibleIcon';
import { quoteBrowseAndAddTableCollapsibleIconButtonSX } from '@/components/content/QuoteBrowseAndAddTable/styles/collapsibleIconButton';
import { useLocalization } from '@/data/Localization';
import type { ProductType } from '@/data/types/Product';
import { KeyboardArrowRight } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import type { FC } from 'react';

export const QuoteBrowseAndAddTableCollapsibleCell: FC<CellContext<ProductType, unknown>> = ({
	row,
}) => {
	const pdp = useLocalization('productDetail');
	const open = row.getIsExpanded();
	return (
		<TableCellResponsiveContent label={pdp.showAttributes.t()}>
			<IconButton
				color="primary"
				onClick={row.getToggleExpandedHandler()}
				sx={quoteBrowseAndAddTableCollapsibleIconButtonSX}
				title={pdp.showAttributes.t()}
				id="quote-browse-and-add-table-collapsible-button"
				data-testid="quote-browse-and-add-table-collapsible-button"
			>
				<KeyboardArrowRight sx={quoteBrowseAndAddTableCollapsibleIconSX(open)} />
			</IconButton>
		</TableCellResponsiveContent>
	);
};
