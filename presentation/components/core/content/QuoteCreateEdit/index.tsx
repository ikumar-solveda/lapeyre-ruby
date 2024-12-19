/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { OneClick } from '@/components/blocks/OneClick';
import { QuoteCreateEditAttachments } from '@/components/content/QuoteCreateEdit/parts/Attachments';
import { QuoteCreateEditComments } from '@/components/content/QuoteCreateEdit/parts/Comments';
import { QuoteCreateEditDetails } from '@/components/content/QuoteCreateEdit/parts/Details';
import { QuoteCreateEditDialogDraft } from '@/components/content/QuoteCreateEdit/parts/Dialog/Draft';
import { QuoteCreateEditDialogSubmit } from '@/components/content/QuoteCreateEdit/parts/Dialog/Submit';
import { QuoteCreateEditProducts } from '@/components/content/QuoteCreateEdit/parts/Products';
import { QuoteCreateEditRequests } from '@/components/content/QuoteCreateEdit/parts/Requests';
import { QuoteCreateEditStepper } from '@/components/content/QuoteCreateEdit/parts/Stepper';
import { quoteCreateEditActionsStack } from '@/components/content/QuoteCreateEdit/styles/actionsStack';
import { quoteCreateEditContentStack } from '@/components/content/QuoteCreateEdit/styles/contentStack';
import { quoteCreateEditPaperSX } from '@/components/content/QuoteCreateEdit/styles/paper';
import { CREATE_QUOTE_STEPS, STEPS } from '@/data/constants/quotes';
import { useQuoteCreateEdit } from '@/data/Content/QuoteCreateEdit';
import { ContentProvider } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type { ID } from '@/data/types/Basic';
import { Switch } from '@/utils/switch';
import { Paper, Stack, Typography } from '@mui/material';
import { type FC } from 'react';

type QuoteCreateEditProps = {
	id: ID;
	variant?: 'full' | 'compact' | 'auto';
};

export const QuoteCreateEdit: FC<QuoteCreateEditProps> = () => {
	const nls = useLocalization('Quotes');
	const actionNls = useLocalization('QuoteActions');
	const quotesContent = useQuoteCreateEdit();
	const { activeStep, onNext, onBack, openDraftDialog, openSubmitDialog, onCancel, quoteById } =
		quotesContent;

	return (
		<Stack spacing={2}>
			<ContentProvider value={quotesContent}>
				<Stack {...quoteCreateEditContentStack}>
					<Typography variant="h6">{!quoteById ? nls.Create.t() : nls.Edit.t()}</Typography>
					<Stack {...quoteCreateEditActionsStack}>
						<OneClick onClick={onCancel} color="secondary" variant="outlined">
							{activeStep === 0 && !quoteById ? actionNls.Cancel.t() : actionNls.Close.t()}
						</OneClick>
						<OneClick onClick={openSubmitDialog} variant="contained">
							{actionNls.Submit.t()}
						</OneClick>
					</Stack>
				</Stack>

				<QuoteCreateEditStepper />

				<Paper sx={quoteCreateEditPaperSX}>
					{Switch(CREATE_QUOTE_STEPS[activeStep])
						.case(STEPS.details, () => <QuoteCreateEditDetails />)
						.case(STEPS.products, () => <QuoteCreateEditProducts />)
						.case(STEPS.attachments, () => <QuoteCreateEditAttachments />)
						.case(STEPS.requests, () => <QuoteCreateEditRequests />)
						.case(STEPS.comments, () => <QuoteCreateEditComments />)
						.defaultTo(() => null)}
				</Paper>

				<Stack {...quoteCreateEditActionsStack}>
					{activeStep > 0 ? (
						<OneClick onClick={onBack} color="secondary" variant="outlined">
							{actionNls.Back.t()}
						</OneClick>
					) : null}
					<OneClick onClick={openDraftDialog} color="secondary" variant="outlined">
						{activeStep === 0 && !quoteById ? actionNls.Draft.t() : actionNls.Save.t()}
					</OneClick>
					{activeStep < 4 ? (
						<OneClick onClick={onNext} variant="contained">
							{actionNls.Next.t()}
						</OneClick>
					) : null}
				</Stack>

				<QuoteCreateEditDialogDraft />
				<QuoteCreateEditDialogSubmit />
			</ContentProvider>
		</Stack>
	);
};
