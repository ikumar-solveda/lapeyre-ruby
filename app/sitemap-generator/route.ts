/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { getCache } from '@/data/cache/getCache';
import { SitemapGenerator } from '@/data/sitemap-generator';
import { constructAppRouterContext } from '@/data/utils/constructAppRouterContext';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
	const { searchParams: _searchParams } = request.nextUrl;
	const searchParams = Object.fromEntries(_searchParams);
	const cache = getCache();
	const context = constructAppRouterContext({ searchParams });
	const xml = await SitemapGenerator({ cache, context, searchParams });
	return new NextResponse(xml, { headers: { 'Content-Type': 'text/xml' } });
};
