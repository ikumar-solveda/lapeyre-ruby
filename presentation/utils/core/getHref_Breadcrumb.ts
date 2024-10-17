/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

export const getHref_Breadcrumb = (href: string | undefined, trail: string[] | undefined) => ({
	pathname: href,
	query: { trail },
});
