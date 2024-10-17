/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { skuListTableCollapsibleIconSX } from '@/components/content/SkuList/styles/collapsibleIcon';
import { useLocalization } from '@/data/Localization';
import { SkuListTableData } from '@/data/types/Product';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { IconButton } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';

export const SkuListTableCollapsibleCell: FC<CellContext<SkuListTableData, unknown>> = ({
	row,
}) => {
	const { showAttributes } = useLocalization('productDetail');
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
			</IconButton>
		</TableCellResponsiveContent>
	);
};
