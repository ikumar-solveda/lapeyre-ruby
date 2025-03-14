/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024, 2025.
 */

import { Dialog } from '@/components/blocks/Dialog';
import { OneClick } from '@/components/blocks/OneClick';
import { DIALOG_STATES } from '@/data/constants/quotes';
import type { useQuotes } from '@/data/Content/Quotes';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Delete, HighlightOff } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { type FC, useCallback, useContext } from 'react';

export const QuotesDialog: FC = () => {
	const nls = useLocalization('Quotes');
	const actionsNLS = useLocalization('QuoteActions');
	const quotesContent = useContext(ContentContext) as ReturnType<typeof useQuotes>;
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
			open={showDialog}
			title={
				dialogState === DIALOG_STATES.CANCEL ? (
					<Stack direction="row" spacing={2}>
						<HighlightOff color="secondary" />
						<Typography variant="h6">{actionsNLS.Cancel.t()}</Typography>
					</Stack>
				) : dialogState === DIALOG_STATES.DELETE ? (
					<Stack direction="row" spacing={2}>
						<Delete color="secondary" />
						<Typography variant="h6">{actionsNLS.Delete.t()}</Typography>
					</Stack>
				) : null
			}
			content={
				dialogState === DIALOG_STATES.CANCEL ? (
					<Stack spacing={2}>
						<Typography>{nls.CancelMsg1.t({ id: quoteId as string })}</Typography>
						<Typography>{nls.ContinueMsg.t()}</Typography>
					</Stack>
				) : dialogState === DIALOG_STATES.DELETE ? (
					<Stack spacing={2}>
						<Typography>{nls.DeleteMsg1.t({ id: quoteId as string })}</Typography>
						<Typography>{nls.ContinueMsg.t()}</Typography>
					</Stack>
				) : null
			}
			actions={
				dialogState === DIALOG_STATES.CANCEL ? (
					<>
						<OneClick
							id="quotes-dialog-cancel-no-button"
							data-testid="quotes-dialog-cancel-no-button"
							color="secondary"
							variant="outlined"
							onClick={onCloseDialog}
						>
							{nls.NoMsg.t()}
						</OneClick>
						<OneClick
							id="quotes-dialog-cancel-confirm-button"
							data-testid="quotes-dialog-cancel-confirm-button"
							variant="contained"
							onClick={onDialogAction}
						>
							{nls.ConfirmContinue.t()}
						</OneClick>
					</>
				) : dialogState === DIALOG_STATES.DELETE ? (
					<>
						<OneClick
							id="quotes-dialog-delete-no-button"
							data-testid="quotes-dialog-delete-no-button"
							color="secondary"
							variant="outlined"
							onClick={onCloseDialog}
						>
							{nls.NoMsg.t()}
						</OneClick>
						<OneClick
							id="quotes-dialog-delete-confirm-button"
							data-testid="quotes-dialog-delete-confirm-button"
							variant="contained"
							onClick={onDialogAction}
						>
							{nls.ConfirmDelete.t()}
						</OneClick>
					</>
				) : null
			}
			onClose={onCloseDialog}
		/>
	);
};
