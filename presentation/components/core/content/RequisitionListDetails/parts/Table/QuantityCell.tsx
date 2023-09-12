/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { NumberInput } from '@/components/blocks/NumberInput';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { requisitionListDetailsTableQuantitySX } from '@/components/content/RequisitionListDetails/styles/Table/quantity';
import { useRequisitionListDetails } from '@/data/Content/RequisitionListDetails';
import { useLocalization } from '@/data/Localization';
import { REQUISITION_LIST_DETAILS_TABLE } from '@/data/constants/requisitionLists';
import { ContentContext } from '@/data/context/content';
import { OrderItem } from '@/data/types/Order';
import { CellContext } from '@tanstack/react-table';
import { debounce } from 'lodash';
import { FC, useContext, useMemo } from 'react';

export const RequisitionListDetailsTableQuantityCell: FC<CellContext<OrderItem, string>> = ({
	getValue,
	row,
}) => {
	const { updateRequisitionListItem, readOnly } = useContext(ContentContext) as Pick<
		ReturnType<typeof useRequisitionListDetails>,
		'updateRequisitionListItem' | 'readOnly'
	>;
	const quantity = getValue();
	const { id: orderItemId } = row;
	const localization = useLocalization('RequisitionListItems');

	const debouncedQuantityChange = useMemo(
		() =>
			debounce((updatedQuantity) => {
				if (
					updatedQuantity !== null &&
					updatedQuantity > 0 &&
					updatedQuantity !== Number(quantity)
				) {
					updateRequisitionListItem({ orderItemId, quantity: updatedQuantity });
				}
			}, 500),
		[orderItemId, quantity, updateRequisitionListItem]
	);
	return (
		<TableCellResponsiveContent label={localization.quantity.t()}>
			<NumberInput
				id={`${REQUISITION_LIST_DETAILS_TABLE}-${row.id}-quantity`}
				data-testid={`${REQUISITION_LIST_DETAILS_TABLE}-${row.id}-quantity`}
				onChange={debouncedQuantityChange}
				value={quantity}
				min={1}
				showControls
				disallowEmptyOnBlur={true}
				disabled={readOnly}
				sx={requisitionListDetailsTableQuantitySX}
			/>
		</TableCellResponsiveContent>
	);
};
