/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { storeLocatorRemovalDialogButtonSX } from '@/components/content/StoreLocator/styles/removalDialogButton';
import { useLocalization } from '@/data/Localization';
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	Stack,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { FC } from 'react';

type Props = {
	open: boolean;
	onDialog: () => void;
};

export const StoreLocatorRemovalDialog: FC<Props> = ({ open, onDialog }) => {
	const nls = useLocalization('StoreLocator');
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<Dialog disableEscapeKeyDown maxWidth="xs" fullScreen={isMobile} open={open} onClose={onDialog}>
			<DialogTitle>{nls.removalDialog.title.t()}</DialogTitle>
			<DialogContent>
				<Stack spacing={2}>
					<Typography>{nls.removalDialog.text.t()}</Typography>
					<Button variant="contained" sx={storeLocatorRemovalDialogButtonSX} onClick={onDialog}>
						{nls.removalDialog.close.t()}
					</Button>
				</Stack>
			</DialogContent>
		</Dialog>
	);
};
