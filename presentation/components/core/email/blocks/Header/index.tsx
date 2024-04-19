/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { RenderContentModern } from '@/components/blocks/RenderContent/modern';
import {
	dataMap,
	getContentRecommendationForEmails,
} from '@/data/Content/ContentRecommendation-Server';
import { getEmailSettings } from '@/data/EmailSettings-Server';
import { ServerPageProps } from '@/data/types/AppRouter';
import { getHostWithBasePath } from '@/utils/getHostWithBasePath-Server';
import { FC } from 'react';

export const Header: FC<ServerPageProps> = async ({ cache, context }) => {
	const emsName = 'EmailBanner_Content';
	const { userData } = await getEmailSettings(cache, context);

	const top = await getContentRecommendationForEmails({
		cache,
		context,
		properties: { emsName },
	});

	return (
		<>
			{dataMap(top)?.map((content, key) => (
				<RenderContentModern key={key} content={content} options={getHostWithBasePath(userData)} />
			))}
		</>
	);
};
