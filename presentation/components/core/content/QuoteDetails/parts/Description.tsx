/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { QuoteDetailsAccordion } from '@/components/content/QuoteDetails/parts/Accordion';
import { quoteDetailsTextSpacingSX } from '@/components/content/QuoteDetails/styles/textSpacing';
import type { useQuoteDetails } from '@/data/Content/QuoteDetails';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Paper, Typography } from '@mui/material';
import { useContext, type FC } from 'react';
import { quoteDetailsTextDisplayPaperSX } from '@/components/content/QuoteDetails/styles/textDisplayPaper';

export const QuoteDetailsDescription: FC = () => {
	const nls = useLocalization('QuoteSections');
	const { quoteById } = useContext(ContentContext) as ReturnType<typeof useQuoteDetails>;
	return (
		<QuoteDetailsAccordion title={nls.Description.t()}>
			<Paper sx={quoteDetailsTextDisplayPaperSX}>
				<Typography sx={quoteDetailsTextSpacingSX}>{quoteById?.description}</Typography>
			</Paper>
		</QuoteDetailsAccordion>
	);
};
