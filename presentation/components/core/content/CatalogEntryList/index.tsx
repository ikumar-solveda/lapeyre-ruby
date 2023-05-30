/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { CatalogEntryListFacetChips } from '@/components/content/CatalogEntryList/parts/FacetChips';
import { useCatalogEntryList } from '@/data/Content/CatalogEntryList';
import { ID } from '@/data/types/Basic';
import { Box, Stack } from '@mui/material';
import { FC } from 'react';
import { ContentProvider } from '@/data/context/content';
import { CatalogEntryListResultsHeader } from '@/components/content/CatalogEntryList/parts/ResultsHeader';
import { CatalogEntryListSort } from '@/components/content/CatalogEntryList/parts/Sort';
import { CatalogEntryListProductGrid } from '@/components/content/CatalogEntryList/parts/ProductGrid';
import { CatalogEntryListPagination } from '@/components/content/CatalogEntryList/parts/Pagination';
import { useCompareCollector } from '@/data/Content/CompareCollector';
import { catalogEntryListContainerSX } from '@/components/content/CatalogEntryList/styles/container';
import { CatalogEntryListCompareCollector } from '@/components/content/CatalogEntryList/parts/Compare/Collector';

export const CatalogEntryList: FC<{ id: ID }> = ({ id }) => {
	const catalogEntryList = useCatalogEntryList(id);
	const compare = useCompareCollector();
	const { compareEnabled, compareState } = compare;
	return (
		<ContentProvider value={{ ...catalogEntryList, ...compare }}>
			<Stack spacing={2} sx={catalogEntryListContainerSX}>
				<Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
					<Box>
						<CatalogEntryListResultsHeader />
					</Box>
					<CatalogEntryListSort />
				</Stack>
				<CatalogEntryListFacetChips />
				<CatalogEntryListProductGrid />
				<CatalogEntryListPagination />
			</Stack>
			{compareEnabled && compareState.len > 0 ? <CatalogEntryListCompareCollector /> : null}
		</ContentProvider>
	);
};
