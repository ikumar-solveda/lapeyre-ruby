/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useNextRouter } from '@/data/Content/_NextRouter';
import { useSettings } from '@/data/Settings';
import { formatPrice } from '@/utils/formatPrice';
import { useMemo } from 'react';

type PriceDisplayProps = {
	min: number;
	max?: number;
	currency?: string;
	locale?: string;
};

/**
 * Formatted Price or Price Range Display component
 * displays a price or price range between min price to max price that is formatted to the currency and locale
 * @param props
 */
export const PriceDisplay: React.FC<PriceDisplayProps> = ({
	min,
	max,
	currency: _currency,
	locale: _locale,
}) => {
	const { settings } = useSettings();
	const router = useNextRouter();

	const currency = useMemo(
		() => _currency ?? settings?.defaultCurrency,
		[_currency, settings?.defaultCurrency]
	);

	const locale = useMemo(() => _locale ?? router.locale ?? router.defaultLocale, [_locale, router]);
	return (
		<>
			{max === undefined ? (
				<>{formatPrice(locale, currency, min)}</>
			) : (
				<>{`${formatPrice(locale, currency, min)} - ${formatPrice(locale, currency, max)}`}</>
			)}
		</>
	);
};
