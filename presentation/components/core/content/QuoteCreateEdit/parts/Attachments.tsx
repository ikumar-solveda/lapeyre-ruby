/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { EmptyContent } from '@/components/blocks/EmptyContent';
import { OneClick } from '@/components/blocks/OneClick';
import { QuoteAttachmentsTable } from '@/components/blocks/QuoteAttachmentsTable';
import { QuoteCreateEditDialogAttachments } from '@/components/content/QuoteCreateEdit/parts/Dialog/Attachments';
import { quoteCreateEditActionsStack } from '@/components/content/QuoteCreateEdit/styles/actionsStack';
import { quoteCreateEditAttachmentsContainerStack } from '@/components/content/QuoteCreateEdit/styles/attachmentsContainerStack';
import { quoteCreateEditContentStack } from '@/components/content/QuoteCreateEdit/styles/contentStack';
import type { useQuoteCreateEdit } from '@/data/Content/QuoteCreateEdit';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Stack, Typography } from '@mui/material';
import { useContext, type FC } from 'react';

export const QuoteCreateEditAttachments: FC = () => {
	const localization = useLocalization('Quotes');
	const nlsAttachments = useLocalization('QuoteAttachmentsTable');
	const { openFileUploadDialog, dataAttachments } = useContext(ContentContext) as ReturnType<
		typeof useQuoteCreateEdit
	>;

	return (
		<Stack spacing={2}>
			<Stack {...quoteCreateEditContentStack}>
				<Typography variant="h6">{localization.UploadAttachments.t()}</Typography>
				<Stack {...quoteCreateEditActionsStack}>
					<OneClick
						id="quote-create-edit-attachments-upload-button"
						data-testid="quote-create-edit-attachments-upload-button"
						onClick={openFileUploadDialog}
						variant="contained"
					>
						{localization.UploadFile.t()}
					</OneClick>
				</Stack>
			</Stack>
			{dataAttachments.length === 0 ? (
				<EmptyContent
					title={nlsAttachments.NoAttachments.t()}
					altId="quote-create-edit-attachments-id"
				/>
			) : (
				<Stack {...quoteCreateEditAttachmentsContainerStack}>
					<QuoteAttachmentsTable />
				</Stack>
			)}
			<QuoteCreateEditDialogAttachments />
		</Stack>
	);
};
