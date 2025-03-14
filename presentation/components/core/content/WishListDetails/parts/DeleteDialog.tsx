/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Dialog } from '@/components/blocks/Dialog';
import { OneClick } from '@/components/blocks/OneClick';
import { useLocalization } from '@/data/Localization';
import { type FC, MouseEventHandler } from 'react';

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

	const props = { onClose };
	return (
		<Dialog
			open={open}
			title={title}
			actions={
				<>
					<OneClick
						data-testid="view-wish-list-details-confirm-delete"
						id="view-wish-list-details-confirm-delete"
						variant="contained"
						fullWidth
						onClick={action}
					>
						{actionLabel}
					</OneClick>
					<OneClick
						data-testid="view-wish-list-details-cancel-delete"
						id="view-wish-list-details-cancel-delete"
						variant="outlined"
						fullWidth
						onClick={onClose as MouseEventHandler}
						disabled={busy}
					>
						{localization.Cancel.t()}
					</OneClick>
				</>
			}
			content={message}
			props={props}
		/>
	);
};
