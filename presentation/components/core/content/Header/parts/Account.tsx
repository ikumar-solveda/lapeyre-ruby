/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import {
	Stack,
	Typography,
	useMediaQuery,
	Breakpoint,
	Tooltip,
	ClickAwayListener,
	Button,
	useTheme,
} from '@mui/material';
import { FC, useCallback, useState, useEffect } from 'react';
import { Switch } from '@/utils/switch';
import { Linkable } from '@/components/blocks/Linkable';
import { useLocalization } from '@/data/Localization';
import { useThemeSettings } from '@/styles/theme';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import { HeaderAccountDropMenu } from '@/components/content/Header/parts/AccountDropMenu';
import { headerIconLabelSX } from '@/components/content/Header/styles/iconLabel';
import { headerNavBarDropMenuSX } from '@/components/content/Header/styles/navBar/dropMenu';
import { headerAccountContainerSX } from '@/components/content/Header/styles/account/container';
import { useUser } from '@/data/User';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { headerLinkSX } from '@/components/content/Header/styles/link';

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
	const isLoggedIn = user?.isLoggedIn ?? false;

	const welcomeMessage = isLoggedIn
		? user?.firstName
			? HeaderLabels.Actions.WelcomeFirstName.t({ firstName: user?.firstName })
			: HeaderLabels.Actions.WelcomeNoFirstName.t()
		: AccountLabels.Title.t();

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
					<Linkable
						aria-label={welcomeMessage}
						sx={headerLinkSX}
						href={
							isLoggedIn ? `/${RouteLocal.Account.route.t()}` : `/${RouteLocal.Login.route.t()}`
						}
					>
						<Stack
							alignItems="center"
							onMouseEnter={isMobile === false ? handleToolTip('open') : undefined}
						>
							{isLoggedIn ? <HowToRegOutlinedIcon /> : <PersonOutlineOutlinedIcon />}
							<Typography sx={headerIconLabelSX}>{welcomeMessage}</Typography>
						</Stack>
					</Linkable>
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
