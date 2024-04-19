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
import { Grid, Typography } from '@mui/material';
import { FC, useContext, useEffect } from 'react';

export const CatalogEntryListProductGrid: FC = () => {
	const { products, loading, clickActionGenerator, categoryId, params, productListData } =
		useContext(ContentContext) as ReturnType<typeof useCatalogEntryList> & GTMContainerListType;
	const router = useNextRouter();
	const { onSearchResultsView, onItemListView } = useContext(EventsContext);
	const { settings } = useSettings();
	const { noProductsFoundForFilter, searchAgain } = useLocalization('ProductGrid').Labels;
	const { searchTerm, facet, minPrice } = router.query;

	useEffect(() => {
		if (products && !loading) {
			const term = Array.isArray(searchTerm) ? searchTerm.join(' ') : (searchTerm as string);
			if (searchTerm) {
				onSearchResultsView({
					gtm: { searchTerm: term, numberOfResults: products.length, settings },
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
					},
					marketing: { categoryId, settings, params },
				});
			}
		}
		if (searchTerm && products.length === 1 && facet === undefined && minPrice === undefined) {
			const product = products[0];
			router.push({ pathname: product?.seo?.href }, undefined, { shallow: true });
		}
	}, [products, onSearchResultsView, onItemListView]); // eslint-disable-line react-hooks/exhaustive-deps

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
					<Grid item xs={12} sm={6} md={4} lg={3} key={product.id} display="flex">
						<ProductCard product={product} clickAction={clickActionGenerator(product)} />
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
