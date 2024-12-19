/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useCurrencyFormat } from '@/data/Content/CurrencyFormat';
import { Typography } from '@mui/material';
import { type FC } from 'react';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import type { QuoteItem } from '@/data/types/Quote';
import { formatPrice } from '@/utils/formatPrice';

type QuoteProductsSummaryProps = {
	quoteData: QuoteItem;
};
export const QuoteProductsSummaryTotalProposedOrQuotedPrice: FC<QuoteProductsSummaryProps> = (
	props
) => {
	const nls = useLocalization('QuoteProductsSummary');
	const { quoteData } = props;
	const { decimalPlaces } = useCurrencyFormat();
	const { localeName: locale } = useStoreLocale();
	const { settings } = useSettings();

	return (
		<>
			<Typography>
				{quoteData?.totalQuotedPrice !== null
					? nls.TotalQuotePrice.t()
					: nls.TotalProposedPrice.t()}
			</Typography>
			<Typography>
				{formatPrice(
					locale,
					quoteData?.currency ?? settings?.defaultCurrency,
					quoteData?.totalQuotedPrice !== null
						? quoteData?.totalQuotedPrice ?? nls.NA.t()
						: quoteData?.totalProposedPrice ?? nls.NA.t(),
					decimalPlaces
				)}
			</Typography>
		</>
	);
};
