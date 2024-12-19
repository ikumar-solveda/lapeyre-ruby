/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { OneClick } from '@/components/blocks/OneClick';
import { QuoteDetailsAttachments } from '@/components/content/QuoteDetails/parts/Attachments';
import { QuoteDetailsComments } from '@/components/content/QuoteDetails/parts/Comments';
import { QuoteDetailsDescription } from '@/components/content/QuoteDetails/parts/Description';
import { QuoteDetailsDialog } from '@/components/content/QuoteDetails/parts/Dialog';
import { QuoteDetailsProducts } from '@/components/content/QuoteDetails/parts/Products';
import { QuoteDetailsRequests } from '@/components/content/QuoteDetails/parts/Requests';
import { QuoteDetailsSummary } from '@/components/content/QuoteDetails/parts/Summary';
import { quoteDetailsContentGridSX } from '@/components/content/QuoteDetails/styles/contentGrid';
import { quoteDetailsContentGridProps } from '@/components/content/QuoteDetails/styles/contentGridProps';
import { quoteDetailsHeaderStack } from '@/components/content/QuoteDetails/styles/headerStack';
import { quoteDetailsPageStack } from '@/components/content/QuoteDetails/styles/pageStack';
import { quoteDetailsTitleStack } from '@/components/content/QuoteDetails/styles/titleStack';
import { useQuoteDetails } from '@/data/Content/QuoteDetails';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ContentProvider } from '@/data/context/content';
import type { ID } from '@/data/types/Basic';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { Grid, Stack, Typography } from '@mui/material';
import { type FC, useMemo } from 'react';

type QuoteDetailsProps = {
	id: ID;
	variant?: 'full' | 'compact' | 'auto';
};

export const QuoteDetails: FC<QuoteDetailsProps> = () => {
	const nls = useLocalization('QuoteDetails');
	const actionNls = useLocalization('QuoteActions');
	const routes = useLocalization('Routes');
	const quotesContent = useQuoteDetails();
	const { quoteById } = quotesContent;
	const router = useNextRouter();
	const onClose = () => router.push(routes.Quotes.route.t());
	const id = useMemo(() => quoteById?.id ?? EMPTY_STRING, [quoteById]);

	return (
		<Stack {...quoteDetailsPageStack} useFlexGap>
			<ContentProvider value={quotesContent}>
				<Stack {...quoteDetailsTitleStack}>
					<Linkable href={routes.Quotes.route.t()}>
						<Typography variant="h3">{nls.Quotes.t()}</Typography>
					</Linkable>
					<ArrowForwardIos />
					<Typography variant="h3">{id}</Typography>
				</Stack>
				<Stack {...quoteDetailsHeaderStack}>
					<Typography variant="h4">{nls.Details.t()}</Typography>
					<OneClick onClick={onClose} variant="contained">
						{actionNls.Close.t()}
					</OneClick>
				</Stack>
				<Grid {...quoteDetailsContentGridProps} sx={quoteDetailsContentGridSX}>
					<Grid item xs={12} md={8}>
						<Stack spacing={2}>
							<QuoteDetailsDescription />
							<QuoteDetailsProducts />
							<QuoteDetailsAttachments />
							<QuoteDetailsRequests />
							<QuoteDetailsComments />
						</Stack>
					</Grid>
					<Grid item xs>
						<QuoteDetailsSummary />
					</Grid>
				</Grid>
				<QuoteDetailsDialog />
			</ContentProvider>
		</Stack>
	);
};
