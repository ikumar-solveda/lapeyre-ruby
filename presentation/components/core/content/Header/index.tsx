/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023-2025.
 */

import { Box, Button, Container, Link as MuiLink, Paper, Stack } from '@mui/material';
import Link from 'next/link';
import { FC, useCallback, useEffect, useState } from 'react';

import { HeaderAccount } from '@/components/content/Header/parts/Account';
import { HeaderLocateStore } from '@/components/content/Header/parts/LocateStore';
import { HeaderMiniCart } from '@/components/content/Header/parts/MiniCart';
import { HeaderMobileDrawer } from '@/components/content/Header/parts/MobileDrawer';
import { HeaderMobileToggleButton } from '@/components/content/Header/parts/MobileToggleButton';
import { HeaderSearch } from '@/components/content/Header/parts/Search';
import { headerContainerSX } from '@/components/content/Header/styles/container';
import { MergeCartConfirmationDialog } from '@/components/content/MergeCartConfirmationDialog';
import { ID } from '@/data/types/Basic';

type Seo = {
	label: string;
	url: string;
	target?: string;
	type?: string;
};

type HeaderLink = {
	seo: Seo;
	usage?: string;
};

type HeaderProps = {
	id: ID;
};

export const Header: FC<HeaderProps> = ({ id }) => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [headerLinks, setHeaderLinks] = useState<HeaderLink[]>([]);

	const toggleDrawer = useCallback(
		(open?: boolean) => () => {
			setDrawerOpen(open !== undefined ? open : (cur) => !cur);
		},
		[]
	);

	// dynamic nav links
	useEffect(() => {
		fetch('https://www.statics-lapeyre.fr/json/navigation-links.json')
			.then((res) => res.json())
			.then((data) => setHeaderLinks(data.headerLinks || []))
			.catch((err) => console.error('Error fetching header links:', err));
	}, []);

	// dynamic list of <a> links
	const RenderNavLinks: FC<{ links: HeaderLink[] }> = ({ links }) => {
		if (!links.length) return null;
		return (
			<Stack direction="row" spacing={4}>
				{links.map((link, i) => {
					const { seo } = link;
					return seo?.label && seo?.url ? (
						<Link key={i} href={seo.url} passHref>
							<MuiLink underline="none" color="text.primary" target={seo.target || '_self'}>
								{seo.label}
							</MuiLink>
						</Link>
					) : null;
				})}
			</Stack>
		);
	};

	return (
		<Paper component="header" sx={headerContainerSX} elevation={0}>
			{/*TOP  */}
			<Container sx={{ borderBottom: '1px solid #eee', py: 1 }}>
				<Stack direction="row" alignItems="center" justifyContent="space-between">
					{/* Logo */}
					<Box>
						<MuiLink>
							<img
								src="  https://www.lapeyre.fr/images/type-icons/lapeyre-logo.svg"
								height={32}
								alt="Lapeyre"
							/>
						</MuiLink>
					</Box>

					{/* Search */}
					<Box flex={1} mx={2}>
						<HeaderSearch />
					</Box>

					{/* Store chooser, account, cart */}
					<Stack direction="row" alignItems="center" spacing={2}>
						<HeaderLocateStore />
						<HeaderAccount mobileBreakpoint="md" />
						<HeaderMiniCart mobileBreakpoint="md" />
					</Stack>
				</Stack>
			</Container>

			{/*  navlinks */}
			<Container sx={{ py: 1 }}>
				<Stack direction="row" alignItems="center" justifyContent="space-between">
					<Stack direction="row" alignItems="center" spacing={2}>
						<HeaderMobileToggleButton toggleDrawer={toggleDrawer} open={drawerOpen} />
						<HeaderMobileDrawer toggleDrawer={toggleDrawer} open={drawerOpen} />
						<RenderNavLinks links={headerLinks} />
					</Stack>

					{/* buttons */}
					<Stack direction="row" spacing={2}>
						<Button variant="outlined" size="small">
							Prendre rendez‑vous
						</Button>
						<Button variant="contained" size="small">
							Mon projet
						</Button>
					</Stack>
				</Stack>
			</Container>

			<MergeCartConfirmationDialog />
			{/* <HeaderNavBar /> */}
		</Paper>
	);
};
