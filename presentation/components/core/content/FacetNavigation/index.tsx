/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { Sidebar } from '@/components/blocks/SideBar';
import { FacetNavigationItemChange } from '@/components/content/FacetNavigation/parts/ItemChange';
import { FacetNavigationPriceChange } from '@/components/content/FacetNavigation/parts/PriceChange';
import { useFacetNavigation } from '@/data/Content/FacetNavigation';
import { useLocalization } from '@/data/Localization';
import { ContentProvider } from '@/data/context/content';
import { ID } from '@/data/types/Basic';
import { Breakpoint } from '@mui/material';
import { isEmpty } from 'lodash';
import { FC, useMemo } from 'react';

const mobileBreakpoint: Breakpoint = 'md';

export const FacetNavigation: FC<{ id: ID }> = ({ id }) => {
	const facetNavigation = useFacetNavigation(id);
	const { Labels } = useLocalization('ProductFilter');
	const { available, loading, filteredParams, facets, facetFilters } = facetNavigation;
	const { searchTerm } = filteredParams;
	const showFilter = useMemo(
		() => facets.length || !isEmpty(facetFilters) || (available && !searchTerm),
		[facets, facetFilters, available, searchTerm]
	);

	return loading ? (
		<ProgressIndicator />
	) : available || searchTerm ? (
		<ContentProvider value={facetNavigation}>
			<Sidebar
				title={showFilter ? Labels.filterBy.t() : Labels.noFilters.t()}
				mobileBreakpoint={mobileBreakpoint}
				scrollable={true}
			>
				<FacetNavigationPriceChange />
				<FacetNavigationItemChange />
			</Sidebar>
		</ContentProvider>
	) : null;
};
