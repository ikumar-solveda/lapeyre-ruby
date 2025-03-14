/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import {
	ConfirmationDialog,
	ConfirmationDialogText,
} from '@/components/content/ConfirmationDialog';
import { InProgressOrderDetailsBrowseAndAddProduct } from '@/components/content/InProgressOrderDetails/parts/BrowseAndAddProduct';
import { InProgressOrderDetailsHeader } from '@/components/content/InProgressOrderDetails/parts/Header';
import { InProgressOrderDetailsTable } from '@/components/content/InProgressOrderDetails/parts/Table';
import { DIALOG_STATES } from '@/data/constants/inProgressOrders';
import { useInProgressOrderDetails } from '@/data/Content/InProgressOrderDetails';
import { ContentProvider } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type { ID } from '@/data/types/Basic';
import { DeleteOutlineOutlined } from '@mui/icons-material';
import { CircularProgress, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useMemo, type FC } from 'react';

type InProgressOrderDetailsProps = {
	id: ID;
	variant?: 'full' | 'compact' | 'auto';
	view?: string;
};

export const InProgressOrderDetails: FC<InProgressOrderDetailsProps> = ({ variant = 'auto' }) => {
	const nls = useLocalization('InProgressOrderDetails');
	const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
	const view = variant === 'auto' ? (isMobile ? 'compact' : 'full') : variant;
	const inProgressOrderDetails = useInProgressOrderDetails();
	const { data, isLoading, dialogOpen, onDialog, onDeleteConfirm, dialogState, selected } =
		inProgressOrderDetails;
	const contextValue = useMemo(
		() => ({ view, ...inProgressOrderDetails }),
		[inProgressOrderDetails, view]
	);
	const deleteConfirmationText = useMemo<ConfirmationDialogText>(
		() => ({
			title: (
				<Stack direction="row" alignItems="center" gap={1}>
					<DeleteOutlineOutlined color="error" />
					{nls.DeleteDialog.Title.t()}
				</Stack>
			),
			message:
				selected.length > 1
					? nls.DeleteDialog.Multiple.t([selected.length])
					: nls.DeleteDialog.Single.t(),
			ok: nls.DeleteDialog.OK.t(),
			cancel: nls.DeleteDialog.Cancel.t(),
		}),
		[nls, selected]
	);
	return (
		<ContentProvider value={contextValue}>
			<Stack spacing={1}>
				{isLoading && !data ? (
					<Stack direction="row" justifyContent="center">
						<CircularProgress />
					</Stack>
				) : (
					<>
						<InProgressOrderDetailsHeader />
						<InProgressOrderDetailsBrowseAndAddProduct />
						<InProgressOrderDetailsTable />
					</>
				)}
			</Stack>
			{dialogState === DIALOG_STATES.DELETE ? (
				<ConfirmationDialog
					open={dialogOpen}
					onCancel={onDialog()}
					onConfirm={onDeleteConfirm}
					text={deleteConfirmationText}
				/>
			) : null}
		</ContentProvider>
	);
};
