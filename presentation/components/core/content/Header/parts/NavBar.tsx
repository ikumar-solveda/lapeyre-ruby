/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { LinkWrap } from '@/components/blocks/Linkable';
import { HeaderNavBarDropMenu } from '@/components/content/Header/parts/NavBarDropMenu';
import { headerNavBarContainerSX } from '@/components/content/Header/styles/navBar/container';
import { COOKIES } from '@/data/constants/cookie';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { useFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature';
import { CookiesSingletonContext } from '@/data/cookie/cookiesSingletonProvider';
import { useNavigation } from '@/data/Navigation';
import { Container, Paper, Stack } from '@mui/material';
import { type FC, type MouseEvent, useCallback, useContext } from 'react';

export const HeaderNavBar: FC = () => {
	const { navigation } = useNavigation();
	const { setSessionCookie } = useContext(CookiesSingletonContext);
	const onClick = useCallback(
		(_: MouseEvent) => setSessionCookie(COOKIES.breadcrumb),
		[setSessionCookie]
	);
	const { data } = useFlexFlowStoreFeature({ id: EMS_STORE_FEATURE.HIDDEN_DOM_SSR });
	return (
		<Paper sx={headerNavBarContainerSX}>
			<Container>
				<Stack direction="row" spacing={2}>
					{navigation.map(({ label, url, children }) => (
						<LinkWrap href={url} key={`${label}${url}`}>
							<HeaderNavBarDropMenu
								tree={children}
								label={label}
								data-testid={`menu-item-${label}`}
								onClick={onClick}
								ssr={data.featureEnabled}
							/>
						</LinkWrap>
					))}
				</Stack>
			</Container>
		</Paper>
	);
};
