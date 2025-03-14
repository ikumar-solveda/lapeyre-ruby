/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { ResponsiveActionsMenu } from '@/components/blocks/ResponsiveActionsMenu';
import { DIALOG_STATES } from '@/data/constants/inProgressOrders';
import { useInProgressOrderDetails } from '@/data/Content/InProgressOrderDetails';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { MenuItem, Stack } from '@mui/material';
import { type FC, type MouseEvent, useCallback, useContext, useState } from 'react';

export const InProgressOrderDetailsEditMenu: FC = () => {
	const InProgressOrderDetailsNLS = useLocalization('InProgressOrderDetails');
	const { onDialog, isBuyerMismatch } = useContext(ContentContext) as ReturnType<
		typeof useInProgressOrderDetails
	>;
	const [anchor, setAnchor] = useState<null | HTMLElement>(null);
	const onOpen = useCallback((e: MouseEvent<HTMLButtonElement>) => setAnchor(e.currentTarget), []);
	const onClose = useCallback(() => setAnchor(null), []);
	const onClick = useCallback(
		(_e: MouseEvent<HTMLLIElement>) => {
			onDialog(DIALOG_STATES.EDIT)();
			onClose();
		},
		[onClose, onDialog]
	);

	return (
		<Stack>
			<ResponsiveActionsMenu
				anchor={anchor}
				onClose={onClose}
				onOpen={onOpen}
				id="in-progress-order-edit-name"
				label={InProgressOrderDetailsNLS.editOrderName.t()}
			>
				<MenuItem onClick={onClick} disabled={isBuyerMismatch}>
					{InProgressOrderDetailsNLS.editOrderName.t()}
				</MenuItem>
			</ResponsiveActionsMenu>
		</Stack>
	);
};
