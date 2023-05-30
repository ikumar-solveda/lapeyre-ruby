/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ItemWrap } from '@/components/layouts/ItemWrap';
import { LayoutSlot } from '@/components/layouts/LayoutSlot';
import { layoutGridHeightSX } from '@/components/layouts/styles/gridHeight';
import { layoutMainSX } from '@/components/layouts/styles/main';
import { layoutStackHeightSX } from '@/components/layouts/styles/stackHeight';
import { Layout } from '@/data/types/Layout';
import { Container, Grid, Stack, useTheme } from '@mui/material';
import { FC } from 'react';

export const AsideExtendedPlp: FC<{ layout: Layout }> = ({ layout }) => {
	const {
		dimensions: { contentSpacing },
	} = useTheme();
	return layout ? (
		<>
			<LayoutSlot slot={layout.slots.header} />
			<Grid
				container
				direction="column"
				component="main"
				spacing={contentSpacing}
				sx={layoutMainSX(layout.slots.first?.length || 0)}
			>
				<Grid item xs="auto">
					<LayoutSlot slot={layout.slots.first} ItemWrap={ItemWrap} />
				</Grid>
				<Grid item xs>
					<Container component="section" sx={layoutStackHeightSX}>
						<Grid container spacing={contentSpacing} sx={layoutStackHeightSX}>
							<Grid
								item
								component="aside"
								xs={12}
								md={3}
								aria-label={layout.slots.aside?.at(0)?.name}
							>
								<Stack gap={contentSpacing}>
									<LayoutSlot slot={layout.slots.aside} />
								</Stack>
							</Grid>
							<Grid item component="section" xs={12} md={9} sx={layoutGridHeightSX}>
								<Stack gap={contentSpacing} sx={layoutStackHeightSX}>
									<LayoutSlot slot={layout.slots.second} />
								</Stack>
							</Grid>
						</Grid>
					</Container>
				</Grid>
				<Grid item xs="auto">
					<LayoutSlot slot={layout.slots.footer} />
				</Grid>
			</Grid>
		</>
	) : null;
};
