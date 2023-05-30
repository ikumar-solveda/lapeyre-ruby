/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { CollapsibleMenuList } from '@/components/content/Header/parts/CollapsibleMenuList';
import { headerMobileDrawerSX } from '@/components/content/Header/styles/mobileDrawer';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useNavigation } from '@/data/Navigation';
import { Box, Drawer, Stack } from '@mui/material';
import { FC, useEffect } from 'react';

export const HeaderMobileDrawer: FC<{
	toggleDrawer: any;
	open: boolean;
}> = ({ toggleDrawer, open }) => {
	const { navigation } = useNavigation();
	const router = useNextRouter();
	useEffect(() => {
		if (!router.asPath) return;
		toggleDrawer(false)();
	}, [router.asPath, toggleDrawer]);
	return (
		<Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
			<Box sx={headerMobileDrawerSX} role="presentation">
				<Stack direction="column">
					<CollapsibleMenuList tree={navigation?.filter(({ url }) => !!url)} />
				</Stack>
			</Box>
		</Drawer>
	);
};
