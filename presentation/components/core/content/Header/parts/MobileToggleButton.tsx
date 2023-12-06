/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC } from 'react';

export const HeaderMobileToggleButton: FC<{
	toggleDrawer: (open?: boolean) => () => void;
	open: boolean;
}> = ({ toggleDrawer }) => {
	const theme = useTheme();
	const show = useMediaQuery(theme.breakpoints.down('md'));
	return show ? (
		<IconButton color="inherit" aria-label="open drawer" onClick={toggleDrawer()} edge="start">
			<MenuIcon />
		</IconButton>
	) : null;
};
