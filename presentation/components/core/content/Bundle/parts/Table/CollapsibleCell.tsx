/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { bundleTableCollapsibleSX } from '@/components/content/Bundle/styles/Table/collapsible';
import { bundleTableCollapsibleIconSX } from '@/components/content/Bundle/styles/Table/collapsibleIcon';
import { bundleTableSelectSX } from '@/components/content/Bundle/styles/Table/select';
import { useLocalization } from '@/data/Localization';
import { BUNDLE_TABLE_PREFIX } from '@/data/constants/product';
import { BundleTableRowData } from '@/data/types/Product';
import { KeyboardArrowRight } from '@mui/icons-material';
import { Box, Button, IconButton, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';

export const BundleTableCollapsibleCell: FC<CellContext<BundleTableRowData, unknown>> = ({
	row,
}) => {
	const { showAttributes, hideAttrs } = useLocalization('productDetail');
	const open = row.getIsExpanded();
	const toggleOpen = row.getToggleExpandedHandler();
	const { definingAttributes, rowNumber } = row.original;
	const disabled = definingAttributes.length === 0;
	const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));

	return (
		<TableCellResponsiveContent label={showAttributes.t()}>
			<Box sx={bundleTableCollapsibleSX(disabled)}>
				{isMobile ? (
					<Button
						data-testid={`select-attributes-${rowNumber}-link`}
						id={`select-attributes-${rowNumber}-link`}
						onClick={() => row.toggleExpanded()}
						sx={bundleTableSelectSX}
						aria-controls={`${BUNDLE_TABLE_PREFIX}-table-row-${row.id}-expanded`}
						aria-expanded={row.getIsExpanded()}
					>
						{open ? hideAttrs.t() : showAttributes.t()}
					</Button>
				) : (
					<Tooltip title={open ? hideAttrs.t() : showAttributes.t()}>
						<IconButton
							aria-expanded="false"
							aria-label="row"
							size="large"
							color="primary"
							onClick={toggleOpen}
						>
							<KeyboardArrowRight sx={bundleTableCollapsibleIconSX(open)} />
						</IconButton>
					</Tooltip>
				)}
			</Box>
		</TableCellResponsiveContent>
	);
};
