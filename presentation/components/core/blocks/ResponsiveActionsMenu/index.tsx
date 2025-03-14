/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { MoreVertOutlined } from '@mui/icons-material';
import { IconButton, Menu, PopoverOrigin } from '@mui/material';
import { FC, MouseEvent, PropsWithChildren, useEffect } from 'react';

type Props = {
	onOpen: (e: MouseEvent<HTMLButtonElement>) => void;
	onClose: () => void;
	anchor: HTMLElement | null;
	label: string;
	id: string;
};

const RESPONSIVE_ACTIONS_MENU: Record<string, PopoverOrigin> = {
	anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
	transformOrigin: { vertical: 'top', horizontal: 'right' },
};

export const ResponsiveActionsMenu: FC<PropsWithChildren<Props>> = ({
	children,
	onClose,
	anchor,
	onOpen,
	label,
	id,
}) => {
	useEffect(() => {
		window.addEventListener('resize', onClose);
		return () => window.removeEventListener('resize', onClose);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<IconButton
				data-testid={`${id}-actions-icon`}
				id={`${id}-actions-icon`}
				onClick={onOpen}
				aria-label={label}
			>
				<MoreVertOutlined />
			</IconButton>
			<Menu
				id={`${id}-actions-menu`}
				data-testid={`${id}-actions-menu`}
				anchorEl={anchor}
				open={!!anchor}
				onClose={onClose}
				anchorOrigin={RESPONSIVE_ACTIONS_MENU.anchorOrigin}
				transformOrigin={RESPONSIVE_ACTIONS_MENU.transformOrigin}
				MenuListProps={{ 'aria-labelledby': `${id}-actions-icon` }}
			>
				{children}
			</Menu>
		</>
	);
};
