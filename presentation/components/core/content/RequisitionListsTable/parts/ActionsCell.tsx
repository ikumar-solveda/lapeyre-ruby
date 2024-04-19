/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import {
	ConfirmationDialog,
	ConfirmationDialogText,
} from '@/components/content/ConfirmationDialog';
import { RequisitionListsTableCopyListDialog } from '@/components/content/RequisitionListsTable/parts/CopyListDialog';
import { requisitionListsTableActionsCellIconSX } from '@/components/content/RequisitionListsTable/styles/actionsCellIcon';
import { useRequisitionListsTable } from '@/data/Content/RequisitionListsTable';
import { useRequisitionListsTableActions } from '@/data/Content/RequisitionListsTableActions';
import { useLocalization } from '@/data/Localization';
import { REQUISITION_LISTS_TABLE } from '@/data/constants/requisitionLists';
import { RequisitionListsItem } from '@/data/types/RequisitionLists';
import { AddShoppingCart, ContentCopyOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { CellContext, TableMeta } from '@tanstack/react-table';
import { FC, useCallback, useMemo } from 'react';

interface TableMetaCopy extends TableMeta<RequisitionListsItem> {
	mutateRequisitionLists: ReturnType<typeof useRequisitionListsTable>['mutateRequisitionLists'];
}

export const RequisitionListsTableActionsCell: FC<CellContext<RequisitionListsItem, unknown>> = ({
	column,
	row,
	table,
}) => {
	const requisitionListsNLS = useLocalization('RequisitionLists');
	const { state, data, onPaginationChange, meta, pageCount } = table.options;
	const { mutateRequisitionLists } = (meta ?? {}) as TableMetaCopy;
	const {
		onCopyClick,
		closeCopyListDialog,
		onCopyListDialogSubmit,
		onAddToCart,
		onDeleteClick,
		copyListDialogValues,
		readOnly,
		onDeleteCancel,
		openDeleteConfirm,
		onDeleteConfirm: _onDeleteConfirm,
	} = useRequisitionListsTableActions({ row, mutateRequisitionLists });

	const onDeleteConfirm = useCallback(async () => {
		await _onDeleteConfirm();
		const pageIndex = state.pagination?.pageIndex ?? 0;
		if (pageIndex > 0 && pageIndex + 1 === pageCount && data.length === 1 && onPaginationChange) {
			onPaginationChange((prev) => ({ ...prev, pageIndex: pageIndex - 1 }));
		}
	}, [_onDeleteConfirm, data, onPaginationChange, pageCount, state]);

	const deleteConfirmationText = useMemo<ConfirmationDialogText>(
		() => ({
			title: requisitionListsNLS.DeleteDialogTitle.t(),
			message: requisitionListsNLS.DeleteDialogHeading.t(),
		}),
		[requisitionListsNLS]
	);

	return (
		<TableCellResponsiveContent label={column.columnDef.header as string}>
			<Stack direction="row">
				<IconButton
					sx={requisitionListsTableActionsCellIconSX}
					color="primary"
					onClick={onCopyClick}
					id={`${REQUISITION_LISTS_TABLE}-${row.id}-actions-copy-button`}
					data-testid={`${REQUISITION_LISTS_TABLE}-${row.id}-actions-copy-button`}
				>
					<Tooltip title={requisitionListsNLS.CopyList.t()}>
						<ContentCopyOutlined />
					</Tooltip>
				</IconButton>
				<IconButton
					sx={requisitionListsTableActionsCellIconSX}
					color="primary"
					onClick={onDeleteClick}
					disabled={readOnly}
					id={`${REQUISITION_LISTS_TABLE}-${row.id}-actions-delete-button`}
					data-testid={`${REQUISITION_LISTS_TABLE}-${row.id}-actions-delete-button`}
				>
					<Tooltip title={requisitionListsNLS.DeleteList.t()}>
						<DeleteOutlineOutlined />
					</Tooltip>
				</IconButton>
				<IconButton
					sx={requisitionListsTableActionsCellIconSX}
					color="primary"
					onClick={onAddToCart}
					disabled={
						row.original.orderItemCount !== undefined ? row.original.orderItemCount === 0 : false
					}
					id={`${REQUISITION_LISTS_TABLE}-${row.id}-actions-add-to-cart-button`}
					data-testid={`${REQUISITION_LISTS_TABLE}-${row.id}-actions-add-to-cart-button`}
				>
					<Tooltip title={requisitionListsNLS.AddListToCart.t()}>
						<AddShoppingCart />
					</Tooltip>
				</IconButton>
			</Stack>
			{copyListDialogValues ? (
				<RequisitionListsTableCopyListDialog
					listValues={copyListDialogValues}
					open={true}
					closeDialog={closeCopyListDialog}
					onDialogSubmit={onCopyListDialogSubmit}
				/>
			) : null}
			{openDeleteConfirm ? (
				<ConfirmationDialog
					open={openDeleteConfirm}
					onCancel={onDeleteCancel}
					onConfirm={onDeleteConfirm}
					text={deleteConfirmationText}
				/>
			) : null}
		</TableCellResponsiveContent>
	);
};
