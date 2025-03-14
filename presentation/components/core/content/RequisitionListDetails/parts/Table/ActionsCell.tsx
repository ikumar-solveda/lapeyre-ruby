/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import {
	ConfirmationDialog,
	ConfirmationDialogText,
} from '@/components/content/ConfirmationDialog';
import { requisitionListDetailsTableActionsCellAddCircleIconSX } from '@/components/content/RequisitionListDetails/styles/Table/actionsCellAddCircleIcon';
import { requisitionListDetailsTableActionsCellIconSX } from '@/components/content/RequisitionListDetails/styles/Table/actionsCellIcon';
import { useRequisitionListDetails } from '@/data/Content/RequisitionListDetails';
import { useLocalization } from '@/data/Localization';
import { REQUISITION_LIST_DETAILS_TABLE } from '@/data/constants/requisitionLists';
import { ContentContext } from '@/data/context/content';
import { OrderItem } from '@/data/types/Order';
import { DeleteOutlineOutlined, ShoppingCart } from '@mui/icons-material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListIcon from '@mui/icons-material/List';
import { IconButton, Stack, Tooltip } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import { type FC, useCallback, useContext, useMemo, useState } from 'react';

export const RequisitionListDetailsTableActionsCell: FC<CellContext<OrderItem, unknown>> = ({
	row,
}) => {
	const requisitionListDetailsNLS = useLocalization('RequisitionListItems');
	const { deleteRequisitionListItems, addItemToCart, readOnly, addToQuoteValue } = useContext(
		ContentContext
	) as Pick<
		ReturnType<typeof useRequisitionListDetails>,
		'deleteRequisitionListItems' | 'addItemToCart' | 'readOnly' | 'addToQuoteValue'
	>;
	const { handleOpen, entitled: entitledForQuoting } = addToQuoteValue;
	const [openConfirm, setOpenConfirm] = useState(false);
	const { id: orderItemId, original } = row;
	const { partNumber, quantity } = original;

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
				{entitledForQuoting ? (
					<IconButton
						sx={requisitionListDetailsTableActionsCellIconSX}
						color="primary"
						onClick={handleOpen({ partNumber, quantity })}
						id={`${REQUISITION_LIST_DETAILS_TABLE}-item-${row.id}-icon-add-to-quote`}
						data-testid={`${REQUISITION_LIST_DETAILS_TABLE}-item-${row.id}-icon-add-to-quote`}
					>
						<Tooltip title={requisitionListDetailsNLS.addItemToQuote.t()}>
							<ListIcon fontSize="large" />
						</Tooltip>
						<Tooltip title={requisitionListDetailsNLS.addItemToQuote.t()}>
							<AddCircleIcon
								fontSize="small"
								sx={requisitionListDetailsTableActionsCellAddCircleIconSX}
							/>
						</Tooltip>
					</IconButton>
				) : null}
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
