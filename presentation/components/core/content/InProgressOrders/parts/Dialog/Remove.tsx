/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { Dialog } from '@/components/blocks/Dialog';
import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
import { OneClick } from '@/components/blocks/OneClick';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type { InProgressOrdersContextValues } from '@/data/types/InProgressOrders';
import { DeleteOutlineOutlined } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import { type FC, useCallback, useContext } from 'react';

export const InProgressOrdersDialogRemove: FC = () => {
	const { onDelete, closeDialog, orderId, showDialog } = useContext(
		ContentContext
	) as InProgressOrdersContextValues;
	const nls = useLocalization('InProgressOrdersNew');

	const onContinueDialog = useCallback(
		async () => await onDelete(orderId as string[]),
		[onDelete, orderId]
	);

	return (
		<Dialog
			open={showDialog}
			onClose={closeDialog}
			title={
				<Stack direction="row" alignItems="center" gap={1}>
					<DeleteOutlineOutlined color="error" />
					{nls.Dialog.DeleteOrder.t()}
				</Stack>
			}
			content={
				<Stack gap={2}>
					<LocalizationWithComponent
						text={
							orderId.length > 1
								? nls.Dialog.MultipleDeleteContentLine.t({ count: orderId.length })
								: nls.Dialog.SingleDeleteContentLine.t({ orderId: orderId[0] })
						}
						components={[
							<Typography key="0" component="span">
								<Typography variant="strong" />
							</Typography>,
						]}
					/>
				</Stack>
			}
			actions={
				<>
					<Button
						variant="outlined"
						id="delete-in-progress-order-dialog-cancel"
						data-testid="delete-in-progress-order-dialog-cancel"
						onClick={closeDialog}
						color="primary"
					>
						{nls.Dialog.NoCancel.t()}
					</Button>
					<OneClick
						variant="contained"
						id="delete-in-progress-order-dialog-continue"
						data-testid="delete-in-progress-order-dialog-continue"
						onClick={onContinueDialog}
						color="primary"
					>
						{nls.Dialog.YesContinue.t()}
					</OneClick>
				</>
			}
		/>
	);
};
