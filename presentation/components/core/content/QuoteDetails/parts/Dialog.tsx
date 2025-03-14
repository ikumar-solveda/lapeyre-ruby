/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Dialog } from '@/components/blocks/Dialog';
import { OneClick } from '@/components/blocks/OneClick';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { DIALOG_STATES } from '@/data/constants/quotes';
import type { useQuoteDetails } from '@/data/Content/QuoteDetails';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { QuoteDialogStateType } from '@/data/types/Quote';
import { Switch } from '@/utils/switch';
import { CheckCircle, Delete, Error, HighlightOff, Warning } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { type FC, useContext, useMemo } from 'react';

export const QuoteDetailsDialog: FC = () => {
	const qNls = useLocalization('Quotes');
	const actionNls = useLocalization('QuoteActions');
	const quotesContent = useContext(ContentContext) as ReturnType<typeof useQuoteDetails>;
	const { quoteById, showDialog, dialogState, onCloseDialog, onDialogAction } = quotesContent;
	const id = useMemo(() => quoteById?.id ?? EMPTY_STRING, [quoteById]);

	return (
		<Dialog
			open={showDialog}
			onClose={onCloseDialog}
			title={Switch(dialogState)
				.case(DIALOG_STATES.CANCEL, () => (
					<Stack direction="row" spacing={2}>
						<HighlightOff color="secondary" />
						<Typography variant="h6">{actionNls.Cancel.t()}</Typography>
					</Stack>
				))
				.case(DIALOG_STATES.DELETE, () => (
					<Stack direction="row" spacing={2}>
						<Delete color="secondary" />
						<Typography variant="h6">{actionNls.Delete.t()}</Typography>
					</Stack>
				))
				.case(DIALOG_STATES.SUBMIT, () => (
					<Stack direction="row" spacing={2}>
						<Error color="secondary" />
						<Typography variant="h6">{actionNls.Submit.t()}</Typography>
					</Stack>
				))
				.case(DIALOG_STATES.ACCEPT, () => (
					<Stack direction="row" spacing={2}>
						<CheckCircle color="secondary" />
						<Typography variant="h6">{actionNls.Confirmation.t()}</Typography>
					</Stack>
				))
				.case(DIALOG_STATES.DECLINE, () => (
					<Stack direction="row" spacing={2}>
						<Warning color="secondary" />
						<Typography variant="h6">{actionNls.Warning.t()}</Typography>
					</Stack>
				))
				.case(DIALOG_STATES.CONVERT, () => (
					<Stack direction="row" spacing={2}>
						<CheckCircle color="secondary" />
						<Typography variant="h6">{actionNls.Confirmation.t()}</Typography>
					</Stack>
				))
				.defaultTo(() => null)}
			content={Switch(dialogState as QuoteDialogStateType)
				.case(DIALOG_STATES.CANCEL, () => (
					<Stack spacing={2}>
						<Typography>{qNls.CancelMsg1.t({ id })}</Typography>
						<Typography>{qNls.ContinueMsg.t()}</Typography>
					</Stack>
				))
				.case(DIALOG_STATES.DELETE, () => (
					<Stack spacing={2}>
						<Typography>{qNls.DeleteMsg1.t({ id })}</Typography>
						<Typography>{qNls.ContinueMsg.t()}</Typography>
					</Stack>
				))
				.case(DIALOG_STATES.SUBMIT, () => (
					<Stack spacing={2}>
						<Typography>{qNls.RFQSubmitMsg.t()}</Typography>
						<Typography>{qNls.RFQSubmitMsg2.t()} </Typography>
					</Stack>
				))
				.case(DIALOG_STATES.ACCEPT, () => (
					<Stack spacing={2}>
						<Typography>{qNls.AcceptMsg1.t({ id })}</Typography>
						<Typography>{qNls.AcceptMsg2.t()}</Typography>
						<Typography>{qNls.ContinueMsg2.t()}</Typography>
					</Stack>
				))
				.case(DIALOG_STATES.DECLINE, () => (
					<Stack spacing={2}>
						<Typography>{qNls.DeclineMsg1.t({ id })}</Typography>
						<Typography>{qNls.DeclineMsg2.t()}</Typography>
						<Typography>{qNls.ContinueMsg2.t()}</Typography>
					</Stack>
				))
				.case(DIALOG_STATES.CONVERT, () => (
					<Stack spacing={2}>
						<Typography>{qNls.ConvertMsg1.t({ id })}</Typography>
						<Typography>{qNls.ConvertMsg2.t()}</Typography>
						<Typography>{qNls.ContinueMsg2.t()}</Typography>
					</Stack>
				))
				.defaultTo(() => null)}
			actions={Switch(dialogState)
				.case(DIALOG_STATES.CANCEL, () => (
					<>
						<OneClick
							id="quote-details-dialog-cancel-no-button"
							data-testid="quote-details-dialog-cancel-no-button"
							color="secondary"
							variant="outlined"
							onClick={onCloseDialog}
						>
							{qNls.NoMsg.t()}
						</OneClick>
						<OneClick
							id="quote-details-dialog-cancel-confirm-button"
							data-testid="quote-details-dialog-cancel-confirm-button"
							variant="contained"
							onClick={onDialogAction(id)}
						>
							{qNls.ConfirmContinue.t()}
						</OneClick>
					</>
				))
				.case(DIALOG_STATES.DELETE, () => (
					<>
						<OneClick
							id="quote-details-dialog-delete-no-button"
							data-testid="quote-details-dialog-delete-no-button"
							color="secondary"
							variant="outlined"
							onClick={onCloseDialog}
						>
							{qNls.NoMsg.t()}
						</OneClick>
						<OneClick
							id="quote-details-dialog-delete-confirm-button"
							data-testid="quote-details-dialog-delete-confirm-button"
							variant="contained"
							onClick={onDialogAction(id)}
						>
							{qNls.ConfirmDelete.t()}
						</OneClick>
					</>
				))
				.case(DIALOG_STATES.SUBMIT, () => (
					<>
						<OneClick
							id="quote-details-dialog-submit-no-button"
							data-testid="quote-details-dialog-submit-no-button"
							color="secondary"
							variant="outlined"
							onClick={onCloseDialog}
						>
							{actionNls.Cancel.t()}
						</OneClick>
						<OneClick
							id="quote-details-dialog-submit-confirm-button"
							data-testid="quote-details-dialog-submit-confirm-button"
							variant="contained"
							onClick={onDialogAction(id)}
						>
							{actionNls.Submit.t()}
						</OneClick>
					</>
				))
				.case(DIALOG_STATES.ACCEPT, () => (
					<>
						<OneClick
							id="quote-details-dialog-accept-no-button"
							data-testid="quote-details-dialog-accept-no-button"
							color="secondary"
							variant="outlined"
							onClick={onCloseDialog}
						>
							{qNls.NoMsg.t()}
						</OneClick>
						<OneClick
							id="quote-details-dialog-accept-confirm-button"
							data-testid="quote-details-dialog-accept-confirm-button"
							variant="contained"
							onClick={onDialogAction(id)}
						>
							{qNls.ConfirmContinue.t()}
						</OneClick>
					</>
				))
				.case(DIALOG_STATES.DECLINE, () => (
					<>
						<OneClick
							id="quote-details-dialog-decline-no-button"
							data-testid="quote-details-dialog-decline-no-button"
							color="secondary"
							variant="outlined"
							onClick={onCloseDialog}
						>
							{qNls.NoMsg.t()}
						</OneClick>
						<OneClick
							id="quote-details-dialog-decline-confirm-button"
							data-testid="quote-details-dialog-decline-confirm-button"
							variant="contained"
							onClick={onDialogAction(id)}
						>
							{qNls.ConfirmContinue.t()}
						</OneClick>
					</>
				))
				.case(DIALOG_STATES.CONVERT, () => (
					<>
						<OneClick
							id="quote-details-dialog-convert-no-button"
							data-testid="quote-details-dialog-convert-no-button"
							color="secondary"
							variant="outlined"
							onClick={onCloseDialog}
						>
							{qNls.NoMsg.t()}
						</OneClick>
						<OneClick
							id="quote-details-dialog-convert-confirm-button"
							data-testid="quote-details-dialog-convert-confirm-button"
							variant="contained"
							onClick={onDialogAction(id)}
						>
							{qNls.ConfirmContinue.t()}
						</OneClick>
					</>
				))
				.defaultTo(() => null)}
		/>
	);
};
