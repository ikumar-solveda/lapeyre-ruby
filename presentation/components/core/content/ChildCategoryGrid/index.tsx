/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ID } from '@/data/types/Basic';
import { useChildCategoryGrid } from '@/data/Content/ChildCategoryGrid';
import { FC } from 'react';
import { Category } from '@/components/content/Category';
import { Grid, Typography } from '@mui/material';

export const ChildCategoryGrid: FC<{ id: ID }> = ({ id }) => {
	const { categories, categoryTitle, loading } = useChildCategoryGrid(id);

	return categories?.length ? (
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
