/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { STATUS_PENDING } from '@/data/Content/_Order';
import { useCurrencyFormat } from '@/data/Content/CurrencyFormat';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { formatPrice } from '@/utils/formatPrice';
import { getCurrencyFromContext } from '@/utils/getCurrencyFromContext';
import { CircularProgress } from '@mui/material';
import { useMemo } from 'react';

type PriceDisplayProps = {
	min: number;
	max?: number;
	currency?: string;
	locale?: string;
};

type PriceDisplayBaseProps = {
	min: number;
	max?: number;
	currency: string;
};
/**
 * Formatted Price or Price Range Display component
 * displays a price or price range between min price to max price that is formatted to the currency and locale
 */
export const PriceDisplayBase: React.FC<PriceDisplayBaseProps> = ({ min, max, currency }) => {
	const { localeName: locale } = useStoreLocale();
	const { decimalPlaces } = useCurrencyFormat(currency);
	return (
		<>
			{max === undefined ? (
				<>{formatPrice(locale, currency, min, decimalPlaces)}</>
			) : (
				<>{`${formatPrice(locale, currency, min, decimalPlaces)} - ${formatPrice(
					locale,
					currency,
					max,
					decimalPlaces
				)}`}</>
			)}
		</>
	);
};

/**
 * PriceDisplay shows the progress indictor if currency is switching.
 */
export const PriceDisplay: React.FC<PriceDisplayProps> = ({
	min,
	max,
	currency: _currency,
	locale: _locale,
}) => {
	const { settings } = useSettings();
	const { user } = useUser();
	const currency = useMemo(
		() => _currency ?? settings?.defaultCurrency,
		[_currency, settings?.defaultCurrency]
	);
	const contextCurrency = getCurrencyFromContext(user?.context);

	const loading = user?.forCDNCache || currency !== contextCurrency; // TODO: with this logic, the search engine cached page will see spinner for price.

	return loading ? (
		<CircularProgress size={15} />
	) : (
		<PriceDisplayBase min={min} max={max} currency={currency} />
	);
};

/**
 * OrderPriceDisplay component, displays the price and show spinner based on status of the order if currency is switching
 */
export const OrderPriceDisplay: React.FC<{
	status: string;
	min: number;
	max?: number;
	currency: string;
}> = ({ status, min, max, currency }) => (
	<>
		{!status || STATUS_PENDING === status ? ( // pending order only
			<PriceDisplay min={min} max={max} currency={currency} />
		) : (
			<PriceDisplayBase currency={currency} min={min} max={max} />
		)}
	</>
);
