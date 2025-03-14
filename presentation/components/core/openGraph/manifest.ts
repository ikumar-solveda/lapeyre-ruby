/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { openGraphManifestCustom } from '@/components/openGraph/manifestCustom';
import type { DataProps } from '@/data/types/OpenGraph';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

export const openGraphManifest: Record<string, ComponentType<DataProps>> = {
	ProductPage: dynamic(() =>
		import('@/components/openGraph/ProductPage').then((mod) => mod.ProductPage)
	),
	ItemPage: dynamic(() =>
		import('@/components/openGraph/ProductPage').then((mod) => mod.ProductPage)
	),
	VariantPage: dynamic(() =>
		import('@/components/openGraph/ProductPage').then((mod) => mod.ProductPage)
	),
	KitPage: dynamic(() =>
		import('@/components/openGraph/ProductPage').then((mod) => mod.ProductPage)
	),
	BundlePage: dynamic(() =>
		import('@/components/openGraph/ProductPage').then((mod) => mod.ProductPage)
	),
	ProductListPage: dynamic(() =>
		import('@/components/openGraph/CategoryPage').then((mod) => mod.CategoryPage)
	),
	CategoryPage: dynamic(() =>
		import('@/components/openGraph/CategoryPage').then((mod) => mod.CategoryPage)
	),
	...openGraphManifestCustom,
};
