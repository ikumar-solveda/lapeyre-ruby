/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { HeaderAccountDropMenu } from '@/components/content/Header/parts/AccountDropMenu';
import { headerAccountContainerSX } from '@/components/content/Header/styles/account/container';
import { headerIconLabelSX } from '@/components/content/Header/styles/iconLabel';
import { headerItemLinkSX } from '@/components/content/Header/styles/itemLink';
import { headerItemStackSX } from '@/components/content/Header/styles/itemStack';
import { headerNavBarDropMenuSX } from '@/components/content/Header/styles/navBar/dropMenu';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { usePreSelectContract } from '@/data/Content/PreSelectContract';
import { useLocalization } from '@/data/Localization';
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
	const theme = useTheme();
	const router = useNextRouter();
	const { getAdditive } = useThemeSettings();
	const isMobile = useMediaQuery(theme.breakpoints.down(mobileBreakpoint));
	const [open, setOpen] = useState(false);
	const { user } = useUser();
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

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
	}, [user]);

	const { route } = useMemo(() => {
		const showMyAccount = isLoggedIn;
		const route = showMyAccount
			? `/${RouteLocal.Account.route.t()}`
			: `/${RouteLocal.Login.route.t()}`;
		return { showMyAccount, route };
	}, [RouteLocal, isLoggedIn]);
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
						isLoggedIn ? (
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
