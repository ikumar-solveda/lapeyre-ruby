/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { ProductType } from '@/data/types/Product';

export type HCLBreadcrumb = {
	label: string;
	value?: string;
	type?: string;
	seo?: { href?: string };
};

export type Breadcrumb = {
	label: string;
	value?: string;
	type?: string;
	href?: string;
	trail?: string[];
};

export type BreadcrumbProductType = {
	name: ProductType['name'];
	id: ProductType['id'];
	type: 'PRODUCT';
};

export type MappedResponseBreadcrumb = HCLBreadcrumb[] | BreadcrumbProductType;
