/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { ResponsiveActionsMenu } from '@/components/blocks/ResponsiveActionsMenu';
import { inProgressOrdersTitleStack } from '@/components/content/InProgressOrders/styles/titleStack';
import { DIALOG_STATES } from '@/data/constants/inProgressOrders';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type {
	InProgressOrdersContextValues,
	InProgressOrdersDialogStateType,
} from '@/data/types/InProgressOrders';
import { MenuItem, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { type FC, MouseEvent, useCallback, useContext, useState } from 'react';

export const InProgressOrdersTitle: FC = () => {
	const localization = useLocalization('InProgressOrdersNew');
	const { openDialog } = useContext(ContentContext) as InProgressOrdersContextValues;
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const [anchor, setAnchor] = useState<null | HTMLElement>(null);
	const onOpen = useCallback((e: MouseEvent<HTMLButtonElement>) => setAnchor(e.currentTarget), []);
	const onClose = useCallback(() => setAnchor(null), []);

	const onOpenDialog = useCallback(
		(dialogState: InProgressOrdersDialogStateType) => (_e: MouseEvent<HTMLLIElement>) => {
			openDialog(dialogState);
			onClose();
		},
		[onClose, openDialog]
	);

	return (
		<Stack {...inProgressOrdersTitleStack}>
			<Typography variant="pageTitle">{localization.Title.t()}</Typography>
			{isMobile ? (
				<ResponsiveActionsMenu
					anchor={anchor}
					onClose={onClose}
					onOpen={onOpen}
					id="in-progress-orders-create-new"
					label={localization.CreateNewOrder.t()}
				>
					<MenuItem onClick={onOpenDialog(DIALOG_STATES.CREATE)}>
						<Typography>{localization.CreateNewOrder.t()}</Typography>
					</MenuItem>
				</ResponsiveActionsMenu>
			) : null}
		</Stack>
	);
};
