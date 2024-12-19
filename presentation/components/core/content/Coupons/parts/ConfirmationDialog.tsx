/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import {
	ConfirmationDialog,
	ConfirmationDialogText,
} from '@/components/content/ConfirmationDialog';
import { useLocalization } from '@/data/Localization';
import { CouponsConfirmationDialogProps } from '@/data/types/Coupon';
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined';
import { Divider, Stack, Typography } from '@mui/material';
import { FC, useMemo } from 'react';

export const CouponsConfirmationDialog: FC<CouponsConfirmationDialogProps> = ({
	open,
	onConfirm,
	onToggle,
}) => {
	const nls = useLocalization('Coupons');

	const confirmationText = useMemo<ConfirmationDialogText>(
		() => ({
			title: (
				<Stack spacing={1}>
					<Stack direction="row" alignItems="center" spacing={1}>
						<DeleteOutlineOutlined color="error" />
						<Typography variant="h6">{nls.DeleteDialogHeading.t()}</Typography>
					</Stack>
					<Divider />
				</Stack>
			),
			message: (
				<Stack spacing={1}>
					<Typography>{nls.DeleteDialogLine1.t()}</Typography>
					<Typography>{nls.DeleteDialogLine2.t()}</Typography>
					<Divider />
				</Stack>
			),
			ok: nls.DeleteDialogConfirm.t(),
			cancel: nls.DeleteDialogCancel.t(),
		}),
		[nls]
	);

	return open ? (
		<ConfirmationDialog
			open={true}
			onCancel={onToggle() as () => Promise<unknown>}
			onConfirm={onConfirm}
			text={confirmationText}
		/>
	) : null;
};
