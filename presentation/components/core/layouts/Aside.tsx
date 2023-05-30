/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ItemWrap } from '@/components/layouts/ItemWrap';
import { LayoutSlot } from '@/components/layouts/LayoutSlot';
import { layoutMainSX } from '@/components/layouts/styles/main';
import { Layout } from '@/data/types/Layout';
import { Container, Grid, Stack, useTheme } from '@mui/material';
import { FC } from 'react';

export const Aside: FC<{ layout: Layout }> = ({ layout }) => {
	const {
		dimensions: { contentSpacing },
	} = useTheme();
	return layout ? (
		<>
			<LayoutSlot slot={layout.slots.header} />
			<Stack
				component="main"
				gap={contentSpacing}
				sx={layoutMainSX(layout.slots.first?.length || 0)}
			>
				<LayoutSlot slot={layout.slots.first} ItemWrap={ItemWrap} />
				<Container component="section">
					<Grid container spacing={contentSpacing}>
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
						<Grid item component="section" xs={12} md={9}>
							<Stack gap={contentSpacing}>
								<LayoutSlot slot={layout.slots.second} />
							</Stack>
						</Grid>
					</Grid>
				</Container>
				<LayoutSlot slot={layout.slots.footer} />
			</Stack>
		</>
	) : null;
};
