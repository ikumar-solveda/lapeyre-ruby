/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useLocalization } from '@/data/Localization';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { FC } from 'react';

type Props = {
	open: boolean;
	onClose: () => void;
	title: string;
	actionLabel: string;
	message: JSX.Element;
	action: () => void;
};

/** @deprecated use `WishListDetails` */
export const WishListDetailsDeleteDialog: FC<Props> = ({
	open,
	onClose,
	title,
	actionLabel,
	message,
	action,
}) => {
	const localization = useLocalization('WishList');

	return (
		<Dialog open={open} onClose={onClose}>
			{title ? <DialogTitle>{title}</DialogTitle> : null}
			<DialogContent sx={{ m: 1 }}>
				{message}
				<DialogActions>
					<Button
						data-testid="view-wishlist-confirm-delete"
						id="view-wishlist-confirm-delete"
						variant="contained"
						fullWidth
						onClick={action}
					>
						{actionLabel}
					</Button>
					<Button
						data-testid="view-wishlist-cancel-delete"
						id="view-wishlist-cancel-delete"
						variant="outlined"
						fullWidth
						onClick={onClose}
					>
						{localization.Cancel.t()}
					</Button>
				</DialogActions>
			</DialogContent>
		</Dialog>
	);
};
