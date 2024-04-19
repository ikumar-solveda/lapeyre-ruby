/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { OrderItemTableRowData } from '@/components/content/OrderItemTable/parts/Table';
import { orderItemTablePriceSX } from '@/components/content/OrderItemTable/styles/orderItemTablePrice';
import { useOrderItemTableRow } from '@/data/Content/OrderItemTable';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { dFix, useSettings } from '@/data/Settings';
import { ContentContext } from '@/data/context/content';
import { formatPrice } from '@/utils/formatPrice';
import { Stack, Typography } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

export const OrderItemUnitPrice: FC = () => {
	const {
		itemDetails: { unitPrice, currency: unitPriceCurrency },
		details: { prices },
	} = useContext(ContentContext) as OrderItemTableRowData & ReturnType<typeof useOrderItemTableRow>;
	const { offer = 0, list = 0, currency: _currency } = prices;
	const router = useNextRouter();
	const { settings } = useSettings();
	const localization = useLocalization('PriceDisplay');
	const locale = useMemo(() => router.locale ?? router.defaultLocale, [router]);
	const currency = useMemo(() => _currency ?? settings?.defaultCurrency, [_currency, settings]);
	const unitPriceFromItem = dFix(unitPrice);

	return (
		<Stack direction="row" spacing={0.5} alignItems="center">
			{unitPrice?.trim() ? (
				<Typography data-testid="offer-price" id="offer-price">
					{localization.Labels.UnitPrice.t({
						price: formatPrice(locale, unitPriceCurrency, unitPriceFromItem),
					})}
				</Typography>
			) : (
				<>
					{offer > 0 && offer < list ? (
						<Typography sx={orderItemTablePriceSX} data-testid="list-price" id="list-price">
							{formatPrice(locale, currency, list)}
						</Typography>
					) : null}

					{offer > 0 ? (
						<Typography data-testid="offer-price" id="offer-price">
							{localization.Labels.PerUnit.t({ price: formatPrice(locale, currency, offer) })}
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

// TODO: Add actual uom
