/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { requisitionListDetailsTableToggleAttributesIconSX } from '@/components/content/RequisitionListDetails/styles/Table/toggleAttributesIcon';
import { useLocalization } from '@/data/Localization';
import { REQUISITION_LIST_DETAILS_TABLE } from '@/data/constants/requisitionLists';
import { OrderItem } from '@/data/types/Order';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { IconButton } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';

export const RequisitionListDetailsTableToggleAttributesCell: FC<
	CellContext<OrderItem, unknown>
> = ({ row }) => {
	const { ShowAttributes } = useLocalization('RequisitionListItems');
	const open = row.getIsExpanded();
	return (
		<TableCellResponsiveContent label={ShowAttributes.t()}>
			<IconButton
				id={`${REQUISITION_LIST_DETAILS_TABLE}-${row.id}-quantity`}
				data-testid={`${REQUISITION_LIST_DETAILS_TABLE}-${row.id}-quantity`}
				aria-expanded={row.getIsExpanded()}
				aria-label="row"
				size="medium"
				color="primary"
				onClick={row.getToggleExpandedHandler()}
			>
				<KeyboardArrowRightIcon sx={requisitionListDetailsTableToggleAttributesIconSX(open)} />
			</IconButton>
		</TableCellResponsiveContent>
	);
};
