/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { orderItemTablePriceSX } from '@/components/content/OrderItemTable/styles/orderItemTablePrice';
import { useCurrencyFormat } from '@/data/Content/CurrencyFormat';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { useLocalization } from '@/data/Localization';
import { dFix, useSettings } from '@/data/Settings';
import { ProductDisplayPrice } from '@/data/types/Product';
import { formatPrice } from '@/utils/formatPrice';
import { Stack, Typography } from '@mui/material';
import { FC, useMemo } from 'react';

type Props = {
	unitPrice: string;
	unitPriceCurrency: string;
	prices: ProductDisplayPrice;
};

export const UnitPriceDisplay: FC<Props> = ({ unitPrice, unitPriceCurrency, prices }) => {
	const { offer = 0, list = 0, currency: _currency } = prices;
	const { localeName: locale } = useStoreLocale();
	const { settings } = useSettings();
	const { decimalPlaces } = useCurrencyFormat();
	const localization = useLocalization('PriceDisplay');
	const currency = useMemo(() => _currency ?? settings?.defaultCurrency, [_currency, settings]);
	const unitPriceFromItem = dFix(unitPrice);

	return (
		<Stack direction="row" spacing={0.5} alignItems="center">
			{unitPrice?.trim() ? (
				<Typography data-testid="offer-price" id="offer-price">
					{localization.Labels.UnitPrice.t({
						price: formatPrice(locale, unitPriceCurrency, unitPriceFromItem, decimalPlaces),
					})}
				</Typography>
			) : (
				<>
					{offer > 0 && offer < list ? (
						<Typography sx={orderItemTablePriceSX} data-testid="list-price" id="list-price">
							{formatPrice(locale, currency, list, decimalPlaces)}
						</Typography>
					) : null}

					{offer > 0 ? (
						<Typography data-testid="offer-price" id="offer-price">
							{localization.Labels.PerUnit.t({
								price: formatPrice(locale, currency, offer, decimalPlaces),
							})}
						</Typography>
					) : null}

					{offer === 0 ? (
						<Typography data-testid="no-price" id="no-price">
							{localization.Labels.Pending.t()}
						</Typography>
					) : null}
				</>
			)}
		</Stack>
	);
};
