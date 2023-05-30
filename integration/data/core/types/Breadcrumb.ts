/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

export type HCLBreadcrumb = {
	label: string;
	value?: string;
	seo?: { href?: string };
};

export type Breadcrumb = {
	label: string;
	value?: string;
	href?: string;
};
