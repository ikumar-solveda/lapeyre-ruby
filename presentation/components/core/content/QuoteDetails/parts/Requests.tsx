/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { QuoteDetailsAccordion } from '@/components/content/QuoteDetails/parts/Accordion';
import { quoteDetailsTextSpacingSX } from '@/components/content/QuoteDetails/styles/textSpacing';
import type { useQuoteDetails } from '@/data/Content/QuoteDetails';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Divider, Paper, Typography } from '@mui/material';
import { useContext, type FC } from 'react';
import { quoteDetailsTextDisplayPaperSX } from '@/components/content/QuoteDetails/styles/textDisplayPaper';

export const QuoteDetailsRequests: FC = () => {
	const nls = useLocalization('QuoteSections');
	const { quoteById } = useContext(ContentContext) as ReturnType<typeof useQuoteDetails>;
	return (
		<QuoteDetailsAccordion title={nls.Requests.t()}>
			<Paper sx={quoteDetailsTextDisplayPaperSX}>
				{quoteById?.additionalSpecification?.map((req, index: number) => (
					<>
						<Typography sx={quoteDetailsTextSpacingSX} key={index}>
							{req.description}
						</Typography>
						<Divider />
					</>
				))}
			</Paper>
		</QuoteDetailsAccordion>
	);
};
