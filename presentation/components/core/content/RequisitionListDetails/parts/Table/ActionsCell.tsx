/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import {
	ConfirmationDialog,
	ConfirmationDialogText,
} from '@/components/content/ConfirmationDialog';
import { requisitionListDetailsTableActionsCellIconSX } from '@/components/content/RequisitionListDetails/styles/Table/actionsCellIcon';
import { useRequisitionListDetails } from '@/data/Content/RequisitionListDetails';
import { useLocalization } from '@/data/Localization';
import { REQUISITION_LIST_DETAILS_TABLE } from '@/data/constants/requisitionLists';
import { ContentContext } from '@/data/context/content';
import { OrderItem } from '@/data/types/Order';
import { DeleteOutlineOutlined, ShoppingCart } from '@mui/icons-material';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC, useCallback, useContext, useMemo, useState } from 'react';

export const RequisitionListDetailsTableActionsCell: FC<CellContext<OrderItem, unknown>> = ({
	row,
}) => {
	const requisitionListDetailsNLS = useLocalization('RequisitionListItems');
	const { deleteRequisitionListItems, addItemToCart, readOnly } = useContext(
		ContentContext
	) as Pick<
		ReturnType<typeof useRequisitionListDetails>,
		'deleteRequisitionListItems' | 'addItemToCart' | 'readOnly'
	>;
	const [openConfirm, setOpenConfirm] = useState(false);
	const orderItemId = row.id;
	const onDeleteClick = useCallback(() => {
		setOpenConfirm(true);
	}, []);

	const onAddToCartClick = useCallback(() => {
		addItemToCart([{ partNumber: row.original.partNumber, quantity: row.original.quantity }]);
	}, [addItemToCart, row]);

	const onDeleteConfirm = useCallback(async () => {
		await deleteRequisitionListItems([orderItemId]);
		setOpenConfirm(false);
	}, [orderItemId, deleteRequisitionListItems]);
	const onDeleteCancel = useCallback(async () => {
		setOpenConfirm(false);
	}, []);

	const confirmationText = useMemo<ConfirmationDialogText>(
		() => ({ message: requisitionListDetailsNLS.DeleteDialogHeading.t() }),
		[requisitionListDetailsNLS]
	);

	return (
		<TableCellResponsiveContent label={requisitionListDetailsNLS.actions.t()}>
			<Stack direction="row">
				<IconButton
					sx={requisitionListDetailsTableActionsCellIconSX}
					color="primary"
					onClick={onDeleteClick}
					disabled={readOnly}
					id={`${REQUISITION_LIST_DETAILS_TABLE}-item-${row.id}-icon-delete`}
					data-testid={`${REQUISITION_LIST_DETAILS_TABLE}-item-${row.id}-icon-delete`}
				>
					<Tooltip title={requisitionListDetailsNLS.deleteItem.t()}>
						<DeleteOutlineOutlined />
					</Tooltip>
				</IconButton>
				<IconButton
					sx={requisitionListDetailsTableActionsCellIconSX}
					color="primary"
					onClick={onAddToCartClick}
					id={`${REQUISITION_LIST_DETAILS_TABLE}-item-${row.id}-icon-add-to-cart`}
					data-testid={`${REQUISITION_LIST_DETAILS_TABLE}-item-${row.id}-icon-add-to-cart`}
				>
					<Tooltip title={requisitionListDetailsNLS.addToCart.t()}>
						<ShoppingCart />
					</Tooltip>
				</IconButton>
			</Stack>
			{openConfirm ? (
				<ConfirmationDialog
					open={openConfirm}
					onCancel={onDeleteCancel}
					onConfirm={onDeleteConfirm}
					text={confirmationText}
				/>
			) : (
				false
			)}
		</TableCellResponsiveContent>
	);
};
