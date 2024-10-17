/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { Img } from '@/components/blocks/MaterialImage';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { categoryContainerSX } from '@/components/content/Category/styles/container';
import { categoryHeadingSX } from '@/components/content/Category/styles/heading';
import { categoryImageSX } from '@/components/content/Category/styles/image';
import { categorySubHeadingSX } from '@/components/content/Category/styles/subHeading';
import { useCategory } from '@/data/Content/Category';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useUser } from '@/data/User';
import { BC_COOKIE, HC_PREFIX } from '@/data/constants/cookie';
import { ContentContext } from '@/data/context/content';
import { useCookieState } from '@/data/cookie/useCookieState';
import { ID } from '@/data/types/Basic';
import { CategoryType } from '@/data/types/Category';
import { getContractIdFromContext } from '@/utils/getContractIdFromContext';
import { getHref_Category } from '@/utils/getHref_Category';
import { Grid, Paper, Typography } from '@mui/material';
import { FC, MouseEvent, useCallback, useContext, useEffect, useMemo } from 'react';

export const Category: FC<{
	id: ID;
	parent?: CategoryType;
	clickAction?: (event?: MouseEvent) => void;
}> = ({ id, clickAction, parent }) => {
	const router = useNextRouter();
	const [trail] = useCookieState(BC_COOKIE, true, HC_PREFIX);
	const { rawData, category, loading } = useCategory(id);
	const { user } = useUser();
	const contract = getContractIdFromContext(user?.context);
	const { onNotify } = useContext(ContentContext) as {
		onNotify: (id: ID, contract: string, category?: CategoryType) => void;
	};
	const routeUrl = useMemo(
		() => getHref_Category(category, parent, trail as string[]),
		[category, parent, trail]
	);
	const onClick = useCallback(
		(event: MouseEvent) => {
			if (clickAction) {
				clickAction(event);
			}
			router.push(routeUrl);
		},
		[clickAction, routeUrl, router]
	);

	useEffect(() => {
		if (onNotify && rawData) {
			onNotify(id, contract, category);
		}
	}, [loading, rawData, category]); // eslint-disable-line react-hooks/exhaustive-deps

	return loading ? (
		<ProgressIndicator />
	) : category ? (
		// TODO Hoist href to top level category object, presentation shouldn't have to handle this structure.

		<Paper sx={categoryContainerSX} onClick={onClick} id="category-container-paper">
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
						<Linkable
							href={routeUrl}
							data-testid={category.seo.href || ''}
							id={category.seo.href || ''}
						>
							{category.name}
						</Linkable>
					</Typography>
					<Typography component="h4" variant="subtitle2" sx={categorySubHeadingSX}>
						{category.description}
					</Typography>
				</Grid>
			</Grid>
		</Paper>
	) : null;
};
