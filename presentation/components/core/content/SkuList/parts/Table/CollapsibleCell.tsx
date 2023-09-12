/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { FC } from 'react';
import { IconButton, Typography } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useLocalization } from '@/data/Localization';
import { CellContext } from '@tanstack/react-table';
import { skuListTableCollapsibleIconSX } from '@/components/content/SkuList/styles/collapsibleIcon';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { SkuListTableData } from '@/data/types/Product';

export const SkuListTableCollapsibleCell: FC<CellContext<SkuListTableData, unknown>> = ({
	row,
}) => {
	const { showAttributes, hideAttrs } = useLocalization('productDetail');
	const open = row.getIsExpanded();
	return (
		<TableCellResponsiveContent label={showAttributes.t()}>
			<IconButton
				aria-expanded="false"
				aria-label="row"
				size="medium"
				color="primary"
				onClick={row.getToggleExpandedHandler()}
			>
				<KeyboardArrowRightIcon sx={skuListTableCollapsibleIconSX(open)} />
				<Typography>{open ? hideAttrs.t() : showAttributes.t()}</Typography>
			</IconButton>
		</TableCellResponsiveContent>
	);
};
