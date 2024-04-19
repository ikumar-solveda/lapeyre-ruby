/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { NotAvailable } from '@/components/blocks/NotAvailable';
import { Category } from '@/components/content/Category';
import { useChildCategoryGrid } from '@/data/Content/ChildCategoryGrid';
import { useLocalization } from '@/data/Localization';
import { EventsContext } from '@/data/context/events';
import { ID } from '@/data/types/Basic';
import { Grid, Typography } from '@mui/material';
import { FC, useContext, useEffect } from 'react';

export const ChildCategoryGrid: FC<{ id: ID }> = ({ id }) => {
	const { root, categories, categoryTitle, loading, settings, params } = useChildCategoryGrid(id);
	const { notAvailable } = useLocalization('Category');
	const { onCategoryView } = useContext(EventsContext);

	useEffect(() => {
		onCategoryView({
			marketing: { categoryId: id.toString(), settings, params },
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return !loading && !root ? (
		<NotAvailable message={notAvailable.t()} />
	) : categories?.length ? (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography variant="h3AsH1">{categoryTitle}</Typography>
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
