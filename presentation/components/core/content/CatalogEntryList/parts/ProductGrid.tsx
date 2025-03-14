/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ProductCard } from '@/components/blocks/ProductCard';
import { useCatalogEntryList } from '@/data/Content/CatalogEntryList';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { ContentContext } from '@/data/context/content';
import { EventsContext } from '@/data/context/events';
import { GTMContainerListType } from '@/data/types/GTM';
import { getHref_Product } from '@/utils/getHref_Product';
import { stripBreadcrumbQuery } from '@/utils/stripBreadcrumbQuery';
import { Grid, Typography } from '@mui/material';
import { FC, useContext, useEffect, useMemo } from 'react';

export const CatalogEntryListProductGrid: FC = () => {
	const {
		products,
		loading,
		clickActionGenerator,
		categoryId,
		params,
		productListData,
		breadCrumbTrailEntryView: parentCrumb,
		total,
	} = useContext(ContentContext) as ReturnType<typeof useCatalogEntryList> & GTMContainerListType;
	const router = useNextRouter();
	const { onSearchResultsView, onItemListView } = useContext(EventsContext);
	const { settings } = useSettings();
	const { noProductsFoundForFilter, searchAgain } = useLocalization('ProductGrid').Labels;
	const { searchTerm, facet, minPrice, trail } = router.query;
	const { routeUrl, asUrl } = useMemo(() => {
		const routeUrl = getHref_Product(products[0], parentCrumb, trail as string[]);
		const asUrl = stripBreadcrumbQuery(routeUrl);
		return { routeUrl, asUrl };
	}, [parentCrumb, products, trail]);
	const filterKey = useMemo(() => (Array.isArray(facet) ? facet.join('-') : facet), [facet]);
	const { pageNumber } = useContext(ContentContext) as ReturnType<typeof useCatalogEntryList>;

	useEffect(() => {
		if (products && !loading) {
			const term = Array.isArray(searchTerm) ? searchTerm.join(' ') : (searchTerm as string);
			if (searchTerm) {
				onSearchResultsView({
					gtm: {
						searchTerm: term,
						numberOfResults: products.length,
						settings,
						pageNumber,
						products,
					},
					marketing: { searchTerm: term, settings, params },
				});
			} else {
				onItemListView({
					gtm: {
						products,
						listPageName: productListData?.listName ?? '',
						listId: productListData?.listId,
						storeName: settings.storeName,
						settings,
						pageNumber,
					},
					marketing: { categoryId, settings, params },
				});
			}
		}
		if (searchTerm && total === 1 && facet === undefined && minPrice === undefined) {
			router.replace(routeUrl, asUrl, { shallow: true });
		}
	}, [products, onSearchResultsView, onItemListView, routeUrl, total]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Grid container>
			<Grid
				container
				item
				spacing={2}
				alignItems="stretch"
				id="catalog-entry-list-product-grid"
				data-testid="catalog-entry-list-product-grid"
			>
				{products?.map((product) => (
					<Grid
						item
						xs={12}
						sm={6}
						md={4}
						// key has to comprise a unique value from response (thumbnail is good enough, but we keep id as well)
						//   and a unique value from any filters (facets) currently applied
						key={`${product.id}-${product.thumbnail}-${filterKey}`}
						display="flex"
					>
						<ProductCard
							parentCrumb={parentCrumb}
							product={product}
							clickAction={clickActionGenerator(product)}
							showInventory={true}
						/>
					</Grid>
				))}
				{!products.length ? (
					<Grid item>
						<Typography>
							{searchTerm
								? searchAgain.t({ searchTerm: decodeURIComponent(searchTerm as string) })
								: noProductsFoundForFilter.t()}
						</Typography>
					</Grid>
				) : null}
			</Grid>
		</Grid>
	);
};
