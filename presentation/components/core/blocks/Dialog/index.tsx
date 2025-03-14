/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { dialogActionsSX } from '@/components/blocks/Dialog/styles/actions';
import { dialogTitleSX } from '@/components/blocks/Dialog/styles/title';
import { Close } from '@mui/icons-material';
import {
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Icon,
	IconButton,
	Dialog as MatDialog,
	DialogProps as MatDialogProps,
	Stack,
	type StackProps,
} from '@mui/material';
import type { ElementType, FC } from 'react';

interface DialogProps {
	open: boolean;
	onClose?: () => void;
	title: string | React.ReactNode;
	content: React.ReactNode;
	actions: React.ReactNode;
	props?: Partial<MatDialogProps>;
	dataContainerProps?: Partial<StackProps<ElementType>>;
}

export const Dialog: FC<DialogProps> = ({
	open,
	onClose,
	title,
	content,
	actions,
	props,
	dataContainerProps,
}) => (
	<MatDialog disableEscapeKeyDown maxWidth="sm" fullWidth open={open} {...props}>
		<DialogTitle sx={dialogTitleSX}>
			<Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
				{title ? title : onClose ? <Icon /> : null}
				{onClose ? (
					<IconButton
						data-testid="dialog-close-button"
						id="dialog-close-button"
						aria-label="close"
						onClick={onClose}
					>
						<Close />
					</IconButton>
				) : null}
			</Stack>
		</DialogTitle>
		<Divider />
		<Stack {...dataContainerProps}>
			<DialogContent>{content}</DialogContent>
			{actions ? <DialogActions sx={dialogActionsSX}>{actions}</DialogActions> : null}
		</Stack>
	</MatDialog>
);
