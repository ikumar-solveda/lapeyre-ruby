/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { NumberInput } from '@/components/blocks/NumberInput';
import { useFacetNavigation } from '@/data/Content/FacetNavigation';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { ContentContext } from '@/data/context/content';
import { getCurrencyFromContext } from '@/utils/getCurrencyFromContext';
import { getCurrencySymbol } from '@/utils/formatPrice';
import { Box, Button, Stack } from '@mui/material';
import { FC, useCallback, useContext, useMemo, useState } from 'react';

const isPriceRangeValid = (minPrice: number | null, maxPrice: number | null) => {
	if (minPrice === null || maxPrice === null) return true;
	if (minPrice !== null && maxPrice !== null) {
		try {
			if (minPrice <= maxPrice) {
				return true;
			}
		} catch (e) {
			return false;
		}
		return false;
	}
};
const MINS = {
	min: 0,
	max: 1,
};

export const FacetNavigationPriceRangePicker: FC = () => {
	const { localeName: locale } = useStoreLocale();
	const { onPriceRangeChange } = useContext(ContentContext) as ReturnType<
		typeof useFacetNavigation
	>;
	const { settings } = useSettings();
	const { defaultCurrency } = settings;
	const [maxPrice, setMaxPrice] = useState<number | null>(null);
	const [minPrice, setMinPrice] = useState<number | null>(null);
	const productFilterNLS = useLocalization('ProductFilter');
	const { user } = useUser();
	const currency = useMemo(
		() => getCurrencyFromContext(user?.context) ?? defaultCurrency,
		[user, defaultCurrency]
	);
	const currencySymbol = useMemo(() => getCurrencySymbol(locale, currency), [locale, currency]);

	const onChange = useCallback(
		(label: 'min' | 'max') => (value: number | null) => {
			const val = value === null ? null : value < MINS[label] ? MINS[label] : value;
			if (label === 'min') {
				setMinPrice(val);
			} else {
				setMaxPrice(val);
			}
		},
		[]
	);

	const error = useMemo(() => !isPriceRangeValid(minPrice, maxPrice), [maxPrice, minPrice]);

	const buttonDisabled = useMemo(
		() => maxPrice === null || !isPriceRangeValid(minPrice, maxPrice),
		[maxPrice, minPrice]
	);

	const submit = useCallback(() => {
		if (maxPrice !== null) {
			onPriceRangeChange({ minPrice: minPrice ?? MINS.min, maxPrice });
		}
	}, [minPrice, maxPrice, onPriceRangeChange]);

	return (
		<Stack spacing={1}>
			<Stack spacing={1} direction="row">
				<NumberInput
					value={minPrice}
					min={MINS.min}
					precision={2}
					placeholder={productFilterNLS.Labels.minPrice.t()}
					onChange={onChange('min')}
					error={error}
					maxLength={12}
					data-testid="productFilter-min-price-range-picker-quantity"
					id="productFilter-min-price-range-picker-quantity"
					{...currencySymbol}
				/>
				<NumberInput
					value={maxPrice}
					min={MINS.max}
					precision={2}
					placeholder={productFilterNLS.Labels.maxPrice.t()}
					onChange={onChange('max')}
					error={error}
					maxLength={12}
					data-testid="productFilter-max-price-range-picker-quantity"
					id="productFilter-max-price-range-picker-quantity"
					{...currencySymbol}
				/>
			</Stack>
			<Box>
				<Button
					data-testid={`productFilter_price_facet`}
					id={`productFilter_price_facet`}
					disabled={buttonDisabled}
					size="small"
					variant="contained"
					onClick={submit}
				>
					{productFilterNLS.Actions.Filter.t()}
				</Button>
			</Box>
		</Stack>
	);
};
