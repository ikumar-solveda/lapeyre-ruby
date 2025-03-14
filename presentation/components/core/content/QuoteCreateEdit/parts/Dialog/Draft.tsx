/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024, 2025.
 */
import { Dialog } from '@/components/blocks/Dialog';
import { OneClick } from '@/components/blocks/OneClick';
import { useQuoteCreateEdit } from '@/data/Content/QuoteCreateEdit';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Error } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { useContext, type FC } from 'react';

export const QuoteCreateEditDialogDraft: FC = () => {
	const nls = useLocalization('Quotes');
	const actionNls = useLocalization('QuoteActions');
	const { activeStep, onDraft, showDraftDialog, closeDraftDialog, quoteById } = useContext(
		ContentContext
	) as ReturnType<typeof useQuoteCreateEdit>;

	return (
		<Dialog
			open={showDraftDialog}
			onClose={closeDraftDialog}
			title={
				<Stack direction="row" spacing={2}>
					<Error color="secondary" />
					<Typography variant="h6">
						{activeStep === 0 && !quoteById ? actionNls.Draft.t() : actionNls.Save.t()}
					</Typography>
				</Stack>
			}
			content={
				<Stack spacing={2}>
					<Typography>{nls.DraftDialogMsg.t()}</Typography>
					{activeStep === 0 ? <Typography>{nls.DraftDialogMsg2.t()} </Typography> : null}
				</Stack>
			}
			actions={
				<>
					<OneClick
						id="quote-create-edit-dialog-draft-cancel-button"
						data-testid="quote-create-edit-dialog-draft-cancel-button"
						color="secondary"
						variant="outlined"
						onClick={closeDraftDialog}
					>
						{actionNls.Cancel.t()}
					</OneClick>
					<OneClick
						id="quote-create-edit-dialog-draft-save-button"
						data-testid="quote-create-edit-dialog-draft-save-button"
						variant="contained"
						onClick={onDraft}
					>
						{actionNls.Save.t()}
					</OneClick>
				</>
			}
		/>
	);
};
