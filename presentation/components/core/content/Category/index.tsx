/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { categoryContainerSX } from '@/components/content/Category/styles/container';
import { categoryHeadingSX } from '@/components/content/Category/styles/heading';
import { categorySubHeadingSX } from '@/components/content/Category/styles/subHeading';
import { Linkable } from '@/components/blocks/Linkable';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { useCategory } from '@/data/Content/Category';
import { ID } from '@/data/types/Basic';
import { Grid, Paper, Typography } from '@mui/material';
import { FC } from 'react';
import { Img } from '@/components/blocks/MaterialImage';
import { categoryImageSX } from '@/components/content/Category/styles/image';

export const Category: FC<{
	id: ID;
	clickAction?: () => void;
}> = ({ id, clickAction }) => {
	const { category, loading } = useCategory(id);
	return loading ? (
		<ProgressIndicator />
	) : category ? (
		// TODO Hoist href to top level category object, presentation shouldn't have to handle this structure.
		<Linkable href={category.seo.href || ''} onClick={clickAction}>
			<Paper sx={categoryContainerSX}>
				<Grid container spacing={2} alignItems="center">
					<Grid item xs={5} sm={4} md={6}>
						<Img
							width="100%"
							alt={category.shortDescription}
							src={category.fullImage || category.thumbnail || ''}
							sx={categoryImageSX}
						/>
					</Grid>
					<Grid item xs={7} sm={6} px={2} py={1}>
						<Typography variant="h3" sx={categoryHeadingSX}>
							{category.name}
						</Typography>
						<Typography component="h4" variant="subtitle2" sx={categorySubHeadingSX}>
							{category.description}
						</Typography>
					</Grid>
				</Grid>
			</Paper>
		</Linkable>
	) : null;
};
