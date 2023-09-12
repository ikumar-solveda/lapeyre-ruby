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
import { Grid, Typography } from '@mui/material';
import { FC, useContext, useEffect } from 'react';

export const CatalogEntryListProductGrid: FC = () => {
	const { products, loading } = useContext(ContentContext) as ReturnType<
		typeof useCatalogEntryList
	>;
	const router = useNextRouter();
	const { onSearchResultsView, onItemListView } = useContext(EventsContext);
	const { settings } = useSettings();
	const {
		Labels: { gtmSearchResults, gtmItemList, noProductsFoundForFilter, searchAgain },
	} = useLocalization('ProductGrid');
	const { searchTerm, facet, minPrice } = router.query;

	useEffect(() => {
		if (products && !loading) {
			const term = Array.isArray(searchTerm) ? searchTerm.join(' ') : (searchTerm as string);
			const listPageName = searchTerm ? gtmSearchResults.t({ term }) : gtmItemList.t();
			onItemListView({ gtm: { products, listPageName, storeName: settings.storeName, settings } });
			if (searchTerm) {
				onSearchResultsView({
					gtm: { searchTerm: term, numberOfResults: products.length, settings },
				});
			}
		}
		if (searchTerm && products.length === 1 && facet === undefined && minPrice === undefined) {
			const product = products[0];
			router.push({ pathname: product?.seo?.href }, undefined, { shallow: true });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [products]);

	return (
		<Grid container>
			<Grid container item spacing={2} alignItems="stretch">
				{products?.map((product) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={product.id} display="flex">
						<ProductCard product={product} />
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
