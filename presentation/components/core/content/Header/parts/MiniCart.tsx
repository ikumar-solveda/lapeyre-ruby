/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { HeaderMiniCartDropMenu } from '@/components/content/Header/parts/MiniCartDropMenu';
import { headerIconLabelSX } from '@/components/content/Header/styles/iconLabel';
import { headerItemLinkSX } from '@/components/content/Header/styles/itemLink';
import { headerItemStackSX } from '@/components/content/Header/styles/itemStack';
import { headerMiniCartBadgeSX } from '@/components/content/Header/styles/miniCart/badge';
import { headerMiniCartContainerSX } from '@/components/content/Header/styles/miniCart/container';
import { headerNavBarDropMenuSX } from '@/components/content/Header/styles/navBar/dropMenu';
import { useCart } from '@/data/Content/Cart';
import { useNotifications } from '@/data/Content/Notifications';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { useUser } from '@/data/User';
import { useThemeSettings } from '@/styles/theme';
import { Switch } from '@/utils/switch';
import { touchMoveListener } from '@/utils/touchMoveListener';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {
	Badge,
	Breakpoint,
	Button,
	ClickAwayListener,
	Stack,
	Tooltip,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC, MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';

type Props = {
	mobileBreakpoint: Breakpoint;
};

export const HeaderMiniCart: FC<Props> = ({ mobileBreakpoint = 'sm' }) => {
	const router = useNextRouter();
	const RouteLocal = useLocalization('Routes');
	const CartLabels = useLocalization('MiniCart');
	const { message } = useNotifications();
	const theme = useTheme();
	const { getAdditive } = useThemeSettings();
	const { user: { userId } = {} } = useUser();
	const { count: itemCount, mutateCart } = useCart();
	const isMobile = useMediaQuery(theme.breakpoints.down(mobileBreakpoint));
	const [open, setOpen] = useState(false);
	const initialized = useRef<boolean>(false);
	const [count, setCount] = useState<number>(0);
	const onBadge = useCallback(() => router.push(RouteLocal.Cart.route.t()), [router, RouteLocal]);
	const handleToolTip = useCallback(
		(action?: string) => () =>
			setOpen((open) =>
				Switch(action)
					.case('open', () => true)
					.case('close', () => false)
					.defaultTo(() => !open)
			),
		[]
	);
	const onMouseEnter: MouseEventHandler<HTMLDivElement> = useCallback(() => {
		if (!isMobile) {
			handleToolTip('open')();
		}
	}, [handleToolTip, isMobile]);
	useEffect(() => {
		if (message.isAddToCart) {
			setOpen(true);
		}
	}, [message.isAddToCart]);
	useEffect(() => {
		if (!router.asPath) return;
		handleToolTip('close')();
	}, [handleToolTip, router.asPath]);

	useEffect(() => {
		if (initialized.current) {
			mutateCart();
		} else {
			initialized.current = true;
		}
	}, [mutateCart, userId]);

	// for CDN caching -- render this on client
	useEffect(() => {
		setCount(() => itemCount);
	}, [itemCount]);

	useEffect(() => touchMoveListener(handleToolTip('close')), []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<ClickAwayListener onClickAway={handleToolTip('close')}>
			<Stack onMouseLeave={handleToolTip('close')} sx={headerMiniCartContainerSX}>
				<Tooltip
					placement="bottom"
					open={open}
					onClose={handleToolTip('close')}
					disableFocusListener
					disableHoverListener
					disableTouchListener
					componentsProps={{
						tooltip: {
							sx: headerNavBarDropMenuSX,
						},
					}}
					title={
						<Stack direction="row">
							<HeaderMiniCartDropMenu />
						</Stack>
					}
				>
					<Stack alignItems="center" onMouseEnter={onMouseEnter} sx={headerItemStackSX}>
						<Badge onClick={onBadge} badgeContent={count} sx={headerMiniCartBadgeSX}>
							<Linkable
								href={`/${RouteLocal.Cart.route.t()}`}
								id="header-mini-cart-icon"
								data-testid="header-mini-cart-icon"
								aria-label={CartLabels.Items.t({ count })}
								sx={headerItemLinkSX}
							>
								<ShoppingCartOutlinedIcon />
							</Linkable>
						</Badge>
						<Typography sx={headerIconLabelSX}>
							<Linkable
								href={`/${RouteLocal.Cart.route.t()}`}
								id="header-mini-cart-title"
								data-testid="header-mini-cart-title"
								aria-label={CartLabels.Items.t({ count })}
								sx={headerItemLinkSX}
							>
								{CartLabels.Items.t({ count })}
							</Linkable>
						</Typography>
					</Stack>
				</Tooltip>
				{isMobile === false ? (
					<Button sx={getAdditive('coverTapTarget')} onClick={handleToolTip()}>
						{CartLabels.Title.t()}
					</Button>
				) : null}
			</Stack>
		</ClickAwayListener>
	);
};
