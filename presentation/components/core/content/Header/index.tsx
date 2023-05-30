/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { HeaderNavBar } from '@/components/content/Header/parts/NavBar';
import { headerContainerSX } from '@/components/content/Header/styles/container';
import { Container, Paper, Stack } from '@mui/material';
import { FC, useCallback, useState } from 'react';
import { ID } from '@/data/types/Basic';
import { HeaderMobileToggleButton } from '@/components/content/Header/parts/MobileToggleButton';
import { HeaderMobileDrawer } from '@/components/content/Header/parts/MobileDrawer';
import { HeaderSearch } from '@/components/content/Header/parts/Search';
import { HeaderLocateStore } from '@/components/content/Header/parts/LocateStore';
import { HeaderMiniCart } from '@/components/content/Header/parts/MiniCart';
import { HeaderAccount } from '@/components/content/Header/parts/Account';
import { HeaderLanguage } from '@/components/content/Header/parts/Language';
import { ContentRecommendation } from '@/components/content/ContentRecommendation';
import { useHeader } from '@/data/Content/Header';

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
						<HeaderMiniCart mobileBreakpoint="md" />
						<HeaderAccount mobileBreakpoint="md" />
						<HeaderLanguage />
					</Stack>
				</Stack>
			</Container>
			<HeaderSearch mobile={true} />
			<HeaderNavBar />
		</Paper>
	);
};
