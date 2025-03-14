/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { NumberInput } from '@/components/blocks/NumberInput';
import { QuoteProductsSummaryTooltip } from '@/components/blocks/QuoteProductsSummary/parts/Tooltip';
import { quoteProductsSummaryDiscountTypeValueSX } from '@/components/blocks/QuoteProductsSummary/styles/discountTypeValue';
import { DiscountType } from '@/data/constants/quotes';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { useLocalization } from '@/data/Localization';
import type { QuoteItem } from '@/data/types/Quote';
import { getCurrencySymbol } from '@/utils/formatPrice';
import { Typography } from '@mui/material';
import { debounce, isNil } from 'lodash';
import { useMemo, type FC } from 'react';

type QuoteProductsSummaryProps = {
	detailsView: boolean;
	quoteData: QuoteItem;
	handleDiscountValueChange: (price: number) => void;
	discountType: string;
	scale: number;
};
export const QuoteProductsSummaryDiscountValue: FC<QuoteProductsSummaryProps> = (props) => {
	const nls = useLocalization('QuoteProductsSummary');
	const { detailsView, quoteData, handleDiscountValueChange, discountType, scale } = props;
	const { localeName } = useStoreLocale();

	const numberInputAdornment = useMemo(
		() =>
			discountType === DiscountType.PERCENTAGE
				? { postfix: '%' }
				: discountType === DiscountType.AMOUNT
				? getCurrencySymbol(localeName, quoteData?.currency)
				: {},
		[discountType, localeName, quoteData?.currency]
	);

	const debouncedValueChange = useMemo(
		() =>
			debounce((update) => {
				if (
					update !== null &&
					update > 0 &&
					update !== Number(quoteData?.proposedAdjustmentAmount)
				) {
					handleDiscountValueChange && handleDiscountValueChange(update);
				}
			}, 1000),
		[handleDiscountValueChange, quoteData?.proposedAdjustmentAmount]
	);
	return (
		<>
			<Typography>
				{nls.Discount.t()} <QuoteProductsSummaryTooltip title={nls.DiscountTooltip.t()} />
			</Typography>
			{detailsView ? (
				<Typography>
					{!isNil(quoteData?.totalQuotedPrice)
						? quoteData?.quotedAdjustmentType !== DiscountType.UNIT
							? quoteData?.quotedAdjustmentAmount ?? nls.NA.t()
							: nls.NA.t()
						: quoteData?.proposedAdjustmentType !== DiscountType.UNIT
						? quoteData?.proposedAdjustmentAmount ?? nls.NA.t()
						: nls.NA.t()}
				</Typography>
			) : (
				<>
					{quoteData?.proposedAdjustmentType !== DiscountType.UNIT ? (
						<NumberInput
							id="quote-products-summary-discount-value"
							data-testid="quote-products-summary-discount-value"
							onChange={debouncedValueChange}
							value={quoteData?.proposedAdjustmentAmount?.toLocaleString() as string}
							min={1}
							disallowEmptyOnBlur
							sx={quoteProductsSummaryDiscountTypeValueSX}
							precision={scale}
							max={discountType === DiscountType.PERCENTAGE ? 100 : undefined}
							{...numberInputAdornment}
						/>
					) : (
						<Typography>{nls.NA.t()}</Typography>
					)}
				</>
			)}
		</>
	);
};
