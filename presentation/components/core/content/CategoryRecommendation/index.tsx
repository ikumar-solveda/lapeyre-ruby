/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { RenderContent } from '@/components/blocks/RenderContent';
import { Category } from '@/components/content/Category';
import { useCategoryRecommendation } from '@/data/Content/CategoryRecommendation';
import { useContentEvents } from '@/data/Content/_ContentEvents';
import { useUser } from '@/data/User';
import { ContentProvider } from '@/data/context/content';
import { ID } from '@/data/types/Basic';
import { CategoryType } from '@/data/types/Category';
import { WidgetProperties } from '@/data/types/Slot';
import { getContractIdFromContext } from '@/utils/getContractIdFromContext';
import { Grid } from '@mui/material';
import { FC, useEffect, useState } from 'react';

const emptyProperties = {} as WidgetProperties;

export const CategoryRecommendation: FC<{ id: ID; properties?: WidgetProperties }> = ({
	id: _id,
	properties = emptyProperties,
}) => {
	const { emsName = '' } = properties;
	const { categories: events, clickAction, loading, title } = useCategoryRecommendation(emsName);
	const { onContentClick } = useContentEvents();
	const { user } = useUser();
	const [contract, setContract] = useState<string>(getContractIdFromContext(user?.context));
	const [invalid, setInvalid] = useState<Record<string, boolean>>({});

	const onNotify = (id: string, usedContract: string, category: CategoryType) =>
		setInvalid((old) => ({ ...old, [`${id}_${usedContract}`]: !category }));
	useEffect(() => {
		// we only need to trigger updates on changes, not initial loads -- initial load updates are
		//   taken care of by the initial render's invocations of `onNotify`
		const _contract = getContractIdFromContext(user?.context);
		if (contract !== _contract) {
			setContract(_contract);
		}
	}, [user?.context]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<ContentProvider value={{ onNotify }}>
			{title?.map((content) => (
				<RenderContent
					key={`${content.id}${content.contentId}`}
					content={content}
					onClick={onContentClick(content)}
				/>
			))}
			<Grid container spacing={2}>
				{loading
					? 'Loading...'
					: events.map(({ id }, index) =>
							invalid[`${id}_${contract}`] ? null : (
								<Grid
									key={`${id}_${contract}_${index}`}
									item
									xs={12}
									md={6}
									id={`categoryRecommendation_div_2_${id}`}
									data-testid={`categoryRecommendation_div_2_${id}`}
								>
									<Category id={id} clickAction={clickAction(id)} />
								</Grid>
							)
					  )}
			</Grid>
		</ContentProvider>
	);
};
