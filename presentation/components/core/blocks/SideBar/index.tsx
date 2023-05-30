/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import {
	AppBar,
	Breakpoint,
	Drawer,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { FC, PropsWithChildren, useCallback, useState } from 'react';
import { sidebarAppBarContainerSX } from '@/components/blocks/SideBar/styles/appBar/container';
import { SidebarContent } from '@/components/blocks/SideBar/parts/Content';
import { sidebarAppBarContentSX } from '@/components/blocks/SideBar/styles/appBar/content';

type Props = {
	title: string;
	href?: string;
	mobileBreakpoint: Breakpoint;
	scrollable?: boolean;
};

export const Sidebar: FC<PropsWithChildren<Props>> = ({
	title,
	href,
	mobileBreakpoint = 'sm',
	scrollable = false,
	children,
}) => {
	const theme = useTheme();
	const [open, setOpen] = useState<boolean>(false);
	const isMobile = useMediaQuery(theme.breakpoints.down(mobileBreakpoint));
	const toggleOpen = useCallback(() => {
		if (isMobile) setOpen(!open);
	}, [open, isMobile]);

	return isMobile ? (
		<>
			<AppBar position="fixed" sx={sidebarAppBarContainerSX} onClick={toggleOpen}>
				<Stack direction="row" alignItems="center" spacing={0.5}>
					<ExpandLessIcon />
					<Typography variant="body2" sx={sidebarAppBarContentSX}>
						{title}
					</Typography>
				</Stack>
			</AppBar>
			<Drawer anchor="bottom" open={open}>
				<SidebarContent {...{ children, href, isMobile, scrollable, title, toggleOpen }} />
			</Drawer>
		</>
	) : (
		<SidebarContent {...{ children, href, isMobile, scrollable, title, toggleOpen }} />
	);
};
