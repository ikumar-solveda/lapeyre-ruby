/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { OneClick } from '@/components/blocks/OneClick';
import { quotesDialogCloseIconSX } from '@/components/content/Quotes/styles/dialogCloseIcon';
import { DIALOG_STATES } from '@/data/constants/quotes';
import type { useQuotes } from '@/data/Content/Quotes';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Close, Delete, HighlightOff } from '@mui/icons-material';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	Stack,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC, useCallback, useContext } from 'react';

export const QuotesDialog: FC = () => {
	const nls = useLocalization('Quotes');
	const actionsNLS = useLocalization('QuoteActions');
	const quotesContent = useContext(ContentContext) as ReturnType<typeof useQuotes>;
	const small = useMediaQuery(useTheme().breakpoints.down('md'));
	const {
		showDialog,
		closeDialog,
		dialogState,
		quoteId,
		deleteQuote,
		cancelQuote,
		setQuoteId,
		setDialogState,
	} = quotesContent;

	const onDialogAction = useCallback(async () => {
		if (dialogState === DIALOG_STATES.CANCEL) {
			await cancelQuote(quoteId as string);
		} else if (dialogState === DIALOG_STATES.DELETE) {
			await deleteQuote(quoteId as string);
		}
		closeDialog();
	}, [dialogState, quoteId, closeDialog, cancelQuote, deleteQuote]);

	const onCloseDialog = useCallback(() => {
		setQuoteId(undefined);
		setDialogState(undefined);
		closeDialog();
	}, [closeDialog, setDialogState, setQuoteId]);

	return (
		<Dialog
			disableEscapeKeyDown
			maxWidth="sm"
			fullWidth
			fullScreen={small}
			open={showDialog}
			onClose={onCloseDialog}
		>
			<DialogTitle>
				<Stack spacing={2}>
					{dialogState === DIALOG_STATES.CANCEL ? (
						<Stack direction="row" spacing={2}>
							<HighlightOff color="secondary" />
							<Typography variant="h6">{actionsNLS.Cancel.t()}</Typography>
						</Stack>
					) : dialogState === DIALOG_STATES.DELETE ? (
						<Stack direction="row" spacing={2}>
							<Delete color="secondary" />
							<Typography variant="h6">{actionsNLS.Delete.t()}</Typography>
						</Stack>
					) : null}
					<Divider />
				</Stack>
			</DialogTitle>
			<DialogContent>
				<IconButton aria-label="close" onClick={onCloseDialog} sx={quotesDialogCloseIconSX}>
					<Close />
				</IconButton>
				{dialogState === DIALOG_STATES.CANCEL ? (
					<Stack spacing={2}>
						<Typography>{nls.CancelMsg1.t({ id: quoteId as string })}</Typography>
						<Typography>{nls.ContinueMsg.t()}</Typography>
						<Divider />
					</Stack>
				) : dialogState === DIALOG_STATES.DELETE ? (
					<Stack spacing={2}>
						<Typography>{nls.DeleteMsg1.t({ id: quoteId as string })}</Typography>
						<Typography>{nls.ContinueMsg.t()}</Typography>
						<Divider />
					</Stack>
				) : null}
			</DialogContent>
			<DialogActions>
				{dialogState === DIALOG_STATES.CANCEL ? (
					<>
						<OneClick color="secondary" variant="outlined" onClick={onCloseDialog}>
							{nls.NoMsg.t()}
						</OneClick>
						<OneClick variant="contained" onClick={onDialogAction}>
							{nls.ConfirmContinue.t()}
						</OneClick>
					</>
				) : dialogState === DIALOG_STATES.DELETE ? (
					<>
						<OneClick color="secondary" variant="outlined" onClick={onCloseDialog}>
							{nls.NoMsg.t()}
						</OneClick>
						<OneClick variant="contained" onClick={onDialogAction}>
							{nls.ConfirmDelete.t()}
						</OneClick>
					</>
				) : null}
			</DialogActions>
		</Dialog>
	);
};
