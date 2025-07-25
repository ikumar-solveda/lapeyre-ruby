/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { LinkWrap } from '@/components/blocks/Linkable';
import { headerNavBarDropMenuItemSX } from '@/components/content/Header/styles/navBar/dropMenuItem';
import { COOKIES } from '@/data/constants/cookie';
import { CookiesSingletonContext } from '@/data/cookie/cookiesSingletonProvider';
import type { PageLink } from '@/data/Navigation';
import { getHref_Breadcrumb } from '@/utils/getHref_Breadcrumb';
import { Box, MenuItem, MenuList, Stack } from '@mui/material';
import { type FC, type MouseEvent, useCallback, useContext, useMemo } from 'react';

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
	const { setSessionCookie } = useContext(CookiesSingletonContext);
	const onClick = useCallback(
		(trail?: string[]) => (_: MouseEvent<HTMLAnchorElement>) =>
			setSessionCookie(COOKIES.breadcrumb, trail?.length ? JSON.stringify(trail) : undefined),
		[setSessionCookie]
	);
	return level <= MAX_LEVELS && tree?.length ? (
		<Element>
			{tree.map(({ label, url, children, trail }) => (
				<Box key={`${label}${url}`}>
					<LinkWrap href={getHref_Breadcrumb(url, trail)}>
						<MenuItem
							component="a"
							sx={headerNavBarDropMenuItemSX({ isParent: anyParents })}
							data-testid={`header-link-${level}-${label}`}
							/** a link can exist as a child in all categories menu and
							 * the other departments menu, so we need to differentiate them with level.
							 * Also, some categories has same label and different URL, to have uniqueID, we need
							 * to use URL as part the ID.
							 */
							id={`header-link-level${level}-${url?.replace('/', '')}`}
							onClick={onClick(trail)}
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
