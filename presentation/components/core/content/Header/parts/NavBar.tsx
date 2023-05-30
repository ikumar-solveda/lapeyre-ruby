/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { HeaderNavBarDropMenu } from '@/components/content/Header/parts/NavBarDropMenu';
import { headerNavBarContainerSX } from '@/components/content/Header/styles/navBar/container';
import { LinkWrap } from '@/components/blocks/Linkable';
import { useNavigation } from '@/data/Navigation';
import { Container, Paper, Stack } from '@mui/material';
import React, { FC } from 'react';

export const HeaderNavBar: FC = () => {
	const { navigation } = useNavigation();
	return (
		<Paper sx={headerNavBarContainerSX}>
			<Container>
				<Stack direction="row" spacing={2}>
					{navigation?.map(({ label, url, children }) => (
						<LinkWrap href={url} key={`${label}${url}`}>
							<HeaderNavBarDropMenu tree={children} label={label} />
						</LinkWrap>
					))}
				</Stack>
			</Container>
		</Paper>
	);
};
