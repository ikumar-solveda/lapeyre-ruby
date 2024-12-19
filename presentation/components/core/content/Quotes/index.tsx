/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { OneClick } from '@/components/blocks/OneClick';
import { QuotesDialog } from '@/components/content/Quotes/parts/Dialog';
import { QuotesTable } from '@/components/content/Quotes/parts/Table';
import { QuotesTableFilter } from '@/components/content/Quotes/parts/Table/Filter';
import { QuotesTableSearch } from '@/components/content/Quotes/parts/Table/Search';
import { quotesTableCreateButtonSX } from '@/components/content/Quotes/styles/Table/createButton';
import { quotesContentStack } from '@/components/content/Quotes/styles/contentStack';
import { quotesPageStack } from '@/components/content/Quotes/styles/pageStack';
import { quotesPaperSX } from '@/components/content/Quotes/styles/paper';
import { useQuotes } from '@/data/Content/Quotes';
import { useLocalization } from '@/data/Localization';
import { ContentProvider } from '@/data/context/content';
import { ID } from '@/data/types/Basic';
import { Paper, Stack, Typography } from '@mui/material';
import { type FC } from 'react';

type QuoteProps = {
	id: ID;
	variant?: 'full' | 'compact' | 'auto';
};

export const Quotes: FC<QuoteProps> = () => {
	const nls = useLocalization('Quotes');
	const quotesContent = useQuotes();
	const { onCreate } = quotesContent;

	return (
		<ContentProvider value={quotesContent}>
			<Stack {...quotesPageStack}>
				<Typography variant="h3">{nls.Title.t()}</Typography>
				<Paper sx={quotesPaperSX}>
					<Stack {...quotesContentStack}>
						<QuotesTableSearch />
						<QuotesTableFilter />
						<OneClick onClick={onCreate} sx={quotesTableCreateButtonSX} variant="contained">
							{nls.Create.t()}
						</OneClick>
					</Stack>
					<QuotesTable />
				</Paper>
			</Stack>
			<QuotesDialog />
		</ContentProvider>
	);
};
