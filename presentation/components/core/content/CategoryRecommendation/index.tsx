/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Category } from '@/components/content/Category';
import { useCategoryRecommendation } from '@/data/Content/CategoryRecommendation';
import { ID } from '@/data/types/Basic';
import { WidgetProperties } from '@/data/types/Slot';
import { Grid } from '@mui/material';
import { FC } from 'react';

const emptyProperties = {} as WidgetProperties;

export const CategoryRecommendation: FC<{ id: ID; properties?: WidgetProperties }> = ({
	id: _id,
	properties = emptyProperties,
}) => {
	const { emsName = '' } = properties;
	const { categories, clickAction, loading } = useCategoryRecommendation(emsName);
	return (
		<Grid container spacing={2}>
			{loading
				? 'Loading...'
				: categories.map(({ id }) => (
						<Grid
							key={id}
							item
							xs={12}
							md={6}
							id={`categoryRecommendation_div_2_${id}`}
							data-testid={`categoryRecommendation_div_2_${id}`}
						>
							<Category id={id} clickAction={clickAction(id)} />
						</Grid>
				  ))}
		</Grid>
	);
};
