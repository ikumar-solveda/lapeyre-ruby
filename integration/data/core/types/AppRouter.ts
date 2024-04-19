/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { Cache } from '@/data/types/Cache';
import { GetServerSidePropsContext } from 'next';
import { NextRequest } from 'next/server';

export type LayoutProps = {
	children: React.ReactNode;
};

export type AppContextWrapper = GetServerSidePropsContext & {
	isWrapper?: boolean;
	extra: Record<string, any>;
};

export type AppRouterPageProps = {
	params?: Record<string, string>;
	searchParams: Record<string, string | string[] | undefined>;
};

export type ServerPageProps = AppRouterPageProps & {
	cache: Cache;
	context: AppContextWrapper;
	request?: NextRequest; // only available for sitemap-generator
};
