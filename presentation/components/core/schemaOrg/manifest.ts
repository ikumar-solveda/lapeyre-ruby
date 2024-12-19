/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { schemaOrgManifestCustom } from '@/components/schemaOrg/manifestCustom';
import { DataProps } from '@/data/types/SchemaOrg';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

export const schemaOrgManifest: Record<string, ComponentType<DataProps>> = {
	ItemPage: dynamic(() =>
		import('@/components/schemaOrg/ProductPage').then((mod) => mod.ProductPage)
	),
	ProductPage: dynamic(() =>
		import('@/components/schemaOrg/ProductPage').then((mod) => mod.ProductPage)
	),
	VariantPage: dynamic(() =>
		import('@/components/schemaOrg/ProductPage').then((mod) => mod.ProductPage)
	),
	KitPage: dynamic(() => import('@/components/schemaOrg/KitPage').then((mod) => mod.KitPage)),
	BundlePage: dynamic(() =>
		import('@/components/schemaOrg/BundlePage').then((mod) => mod.BundlePage)
	),
	CategoryPage: dynamic(() =>
		import('@/components/schemaOrg/CategoryPage').then((mod) => mod.CategoryPage)
	),
	ProductListPage: dynamic(() =>
		import('@/components/schemaOrg/ProductListingPage').then((mod) => mod.ProductListingPage)
	),
	SearchPage: dynamic(() =>
		import('@/components/schemaOrg/SearchPage').then((mod) => mod.SearchPage)
	),
	ContentPage: dynamic(() =>
		import('@/components/schemaOrg/ContentPage').then((mod) => mod.ContentPage)
	),
	...schemaOrgManifestCustom,
};
