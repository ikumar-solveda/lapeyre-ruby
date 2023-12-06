/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ItemWrap } from '@/components/layouts/ItemWrap';
import { LayoutSlot } from '@/components/layouts/LayoutSlot';
import { layoutMainSX } from '@/components/layouts/styles/main';
import { Layout } from '@/data/types/Layout';
import { Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC } from 'react';

export const TripleStack: FC<{ layout: Layout }> = ({ layout }) => {
	const {
		dimensions: { contentSpacing },
	} = useTheme();
	return layout ? (
		<>
			<LayoutSlot slot={layout.slots.header} />
			<Stack
				component="main"
				gap={contentSpacing}
				alignItems="center"
				sx={layoutMainSX(layout.slots.first?.length || 0)}
			>
				<LayoutSlot slot={layout.slots.first} ItemWrap={ItemWrap} />
				<LayoutSlot slot={layout.slots.second} ItemWrap={ItemWrap} />
				<LayoutSlot slot={layout.slots.third} ItemWrap={ItemWrap} />
				<LayoutSlot slot={layout.slots.footer} />
			</Stack>
		</>
	) : null;
};
