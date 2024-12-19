/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { EmptyContent } from '@/components/blocks/EmptyContent';
import { QuoteDetailsAccordion } from '@/components/content/QuoteDetails/parts/Accordion';
import { QuoteDetailsAttachmentEach } from '@/components/content/QuoteDetails/parts/AttachmentEach';
import { State } from '@/data/constants/quotes';
import type { useQuoteDetails } from '@/data/Content/QuoteDetails';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Button, CircularProgress, Grid } from '@mui/material';
import { useContext, type FC } from 'react';

export const QuoteDetailsAttachments: FC = () => {
	const nls = useLocalization('QuoteSections');
	const nlsAttachments = useLocalization('QuoteAttachmentsTable');
	const {
		dataAttachments,
		quoteById,
		isAttachmentsLoading,
		onAttachmentLoadMore,
		hasMoreAttachment,
	} = useContext(ContentContext) as ReturnType<typeof useQuoteDetails>;

	return (
		<QuoteDetailsAccordion title={nls.Attachments.t()}>
			{dataAttachments.length === 0 ? (
				<EmptyContent
					title={nlsAttachments.NoAttachments.t()}
					description={
						quoteById?.status === State.DRAFT ? nlsAttachments.NoAttachmentsHelp.t() : undefined
					}
					altId="quote-details-attachments-id"
				/>
			) : (
				<Grid container spacing={1}>
					{dataAttachments.map((attachment) => (
						<Grid item xs={12} sm={6} key={attachment.id}>
							<QuoteDetailsAttachmentEach attachment={attachment} />
						</Grid>
					))}
					{hasMoreAttachment ? (
						<Grid item xs={12}>
							{isAttachmentsLoading ? (
								<CircularProgress size={25} />
							) : (
								<Button
									variant="inline"
									onClick={onAttachmentLoadMore}
									id="load-more-attachment"
									data-testid="load-more-attachment"
								>
									{nlsAttachments.LoadMore.t()}
								</Button>
							)}
						</Grid>
					) : null}
				</Grid>
			)}
		</QuoteDetailsAccordion>
	);
};
