/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { requisitionListDetailsTableCheckboxSX } from '@/components/content/RequisitionListDetails/styles/Table/checkbox';
import { useLocalization } from '@/data/Localization';
import { REQUISITION_LIST_DETAILS_TABLE } from '@/data/constants/requisitionLists';
import { OrderItem } from '@/data/types/Order';
import { Checkbox } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';

export const RequisitionListDetailsTableCheckboxCell: FC<CellContext<OrderItem, unknown>> = ({
	row,
}) => {
	const requisitionListDetailsNLS = useLocalization('RequisitionListItems');

	return (
		<TableCellResponsiveContent label={requisitionListDetailsNLS.Select.t()}>
			<Checkbox
				id={`${REQUISITION_LIST_DETAILS_TABLE}-select-item-${row.id}`}
				data-testid={`${REQUISITION_LIST_DETAILS_TABLE}-select-item-${row.id}`}
				aria-label={requisitionListDetailsNLS.Select.t()}
				checked={row.getIsSelected()}
				onChange={row.getToggleSelectedHandler()}
				sx={requisitionListDetailsTableCheckboxSX}
			/>
		</TableCellResponsiveContent>
	);
};
