/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Sidebar } from '@/components/blocks/SideBar';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { useFacetNavigation } from '@/data/Content/FacetNavigation';
import { useLocalization } from '@/data/Localization';
import { ID } from '@/data/types/Basic';
import { Breakpoint } from '@mui/material';
import { FC } from 'react';
import { FacetNavigationPriceChange } from '@/components/content/FacetNavigation/parts/PriceChange';
import { FacetNavigationItemChange } from '@/components/content/FacetNavigation/parts/ItemChange';
import { ContentProvider } from '@/data/context/content';

const mobileBreakpoint: Breakpoint = 'md';

export const FacetNavigation: FC<{ id: ID }> = ({ id }) => {
	const facetNavigation = useFacetNavigation(id);
	const productFilterNLS = useLocalization('ProductFilter');
	const { loading } = facetNavigation;

	return loading ? (
		<ProgressIndicator />
	) : (
		<ContentProvider value={facetNavigation}>
			<Sidebar
				title={productFilterNLS.Labels.filterBy.t()}
				mobileBreakpoint={mobileBreakpoint}
				scrollable={true}
			>
				<FacetNavigationPriceChange />
				<FacetNavigationItemChange />
			</Sidebar>
		</ContentProvider>
	);
};
