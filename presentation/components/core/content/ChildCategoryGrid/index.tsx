/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ID } from '@/data/types/Basic';
import { useChildCategoryGrid } from '@/data/Content/ChildCategoryGrid';
import { FC } from 'react';
import { Category } from '@/components/content/Category';
import { Grid, Typography } from '@mui/material';
import { useLocalization } from '@/data/Localization';
import { NotAvailable } from '@/components/blocks/NotAvailable';

export const ChildCategoryGrid: FC<{ id: ID }> = ({ id }) => {
	const { root, categories, categoryTitle, loading } = useChildCategoryGrid(id);
	const { notAvailable } = useLocalization('Category');

	return !loading && !root ? (
		<NotAvailable message={notAvailable.t()} />
	) : categories?.length ? (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography variant="h3">{categoryTitle}</Typography>
			</Grid>
			{loading
				? 'Loading...'
				: categories.map(({ uniqueID: catId }) => (
						<Grid
							key={catId}
							item
							xs={12}
							md={6}
							id={`categoryRecommendation_div_2_${catId}`}
							data-testid={`categoryRecommendation_div_2_${catId}`}
						>
							<Category id={catId} />
						</Grid>
				  ))}
		</Grid>
	) : null;
};
