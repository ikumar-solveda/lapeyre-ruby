/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { PriceDisplayBase } from '@/components/blocks/PriceDisplay';
import { QuoteProductsSummaryDiscountValue } from '@/components/blocks/QuoteProductsSummary/parts/DiscountValue';
import { QuoteProductsSummaryTooltip } from '@/components/blocks/QuoteProductsSummary/parts/Tooltip';
import { QuoteProductsSummaryTotalProposedOrQuotedPrice } from '@/components/blocks/QuoteProductsSummary/parts/TotalProposedOrQuotedPrice';
import { quoteProductsSummaryDiscountTypeValueSX } from '@/components/blocks/QuoteProductsSummary/styles/discountTypeValue';
import { quoteProductsSummaryPaperSX } from '@/components/blocks/QuoteProductsSummary/styles/paper';
import { quoteProductsSummaryStack } from '@/components/blocks/QuoteProductsSummary/styles/stack';
import { quotesTableFilterMenuHeightSX } from '@/components/content/Quotes/styles/Table/filterMenuHeight';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { DISCOUNT_LABELS } from '@/data/constants/quotes';
import { useCurrencyFormat } from '@/data/Content/CurrencyFormat';
import { useLocalization } from '@/data/Localization';
import { dFix, useSettings } from '@/data/Settings';
import type { DISCOUNT_TYPE, QuoteItem } from '@/data/types/Quote';
import {
	Divider,
	FormControl,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	Stack,
	Typography,
} from '@mui/material';
import { type FC } from 'react';
type QuoteProductsSummaryProps = {
	detailsView?: boolean;
	quoteData: QuoteItem;
	handleDiscountTypeChange?: (event: SelectChangeEvent<string>) => void;
	handleDiscountValueChange?: (price: number) => void;
	discountType?: string;
};
export const QuoteProductsSummary: FC<QuoteProductsSummaryProps> = (props) => {
	const nls = useLocalization('QuoteProductsSummary');
	const { decimalPlaces } = useCurrencyFormat();
	const { settings } = useSettings();

	const {
		detailsView = false,
		quoteData,
		handleDiscountTypeChange,
		handleDiscountValueChange,
		discountType,
	} = props;
	const currency = quoteData?.currency ?? settings?.defaultCurrency;
	const price = quoteData?.totalListPrice ?? undefined;

	return (
		<Paper sx={quoteProductsSummaryPaperSX}>
			<Stack>
				<Stack {...quoteProductsSummaryStack}>
					<Typography>{nls.TotalListPrice.t()}</Typography>
					<Typography>
						{price !== undefined ? (
							<PriceDisplayBase min={price} currency={currency} />
						) : (
							nls.NA.t()
						)}
					</Typography>
				</Stack>
				<Divider />
				<Stack {...quoteProductsSummaryStack}>
					<Typography>
						{nls.DiscountType.t()}
						<QuoteProductsSummaryTooltip title={nls.DiscountTypeTooltip.t()} />
					</Typography>

					{detailsView ? (
						<Typography>
							{DISCOUNT_LABELS[quoteData?.quotedAdjustmentType as DISCOUNT_TYPE]
								? nls[
										DISCOUNT_LABELS[
											quoteData?.quotedAdjustmentType as DISCOUNT_TYPE
										] as keyof typeof nls
								  ].t()
								: DISCOUNT_LABELS[quoteData?.proposedAdjustmentType as DISCOUNT_TYPE]
								? nls[
										DISCOUNT_LABELS[
											quoteData?.proposedAdjustmentType as DISCOUNT_TYPE
										] as keyof typeof nls
								  ].t()
								: nls.NA.t()}
						</Typography>
					) : (
						<FormControl sx={quoteProductsSummaryDiscountTypeValueSX}>
							<Select
								displayEmpty
								id="filter-by-statuses"
								data-testid="filter-by-statuses"
								value={discountType}
								onChange={handleDiscountTypeChange}
								MenuProps={{ PaperProps: { sx: quotesTableFilterMenuHeightSX } }}
							>
								{Object.entries(DISCOUNT_LABELS).map(([dType, nlsKey]) => (
									<MenuItem key={dType} value={dType}>
										{nls[nlsKey as keyof typeof nls].t()}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					)}
				</Stack>
				<Divider />
				<Stack {...quoteProductsSummaryStack}>
					<QuoteProductsSummaryDiscountValue
						detailsView={detailsView}
						handleDiscountValueChange={handleDiscountValueChange as (price: number) => void}
						discountType={discountType as DISCOUNT_TYPE}
						quoteData={quoteData}
						scale={dFix(decimalPlaces ?? EMPTY_STRING, 0)}
					/>
				</Stack>
				<Divider />
				<Stack {...quoteProductsSummaryStack}>
					<QuoteProductsSummaryTotalProposedOrQuotedPrice quoteData={quoteData} />
				</Stack>
			</Stack>
		</Paper>
	);
};
