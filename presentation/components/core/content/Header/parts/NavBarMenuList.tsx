/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { LinkWrap } from '@/components/blocks/Linkable';
import { headerNavBarDropMenuItemSX } from '@/components/content/Header/styles/navBar/dropMenuItem';
import { PageLink } from '@/data/Navigation';
import { Box, MenuItem, MenuList, Stack } from '@mui/material';
import { FC, useMemo } from 'react';

type JSXChildren = JSX.Element[] | JSX.Element;
const MAX_LEVELS = 3;

export const HeaderNavBarMenuList: FC<{
	tree?: PageLink[];
	display?: 'vertical' | 'horizontal';
	level?: number;
}> = ({ tree, display = 'horizontal', level = 1 }) => {
	const Element = useMemo(
		() =>
			level < MAX_LEVELS && tree?.find(({ children }) => children.length > 0)
				? (props: { children: JSXChildren }) => (
						<Stack
							direction={display === 'horizontal' ? 'row' : 'column'}
							spacing={display === 'horizontal' ? 2 : ''}
							{...props}
						/>
				  )
				: (props: { children: JSXChildren }) => <MenuList {...props} />,
		[display, tree, level]
	);
	const anyParents = level < MAX_LEVELS && !!tree?.some(({ children }) => children.length > 0);
	return level <= MAX_LEVELS && tree?.length ? (
		<Element>
			{tree.map(({ label, url, children }) => (
				<Box key={`${label}${url}`}>
					<LinkWrap href={url}>
						<MenuItem
							component="a"
							sx={headerNavBarDropMenuItemSX({ isParent: anyParents })}
							data-testid={`header-link-${label}`}
							id={`header-link-${label}`}
						>
							{label}
						</MenuItem>
					</LinkWrap>
					<HeaderNavBarMenuList tree={children} display={display} level={level + 1} />
				</Box>
			))}
		</Element>
	) : null;
};
