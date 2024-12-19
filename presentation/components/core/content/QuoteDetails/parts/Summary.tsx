/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { QuoteDetailsActions } from '@/components/content/QuoteDetails/parts/Actions';
import { quoteDetailsSummaryPaperSX } from '@/components/content/QuoteDetails/styles/summaryPaper';
import { quotesTableStatusDotSX } from '@/components/content/Quotes/styles/Table/statusDot';
import { StateLabels } from '@/data/constants/quotes';
import type { useQuoteDetails } from '@/data/Content/QuoteDetails';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Circle } from '@mui/icons-material';
import { Paper, Stack, Typography } from '@mui/material';
import { type FC, useContext, useMemo } from 'react';

export const QuoteDetailsSummary: FC = () => {
	const nls = useLocalization('QuoteDetails');
	const statesNls = useLocalization('QuoteStates');
	const quoteContent = useContext(ContentContext) as ReturnType<typeof useQuoteDetails>;
	const { quoteById } = quoteContent;
	const pairs = useMemo(
		() => [
			{ name: nls.Number.t(), value: quoteById?.id },
			{ name: nls.Title.t(), value: quoteById?.name },
			{ name: nls.Organization.t(), value: quoteById?.organization?.name },
			{ name: nls.Contract.t(), value: quoteById?.contract?.name },
			{
				name: nls.Status.t(),
				value: statesNls[StateLabels[`${quoteById?.status}`] as keyof typeof statesNls]?.t(),
				status: quoteById?.status,
			},
		],
		[nls, quoteById, statesNls]
	);
	return (
		<Paper sx={quoteDetailsSummaryPaperSX}>
			<Stack spacing={2}>
				{pairs.map(({ name, value, status }, key) => (
					<Stack key={key}>
						<Typography variant="body2">{name}</Typography>
						<Typography>
							{status !== undefined && status in StateLabels ? (
								<Circle sx={quotesTableStatusDotSX(status)} />
							) : null}
							{value}
						</Typography>
					</Stack>
				))}
				<QuoteDetailsActions />
			</Stack>
		</Paper>
	);
};
