/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { OneClick } from '@/components/blocks/OneClick';
import { wishListDetailsDeleteDialogSX } from '@/components/content/WishListDetails/styles/deleteDialog';
import { useLocalization } from '@/data/Localization';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { FC, MouseEventHandler } from 'react';

type Props = {
	open: boolean;
	onClose: (e: any, reason: string) => void;
	title: string;
	actionLabel: string;
	message: JSX.Element;
	action: () => void;
	busy: boolean;
};

export const WishListDetailsDeleteDialog: FC<Props> = ({
	open,
	onClose,
	title,
	actionLabel,
	message,
	action,
	busy,
}) => {
	const localization = useLocalization('WishList');

	return (
		<Dialog open={open} onClose={onClose}>
			{title ? <DialogTitle>{title}</DialogTitle> : null}
			<DialogContent sx={wishListDetailsDeleteDialogSX}>
				{message}
				<DialogActions>
					<OneClick
						data-testid="view-wish-list-details-confirm-delete"
						id="view-wish-list-details-confirm-delete"
						variant="contained"
						fullWidth
						onClick={action}
					>
						{actionLabel}
					</OneClick>
					<Button
						data-testid="view-wish-list-details-cancel-delete"
						id="view-wish-list-details-cancel-delete"
						variant="outlined"
						fullWidth
						onClick={onClose as MouseEventHandler}
						disabled={busy}
					>
						{localization.Cancel.t()}
					</Button>
				</DialogActions>
			</DialogContent>
		</Dialog>
	);
};
