/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { HeaderAccountDropMenu } from '@/components/content/Header/parts/AccountDropMenu';
import { headerAccountContainerSX } from '@/components/content/Header/styles/account/container';
import { headerIconLabelSX } from '@/components/content/Header/styles/iconLabel';
import { headerItemLinkSX } from '@/components/content/Header/styles/itemLink';
import { headerItemStackSX } from '@/components/content/Header/styles/itemStack';
import { headerNavBarDropMenuSX } from '@/components/content/Header/styles/navBar/dropMenu';
import { GENERIC_USER_ID } from '@/data/constants/user';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useAppInitializationRef } from '@/data/Content/AppInitializationRef';
import { useGuest } from '@/data/Content/Guest';
import { usePreSelectContract } from '@/data/Content/PreSelectContract';
import { useLocalization } from '@/data/Localization';
import { useRememberMeState } from '@/data/state/useRememberMeState';
import { useUser } from '@/data/User';
import { useThemeSettings } from '@/styles/theme';
import { Switch } from '@/utils/switch';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import {
	Breakpoint,
	Button,
	ClickAwayListener,
	Stack,
	Tooltip,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';

type Props = {
	mobileBreakpoint: Breakpoint;
};

export const HeaderAccount: FC<Props> = ({ mobileBreakpoint = 'sm' }) => {
	const AccountLabels = useLocalization('SignInPage');
	const HeaderLabels = useLocalization('Header');
	const RouteLocal = useLocalization('Routes');
	const appInitializationRef = useAppInitializationRef();
	const theme = useTheme();
	const router = useNextRouter();
	const { getAdditive } = useThemeSettings();
	const isMobile = useMediaQuery(theme.breakpoints.down(mobileBreakpoint));
	const [open, setOpen] = useState(false);
	const { user } = useUser();
	const { guestLogin, guestLogout } = useGuest();
	const {
		actions: { setRememberMe },
	} = useRememberMeState();
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [isPartialAuth, setIsPartialAuth] = useState<boolean>(false);

	const welcomeMessage = isLoggedIn
		? user?.firstName
			? HeaderLabels.Actions.WelcomeFirstName.t({ firstName: user?.firstName })
			: HeaderLabels.Actions.WelcomeNoFirstName.t()
		: AccountLabels.Title.t();

	// preselect contract if currentTradingAgreementIds has more than one
	usePreSelectContract();
	// for CDN caching -- render this on client
	useEffect(() => {
		setIsLoggedIn(() => user?.isLoggedIn ?? false);
		setIsPartialAuth(() => user?.context?.isPartiallyAuthenticated ?? false);
	}, [user]);

	useEffect(() => {
		if (isPartialAuth) {
			// means we get partial authenticated user information
			setRememberMe(true);
		}
	}, [isPartialAuth, setRememberMe]);

	const { showMyAccount, route } = useMemo(() => {
		const showMyAccount = isLoggedIn && !isPartialAuth;
		const route = showMyAccount
			? `/${RouteLocal.Account.route.t()}`
			: `/${RouteLocal.Login.route.t()}`;
		return { showMyAccount, route };
	}, [RouteLocal, isLoggedIn, isPartialAuth]);

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
	useEffect(() => {
		if (!router.asPath) return;
		handleToolTip('close')();
	}, [handleToolTip, router.asPath]);

	useEffect(() => {
		if (user?.userId && !user.forCDNCache && !appInitializationRef.guestInitialized) {
			if (
				user.userId !== GENERIC_USER_ID &&
				user.context?.basicInfo.registerType === 'G' &&
				user.context.isPartiallyAuthenticated
			) {
				guestLogin();
			}
			if (user.userId === GENERIC_USER_ID) {
				guestLogout(); // create generic user data cookie so that we can update currency in generic user context
			}
			appInitializationRef.guestInitialized = true; // only run once
		}
	}, [appInitializationRef, guestLogin, guestLogout, user]);

	return (
		<ClickAwayListener onClickAway={handleToolTip('close')}>
			<Stack sx={headerAccountContainerSX} onMouseLeave={handleToolTip('close')}>
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
						showMyAccount ? (
							<Stack direction="row">
								<HeaderAccountDropMenu />
							</Stack>
						) : null
					}
				>
					<Stack
						alignItems="center"
						onMouseEnter={isMobile === false ? handleToolTip('open') : undefined}
						sx={headerItemStackSX}
					>
						<Linkable
							aria-label={welcomeMessage}
							sx={headerItemLinkSX}
							href={route}
							id="sign-in-or-account-route-icon"
							data-testid="sin-in-or-account-route-icon"
						>
							{isLoggedIn ? <HowToRegOutlinedIcon /> : <PersonOutlineOutlinedIcon />}
						</Linkable>
						<Typography sx={headerIconLabelSX}>
							<Linkable
								aria-label={welcomeMessage}
								sx={headerItemLinkSX}
								href={route}
								id="sign-in-or-account-route"
								data-testid="sin-in-or-account-route"
							>
								{welcomeMessage}
							</Linkable>
						</Typography>
					</Stack>
				</Tooltip>
				{isMobile === false && isLoggedIn ? (
					<Button sx={getAdditive('coverTapTarget')} onClick={handleToolTip()}>
						{welcomeMessage}
					</Button>
				) : null}
			</Stack>
		</ClickAwayListener>
	);
};
