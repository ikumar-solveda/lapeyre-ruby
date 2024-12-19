/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { HeaderNavBarMenuList } from '@/components/content/Header/parts/NavBarMenuList';
import { headerNavBarDropMenuSX } from '@/components/content/Header/styles/navBar/dropMenu';
import { headerNavBarItemSX } from '@/components/content/Header/styles/navBar/item';
import { headerNavBarItemTouchDropButtonSX } from '@/components/content/Header/styles/navBar/itemTouchDropButton';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { PageLink } from '@/data/Navigation';
import { Switch } from '@/utils/switch';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, ClickAwayListener, Stack, Tooltip } from '@mui/material';
import React, { MouseEvent, useCallback, useEffect, useMemo } from 'react';

type Props = {
	tree: PageLink[];
	label: string;
	onClick?: (event: MouseEvent) => void;
	ssr?: boolean;
};
const SSR_CATEGORY_POPPER_PROPS = { keepMounted: true, disablePortal: true };

export const HeaderNavBarDropMenu = React.forwardRef(
	({ tree, label, ssr, ...props }: Props, ref: React.Ref<HTMLAnchorElement> | null) => {
		const router = useNextRouter();
		const [open, setOpen] = React.useState(false);
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
		const popperProps = useMemo(() => (ssr ? SSR_CATEGORY_POPPER_PROPS : undefined), [ssr]);

		useEffect(() => {
			if (!router.asPath) return;
			handleToolTip('close')();
		}, [handleToolTip, router.asPath]);
		return (
			<ClickAwayListener onClickAway={handleToolTip('close')}>
				<Stack onMouseLeave={handleToolTip('close')}>
					<Tooltip
						placement="bottom-start"
						open={open}
						onClose={handleToolTip('close')}
						disableFocusListener
						disableHoverListener
						disableTouchListener
						PopperProps={popperProps}
						componentsProps={{
							tooltip: {
								sx: headerNavBarDropMenuSX,
							},
						}}
						title={
							tree && tree.length > 0 ? (
								<Stack direction="row">
									<HeaderNavBarMenuList tree={tree} level={1} />
								</Stack>
							) : null
						}
					>
						<Box onMouseEnter={handleToolTip('open')} onTouchStart={handleToolTip('close')}>
							<Button component="a" ref={ref} {...props} sx={headerNavBarItemSX}>
								{label}
							</Button>
						</Box>
					</Tooltip>
					<Button title="+" sx={headerNavBarItemTouchDropButtonSX} onClick={handleToolTip()}>
						<ExpandMoreIcon />
					</Button>
				</Stack>
			</ClickAwayListener>
		);
	}
);
