/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext, useMemo } from 'react';
import { Stack, Typography } from '@mui/material';
import { OrderItemTableRowData } from '@/components/content/OrderItemTable/parts/Table';
import { orderItemTablePriceSX } from '@/components/content/OrderItemTable/styles/orderItemTablePrice';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { useOrderItemTableRow } from '@/data/Content/OrderItemTable';
import { formatPrice } from '@/utils/formatPrice';
import { useSettings } from '@/data/Settings';
import { useNextRouter } from '@/data/Content/_NextRouter';

export const OrderItemUnitPrice: FC = () => {
	const {
		details: { prices },
	} = useContext(ContentContext) as OrderItemTableRowData & ReturnType<typeof useOrderItemTableRow>;
	const { offer = 0, list = 0, currency: _currency } = prices;
	const router = useNextRouter();
	const { settings } = useSettings();
	const localization = useLocalization('PriceDisplay');
	const locale = useMemo(() => router.locale ?? router.defaultLocale, [router]);
	const currency = useMemo(() => _currency ?? settings?.defaultCurrency, [_currency, settings]);

	return (
		<Stack direction="row" spacing={0.5} alignItems="center">
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
		</Stack>
	);
};

// TODO: Add actual uom
