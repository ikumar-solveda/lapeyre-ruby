/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { NumberInput } from '@/components/blocks/NumberInput';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { Button, Stack, Box } from '@mui/material';
import { ContentContext } from '@/data/context/content';
import { useFacetNavigation } from '@/data/Content/FacetNavigation';
import { FC, useCallback, useMemo, useState, useContext } from 'react';

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

export const FacetNavigationPriceRangePicker: FC = () => {
	const { onPriceRangeChange } = useContext(ContentContext) as ReturnType<
		typeof useFacetNavigation
	>;
	const { settings } = useSettings();
	const [maxPrice, setMaxPrice] = useState<number | null>(null);
	const [minPrice, setMinPrice] = useState<number | null>(null);
	const productFilterNLS = useLocalization('ProductFilter');

	const onChange = useCallback(
		(label: 'min' | 'max') => (value: number | null) =>
			label === 'min' ? setMinPrice(value) : setMaxPrice(value),
		[]
	);

	const error = useMemo(() => !isPriceRangeValid(minPrice, maxPrice), [maxPrice, minPrice]);

	const buttonDisabled = useMemo(
		() => minPrice === null || maxPrice === null || !isPriceRangeValid(minPrice, maxPrice),
		[maxPrice, minPrice]
	);

	const submit = useCallback(() => {
		if (minPrice !== null && maxPrice !== null) {
			onPriceRangeChange({ minPrice, maxPrice });
		}
	}, [minPrice, maxPrice, onPriceRangeChange]);

	return (
		<Stack spacing={1}>
			<Stack spacing={1} direction="row">
				<NumberInput
					value={minPrice}
					min={0}
					precision={2}
					placeholder={productFilterNLS.Labels.minPrice.t()}
					onChange={onChange('min')}
					prefix={settings?.currencySymbol}
					error={error}
				/>
				<NumberInput
					value={maxPrice}
					min={1}
					precision={2}
					placeholder={productFilterNLS.Labels.maxPrice.t()}
					onChange={onChange('max')}
					prefix={settings?.currencySymbol}
					error={error}
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
