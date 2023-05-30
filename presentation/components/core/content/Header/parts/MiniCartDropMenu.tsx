/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useMemo } from 'react';
import { useLocalization } from '@/data/Localization';
import { Button, Divider, Typography, Stack } from '@mui/material';
import { Linkable } from '@/components/blocks/Linkable';
import { headerMiniCartMenuSX } from '@/components/content/Header/styles/miniCart/menu';
import { headerMiniCartItemSX } from '@/components/content/Header/styles/miniCart/item';
import { OrderItemTable } from '@/components/content/OrderItemTable';
import { useCart } from '@/data/Content/Cart';
import { headerMiniCartMoreItemsSX } from '@/components/content/Header/styles/miniCart/moreItems';
import { dFix } from '@/utils/floatingPoint';
import { useNextRouter } from '@/data/Content/_NextRouter';

const MAX_ROWS = 3;

export const HeaderMiniCartDropMenu: FC = () => {
	const router = useNextRouter();
	const CartLabels = useLocalization('MiniCart');
	const RouteLabels = useLocalization('Routes');
	const { orderItems, data: order, checkout, canContinue, count, getCount } = useCart();
	const locale = useMemo(() => router.locale ?? router.defaultLocale, [router]);
	const totalPrice = order?.totalProductPrice ?? '0.00';
	const currency = order?.totalProductPriceCurrency;
	const { firstNRows, firstNRowsCount } = useMemo(() => {
		const firstNRows = orderItems?.slice(0, MAX_ROWS);
		const firstNRowsCount = getCount(firstNRows);
		return { firstNRows, firstNRowsCount };
	}, [getCount, orderItems]);

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
							total: Intl.NumberFormat(locale, { style: 'currency', currency }).format(
								dFix(totalPrice)
							),
						})}
					</Typography>
					<Stack direction="row" spacing={1} justifyContent="center" sx={headerMiniCartItemSX}>
						<Linkable href={RouteLabels.Cart.route.t()} type="button" variant="outlined">
							{CartLabels.Actions.Cart.t()}
						</Linkable>
						<Button variant="contained" disabled={!canContinue()} onClick={checkout}>
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
