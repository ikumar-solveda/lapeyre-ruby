/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { LinkWrap } from '@/components/blocks/Linkable';
import { HeaderNavBarDropMenu } from '@/components/content/Header/parts/NavBarDropMenu';
import { headerNavBarContainerSX } from '@/components/content/Header/styles/navBar/container';
import { BC_COOKIE, HC_PREFIX } from '@/data/constants/cookie';
import { useCookieState } from '@/data/cookie/useCookieState';
import { useNavigation } from '@/data/Navigation';
import { Container, Paper, Stack } from '@mui/material';
import { FC, MouseEvent, useCallback } from 'react';

export const HeaderNavBar: FC = () => {
	const { navigation } = useNavigation();
	const [_, setTrail] = useCookieState(BC_COOKIE, true, HC_PREFIX);
	const onClick = useCallback((_: MouseEvent) => setTrail(undefined), [setTrail]);

	return (
		<Paper sx={headerNavBarContainerSX}>
			<Container>
				<Stack direction="row" spacing={2}>
					{navigation?.map(({ label, url, children }) => (
						<LinkWrap href={url} key={`${label}${url}`}>
							<HeaderNavBarDropMenu
								tree={children}
								label={label}
								data-testid={`menu-item-${label}`}
								onClick={onClick}
							/>
						</LinkWrap>
					))}
				</Stack>
			</Container>
		</Paper>
	);
};
