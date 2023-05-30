/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ProductCard } from '@/components/blocks/ProductCard';
import { useCatalogEntryList } from '@/data/Content/CatalogEntryList';
import { ContentContext } from '@/data/context/content';
import { Grid } from '@mui/material';
import { FC, useContext, useEffect } from 'react';
import { useNextRouter } from '@/data/Content/_NextRouter';

export const CatalogEntryListProductGrid: FC = () => {
	const { products } = useContext(ContentContext) as ReturnType<typeof useCatalogEntryList>;
	const router = useNextRouter();
	useEffect(() => {
		const { searchTerm } = router.query;
		if (searchTerm && products.length === 1) {
			const product = products[0];
			router.push({ pathname: product?.seo?.href }, undefined, {
				shallow: true,
			});
		}
	}, [products, router]);
	return (
		<Grid container>
			<Grid container item spacing={2} alignItems="stretch">
				{products?.map((product) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={product.id} display="flex">
						<ProductCard product={product} />
					</Grid>
				))}
			</Grid>
		</Grid>
	);
};
