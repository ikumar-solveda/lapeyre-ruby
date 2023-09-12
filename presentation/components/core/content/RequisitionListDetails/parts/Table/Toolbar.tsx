/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { OneClick } from '@/components/blocks/OneClick';
import {
	ConfirmationDialog,
	ConfirmationDialogText,
} from '@/components/content/ConfirmationDialog';
import { RequisitionListDetailsTableSearchAndAddSKU } from '@/components/content/RequisitionListDetails/parts/Table/SearchAndAddSKU';
import { requisitionListDetailsTableToolbarSX } from '@/components/content/RequisitionListDetails/styles/Table/toolbar';
import { useRequisitionListDetails } from '@/data/Content/RequisitionListDetails';
import { useLocalization } from '@/data/Localization';
import { REQUISITION_LIST_DETAILS_TABLE } from '@/data/constants/requisitionLists';
import { ContentContext } from '@/data/context/content';
import { OrderItem } from '@/data/types/Order';
import { Button, Stack, Toolbar, Typography } from '@mui/material';
import { RowSelectionState } from '@tanstack/react-table';
import { entries } from 'lodash';
import { FC, useCallback, useContext, useMemo, useState } from 'react';

export const RequisitionListDetailsTableToolbar: FC<{
	rowSelection: RowSelectionState;
}> = ({ rowSelection }) => {
	const requisitionListDetailsNLS = useLocalization('RequisitionListItems');
	const { submitToCurrentPendingOrder, data, addItemToCart, deleteRequisitionListItems, readOnly } =
		useContext(ContentContext) as ReturnType<typeof useRequisitionListDetails>;
	const [openConfirm, setOpenConfirm] = useState(false);
	const selectedItems = useMemo(
		() =>
			(
				data?.orderItem?.filter(({ orderItemId }) => rowSelection[orderItemId]) ??
				([] as OrderItem[])
			).map(({ partNumber, quantity }) => ({ partNumber, quantity })),
		[data, rowSelection]
	);
	const onAddToCartClick = useCallback(async () => {
		if (selectedItems.length === 0) {
			await submitToCurrentPendingOrder();
		} else {
			await addItemToCart(selectedItems);
		}
	}, [addItemToCart, selectedItems, submitToCurrentPendingOrder]);
	const onDeleteClick = useCallback(async () => {
		setOpenConfirm(true);
	}, []);
	const onConfirmDelete = useCallback(async () => {
		await deleteRequisitionListItems(
			entries(rowSelection)
				.filter(([_, value]) => value)
				.map(([key, _]) => key)
		);
		setOpenConfirm(false);
	}, [deleteRequisitionListItems, rowSelection]);
	const onCancelDelete = useCallback(async () => {
		setOpenConfirm(false);
	}, []);
	const confirmationText = useMemo<ConfirmationDialogText>(
		() => ({ message: requisitionListDetailsNLS.DeleteDialogHeading.t() }),
		[requisitionListDetailsNLS]
	);

	return (
		<Toolbar
			sx={requisitionListDetailsTableToolbarSX}
			id={`${REQUISITION_LIST_DETAILS_TABLE}-toolbar`}
			data-testid={`${REQUISITION_LIST_DETAILS_TABLE}-toolbar`}
		>
			{readOnly || selectedItems.length > 0 ? (
				<Typography variant="subtitle1" component="div" m={1}>
					{requisitionListDetailsNLS.nProductsSel.t({ n: selectedItems.length })}
				</Typography>
			) : (
				<RequisitionListDetailsTableSearchAndAddSKU />
			)}
			<Stack direction="row" spacing={2} my={2}>
				{!readOnly && selectedItems.length > 0 ? (
					<Button
						id={`${REQUISITION_LIST_DETAILS_TABLE}-toolbar-group-delete`}
						data-testid={`${REQUISITION_LIST_DETAILS_TABLE}-toolbar-group-delete`}
						variant="outlined"
						disabled={(data?.orderItem?.length ?? 0) < 1}
						onClick={onDeleteClick}
					>
						{requisitionListDetailsNLS.deleteSelected.t()}
					</Button>
				) : (
					false
				)}
				<OneClick
					id={`${REQUISITION_LIST_DETAILS_TABLE}-toolbar-add-to-card`}
					data-testid={`${REQUISITION_LIST_DETAILS_TABLE}-toolbar-add-to-cart`}
					variant="contained"
					disabled={(data?.orderItem?.length ?? 0) < 1}
					onClick={onAddToCartClick}
				>
					{selectedItems.length > 0
						? requisitionListDetailsNLS.addSelectedToCart.t()
						: requisitionListDetailsNLS.addListToCart.t()}
				</OneClick>
			</Stack>
			{openConfirm ? (
				<ConfirmationDialog
					open={openConfirm}
					onCancel={onCancelDelete}
					onConfirm={onConfirmDelete}
					text={confirmationText}
				/>
			) : (
				false
			)}
		</Toolbar>
	);
};
