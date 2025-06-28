/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023-2025.
 */

import { B2B } from '@/components/blocks/B2B';
import { HeaderAccount } from '@/components/content/Header/parts/Account';
import { HeaderLocateStore } from '@/components/content/Header/parts/LocateStore';
import { HeaderMiniCart } from '@/components/content/Header/parts/MiniCart';
import { HeaderMobileDrawer } from '@/components/content/Header/parts/MobileDrawer';
import { HeaderMobileToggleButton } from '@/components/content/Header/parts/MobileToggleButton';
import { HeaderNavBar } from '@/components/content/Header/parts/NavBar';
import { HeaderQuickOrder } from '@/components/content/Header/parts/QuickOrder';
import { HeaderSearch } from '@/components/content/Header/parts/Search';
import { headerContainerSX } from '@/components/content/Header/styles/container';
import { MergeCartConfirmationDialog } from '@/components/content/MergeCartConfirmationDialog';
import { useHeader } from '@/data/Content/Header';
import { ID } from '@/data/types/Basic';
import { Container, Paper, Stack } from '@mui/material';
import Image from 'next/image';
import { FC, useCallback, useState } from 'react';

export const Header: FC<{
	id: ID;
}> = ({ id }) => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const toggleDrawer = useCallback(
		(open?: boolean) => () => {
			setDrawerOpen(open !== undefined ? open : (current) => !current);
		},
		[]
	);
	const { contentItems } = useHeader(id);
	return (
		<Paper component="header" sx={headerContainerSX} elevation={1}>
			<Container maxWidth="xl" disableGutters sx={{ padding: '0' }}>
				<Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
					<Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%' }}>
						<HeaderMobileToggleButton toggleDrawer={toggleDrawer} open={drawerOpen} />
						<HeaderMobileDrawer toggleDrawer={toggleDrawer} open={drawerOpen} />
						{contentItems.map((properties) => (
							// <ContentRecommendation
							// 	key={properties.emsName}
							// 	id={`${id}-${properties.emsName}`}
							// 	properties={properties}
							// />
							<Image
								src="https://commerce-live.pre.lape.now.hclsoftware.cloud/images/type-icons/lapeyre-logo.svg"
								alt="logo"
								width={213}
								height={68}
								className="header-logo"
							/>
						))}
						<HeaderSearch />
					</Stack>
					<Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
						<HeaderLocateStore />
						<B2B>
							<HeaderQuickOrder />
						</B2B>
						<HeaderMiniCart mobileBreakpoint="md" />
						<HeaderAccount mobileBreakpoint="md" />
						{/* <HeaderLanguageAndCurrency /> */}
					</Stack>
				</Stack>
			</Container>
			<HeaderSearch mobile={true} />
			<HeaderNavBar />
			<MergeCartConfirmationDialog />
		</Paper>
	);
};
