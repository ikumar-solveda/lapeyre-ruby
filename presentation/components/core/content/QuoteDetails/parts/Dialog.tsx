/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { OneClick } from '@/components/blocks/OneClick';
import { quoteDetailsDialogCloseIconSX } from '@/components/content/QuoteDetails/styles/dialogCloseIcon';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { DIALOG_STATES } from '@/data/constants/quotes';
import type { useQuoteDetails } from '@/data/Content/QuoteDetails';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { QuoteDialogStateType } from '@/data/types/Quote';
import { Switch } from '@/utils/switch';
import { CheckCircle, Close, Delete, Error, HighlightOff, Warning } from '@mui/icons-material';
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
import { FC, useContext, useMemo } from 'react';

export const QuoteDetailsDialog: FC = () => {
	const qNls = useLocalization('Quotes');
	const actionNls = useLocalization('QuoteActions');
	const quotesContent = useContext(ContentContext) as ReturnType<typeof useQuoteDetails>;
	const { quoteById, showDialog, dialogState, onCloseDialog, onDialogAction } = quotesContent;
	const small = useMediaQuery(useTheme().breakpoints.down('md'));
	const id = useMemo(() => quoteById?.id ?? EMPTY_STRING, [quoteById]);

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
					{Switch(dialogState)
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
						.defaultTo(() => null)}
					<Divider />
				</Stack>
			</DialogTitle>
			<DialogContent>
				<IconButton aria-label="close" onClick={onCloseDialog} sx={quoteDetailsDialogCloseIconSX}>
					<Close />
				</IconButton>
				{Switch(dialogState as QuoteDialogStateType)
					.case(DIALOG_STATES.CANCEL, () => (
						<Stack spacing={2}>
							<Typography>{qNls.CancelMsg1.t({ id })}</Typography>
							<Typography>{qNls.ContinueMsg.t()}</Typography>
							<Divider />
						</Stack>
					))
					.case(DIALOG_STATES.DELETE, () => (
						<Stack spacing={2}>
							<Typography>{qNls.DeleteMsg1.t({ id })}</Typography>
							<Typography>{qNls.ContinueMsg.t()}</Typography>
							<Divider />
						</Stack>
					))
					.case(DIALOG_STATES.SUBMIT, () => (
						<Stack spacing={2}>
							<Typography>{qNls.RFQSubmitMsg.t()}</Typography>
							{!quoteById?.proposedAdjustmentAmount ? (
								<Typography>{qNls.RFQSubmitMsg2.t()} </Typography>
							) : null}
							<Divider />
						</Stack>
					))
					.case(DIALOG_STATES.ACCEPT, () => (
						<Stack spacing={2}>
							<Typography>{qNls.AcceptMsg1.t({ id })}</Typography>
							<Typography>{qNls.AcceptMsg2.t()}</Typography>
							<Typography>{qNls.ContinueMsg2.t()}</Typography>
							<Divider />
						</Stack>
					))
					.case(DIALOG_STATES.DECLINE, () => (
						<Stack spacing={2}>
							<Typography>{qNls.DeclineMsg1.t({ id })}</Typography>
							<Typography>{qNls.DeclineMsg2.t()}</Typography>
							<Typography>{qNls.ContinueMsg2.t()}</Typography>
							<Divider />
						</Stack>
					))
					.defaultTo(() => null)}
			</DialogContent>
			<DialogActions>
				{Switch(dialogState)
					.case(DIALOG_STATES.CANCEL, () => (
						<>
							<OneClick color="secondary" variant="outlined" onClick={onCloseDialog}>
								{qNls.NoMsg.t()}
							</OneClick>
							<OneClick variant="contained" onClick={onDialogAction(id)}>
								{qNls.ConfirmContinue.t()}
							</OneClick>
						</>
					))
					.case(DIALOG_STATES.DELETE, () => (
						<>
							<OneClick color="secondary" variant="outlined" onClick={onCloseDialog}>
								{qNls.NoMsg.t()}
							</OneClick>
							<OneClick variant="contained" onClick={onDialogAction(id)}>
								{qNls.ConfirmDelete.t()}
							</OneClick>
						</>
					))
					.case(DIALOG_STATES.SUBMIT, () => (
						<>
							<OneClick color="secondary" variant="outlined" onClick={onCloseDialog}>
								{actionNls.Cancel.t()}
							</OneClick>
							<OneClick variant="contained" onClick={onDialogAction(id)}>
								{actionNls.Submit.t()}
							</OneClick>
						</>
					))
					.case(DIALOG_STATES.ACCEPT, () => (
						<>
							<OneClick color="secondary" variant="outlined" onClick={onCloseDialog}>
								{qNls.NoMsg.t()}
							</OneClick>
							<OneClick variant="contained" onClick={onDialogAction(id)}>
								{qNls.ConfirmContinue.t()}
							</OneClick>
						</>
					))
					.case(DIALOG_STATES.DECLINE, () => (
						<>
							<OneClick color="secondary" variant="outlined" onClick={onCloseDialog}>
								{qNls.NoMsg.t()}
							</OneClick>
							<OneClick variant="contained" onClick={onDialogAction(id)}>
								{qNls.ConfirmContinue.t()}
							</OneClick>
						</>
					))
					.defaultTo(() => null)}
			</DialogActions>
		</Dialog>
	);
};
