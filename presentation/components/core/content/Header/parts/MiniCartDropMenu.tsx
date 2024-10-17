/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { headerMiniCartButtonSX } from '@/components/content/Header/styles/miniCart/button';
import { headerMiniCartItemSX } from '@/components/content/Header/styles/miniCart/item';
import { headerMiniCartItemStack } from '@/components/content/Header/styles/miniCart/itemStack';
import { headerMiniCartMenuSX } from '@/components/content/Header/styles/miniCart/menu';
import { headerMiniCartMoreItemsSX } from '@/components/content/Header/styles/miniCart/moreItems';
import { OrderItemTable } from '@/components/content/OrderItemTable';
import { useCart } from '@/data/Content/Cart';
import { useCurrencyFormat } from '@/data/Content/CurrencyFormat';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { formatPrice } from '@/utils/formatPrice';
import { Button, Divider, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC, useMemo } from 'react';

export const HeaderMiniCartDropMenu: FC = () => {
	const { settings } = useSettings();
	const { decimalPlaces } = useCurrencyFormat();
	const { localeName: locale } = useStoreLocale();
	const CartLabels = useLocalization('MiniCart');
	const RouteLabels = useLocalization('Routes');
	const { orderItems, data: order, checkout, canContinue, count, getCount } = useCart();
	const totalPrice = order?.totalProductPrice ?? '0.00';
	const currency = order?.totalProductPriceCurrency ?? settings.defaultCurrency;
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const MAX_ROWS = isMobile ? 2 : 3;
	const { firstNRows, firstNRowsCount } = useMemo(() => {
		const firstNRows = orderItems?.slice(0, MAX_ROWS);
		const firstNRowsCount = getCount(firstNRows);
		return { firstNRows, firstNRowsCount };
	}, [MAX_ROWS, getCount, orderItems]);

	return (
		<Stack sx={headerMiniCartMenuSX} spacing={1} divider={<Divider />}>
			{firstNRows?.length > 0 ? (
				<Stack divider={<Divider />}>
					<Typography variant="h6" align="center" sx={headerMiniCartItemSX}>
						{CartLabels.Title.t()}
					</Typography>
					<Stack>
						<OrderItemTable orderItems={firstNRows} orderId={order?.orderId} variant="mini" />
						{count > firstNRowsCount ? (
							<Typography sx={headerMiniCartMoreItemsSX} align="right">
								{CartLabels.AndNMore.t({ count: count - firstNRowsCount })}
							</Typography>
						) : null}
					</Stack>
					<Typography variant="body1" sx={headerMiniCartItemSX} align="center">
						{CartLabels.Subtotal.t({
							count,
							total: formatPrice(locale, currency, totalPrice, decimalPlaces),
						})}
					</Typography>
					<Stack {...headerMiniCartItemStack}>
						<Linkable
							href={RouteLabels.Cart.route.t()}
							type="button"
							variant="outlined"
							id="mini-cart-view-full-cart-button"
							data-testid="mini-cart-view-full-cart-button"
							sx={headerMiniCartButtonSX}
						>
							{CartLabels.Actions.Cart.t()}
						</Linkable>
						<Button
							variant="contained"
							disabled={!canContinue()}
							onClick={checkout}
							id="mini-cart-checkout-button"
							data-testid="mini-cart-checkout-button"
							sx={headerMiniCartButtonSX}
						>
							{CartLabels.Actions.CheckOut.t()}
						</Button>
					</Stack>
				</Stack>
			) : (
				<Stack spacing={1} alignItems="center" sx={headerMiniCartItemSX}>
					<Typography variant="body1" align="center">
						{CartLabels.Empty.t()}
					</Typography>
				</Stack>
			)}
		</Stack>
	);
};
