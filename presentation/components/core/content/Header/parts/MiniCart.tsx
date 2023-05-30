/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import {
	Badge,
	Stack,
	Typography,
	Tooltip,
	useMediaQuery,
	Breakpoint,
	ClickAwayListener,
	Button,
	useTheme,
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { FC, useState, useCallback, useEffect, MouseEventHandler, useRef } from 'react';
import { Linkable } from '@/components/blocks/Linkable';
import { Switch } from '@/utils/switch';
import { useLocalization } from '@/data/Localization';
import { headerIconLabelSX } from '@/components/content/Header/styles/iconLabel';
import { headerMiniCartBadgeSX } from '@/components/content/Header/styles/miniCart/badge';
import { headerNavBarDropMenuSX } from '@/components/content/Header/styles/navBar/dropMenu';
import { HeaderMiniCartDropMenu } from '@/components/content/Header/parts/MiniCartDropMenu';
import { useThemeSettings } from '@/styles/theme';
import { headerMiniCartContainerSX } from '@/components/content/Header/styles/miniCart/container';
import { useNotifications } from '@/data/Content/Notifications';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { headerLinkSX } from '@/components/content/Header/styles/link';
import { useUser } from '@/data/User';
import { useCart } from '@/data/Content/Cart';

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
	const { count, mutateCart } = useCart();
	const isMobile = useMediaQuery(theme.breakpoints.down(mobileBreakpoint));
	const [open, setOpen] = useState(false);
	const initialized = useRef<boolean>(false);
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
					<Linkable
						href={`/${RouteLocal.Cart.route.t()}`}
						aria-label={CartLabels.Items.t({ count })}
						sx={headerLinkSX}
					>
						<Stack alignItems="center" onMouseEnter={onMouseEnter}>
							<Badge badgeContent={count} color="secondary" sx={headerMiniCartBadgeSX}>
								<ShoppingCartOutlinedIcon />
							</Badge>
							<Typography sx={headerIconLabelSX}>{CartLabels.Items.t({ count })}</Typography>
						</Stack>
					</Linkable>
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
