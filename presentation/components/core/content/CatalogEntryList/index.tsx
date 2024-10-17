/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { NotAvailable } from '@/components/blocks/NotAvailable';
import { CatalogEntryListCompareCollector } from '@/components/content/CatalogEntryList/parts/Compare/Collector';
import { CatalogEntryListFacetChips } from '@/components/content/CatalogEntryList/parts/FacetChips';
import { CatalogEntryListPagination } from '@/components/content/CatalogEntryList/parts/Pagination';
import { CatalogEntryListProductGrid } from '@/components/content/CatalogEntryList/parts/ProductGrid';
import { CatalogEntryListResultsHeader } from '@/components/content/CatalogEntryList/parts/ResultsHeader';
import { CatalogEntryListSort } from '@/components/content/CatalogEntryList/parts/Sort';
import { catalogEntryListContainerSX } from '@/components/content/CatalogEntryList/styles/container';
import { StoreInventory } from '@/components/content/StoreInventory';
import { useCatalogEntryList } from '@/data/Content/CatalogEntryList';
import { useCompareCollectorV2 } from '@/data/Content/CompareCollectorV2';
import { useLocalization } from '@/data/Localization';
import { ITEM_LIST_IDS } from '@/data/constants/gtm';
import { ContentProvider } from '@/data/context/content';
import { ID } from '@/data/types/Basic';
import { GTMContainerListType } from '@/data/types/GTM';
import { Box, Stack } from '@mui/material';
import { FC, useMemo } from 'react';

export const CatalogEntryList: FC<{ id: ID }> = ({ id }) => {
	const catalogEntryList = useCatalogEntryList(id);
	const { entitled, loading, filteredParams, activeSKUPartNumber } = catalogEntryList;
	const { searchTerm } = filteredParams;
	const compare = useCompareCollectorV2(id);
	const { compareEnabled, compareState } = compare;
	const { notAvailable } = useLocalization('Category');
	const { gtmItemList } = useLocalization('ProductGrid').Labels;
	const listData = useMemo(
		() =>
			!searchTerm
				? ({
						productListData: { listId: ITEM_LIST_IDS.ITEM_LIST, listName: gtmItemList.t() },
				  } as GTMContainerListType)
				: undefined,
		[gtmItemList, searchTerm]
	);

	const contextValue = useMemo(
		() => ({ ...catalogEntryList, ...compare, ...listData }),
		[catalogEntryList, compare, listData]
	);

	return !loading && !entitled && !searchTerm ? (
		<NotAvailable message={notAvailable.t()} />
	) : (
		<ContentProvider value={contextValue}>
			<Stack
				spacing={2}
				sx={catalogEntryListContainerSX}
				id="catalog-entry-list-product-container"
				data-testid="catalog-entry-list-product-container"
			>
				<Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
					<Box>
						<CatalogEntryListResultsHeader />
					</Box>
					<CatalogEntryListSort />
				</Stack>
				<CatalogEntryListFacetChips />
				<CatalogEntryListProductGrid />
				<CatalogEntryListPagination />
				<StoreInventory partNumber={activeSKUPartNumber as string} />
			</Stack>
			{compareEnabled && compareState.len > 0 ? <CatalogEntryListCompareCollector /> : null}
		</ContentProvider>
	);
};
