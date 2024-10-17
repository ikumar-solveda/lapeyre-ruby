/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { LANGUAGE_MAP_LOWERCASE, REQUEST_ID_HEADER_KEY } from '@/data/constants/environment';
import { AppContextWrapper, AppRouterPageProps } from '@/data/types/AppRouter';
import { cookies, headers } from 'next/headers';

export const constructAppRouterContext = ({ searchParams }: AppRouterPageProps) => {
	const { langId } = searchParams as Record<string, string>;
	const locale = LANGUAGE_MAP_LOWERCASE[langId as keyof typeof LANGUAGE_MAP_LOWERCASE] || 'en-us';
	const context: AppContextWrapper = {
		isWrapper: true,
		extra: { cookie: cookies().toString(), requestId: headers().get(REQUEST_ID_HEADER_KEY) },
		query: searchParams,
		locale,
	} as any;
	return context;
};
