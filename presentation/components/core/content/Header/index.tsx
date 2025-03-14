/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023-2025.
 */

import { B2B } from '@/components/blocks/B2B';
import { ContentRecommendation } from '@/components/content/ContentRecommendation';
import { HeaderAccount } from '@/components/content/Header/parts/Account';
import { HeaderLanguageAndCurrency } from '@/components/content/Header/parts/LanguageAndCurrency';
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
			<Container>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					spacing={2}
					py={2}
				>
					<Stack direction="row" alignItems="center" spacing={2}>
						<HeaderMobileToggleButton toggleDrawer={toggleDrawer} open={drawerOpen} />
						<HeaderMobileDrawer toggleDrawer={toggleDrawer} open={drawerOpen} />
						{contentItems.map((properties) => (
							<ContentRecommendation
								key={properties.emsName}
								id={`${id}-${properties.emsName}`}
								properties={properties}
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
						<HeaderLanguageAndCurrency />
					</Stack>
				</Stack>
			</Container>
			<HeaderSearch mobile={true} />
			<HeaderNavBar />
			<MergeCartConfirmationDialog />
		</Paper>
	);
};
