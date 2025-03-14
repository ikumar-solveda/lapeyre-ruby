/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { PriceDisplayBase } from '@/components/blocks/PriceDisplay';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import type { QuoteItem } from '@/data/types/Quote';
import { Typography } from '@mui/material';
import { isNil } from 'lodash';
import { type FC } from 'react';

type QuoteProductsSummaryProps = {
	quoteData: QuoteItem;
};
export const QuoteProductsSummaryTotalProposedOrQuotedPrice: FC<QuoteProductsSummaryProps> = (
	props
) => {
	const nls = useLocalization('QuoteProductsSummary');
	const { quoteData } = props;
	const { settings } = useSettings();
	const currency = quoteData?.currency ?? settings?.defaultCurrency;
	const price = quoteData?.totalQuotedPrice ?? quoteData?.totalProposedPrice;
	return (
		<>
			<Typography>
				{!isNil(quoteData?.totalQuotedPrice) ? nls.TotalQuotePrice.t() : nls.TotalProposedPrice.t()}
			</Typography>
			<Typography>
				{!isNil(price) ? <PriceDisplayBase min={price} currency={currency} /> : nls.NA.t()}
			</Typography>
		</>
	);
};
