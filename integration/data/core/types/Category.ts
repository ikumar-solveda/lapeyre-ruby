/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

export type CategoryType = {
	name: string;
	identifier: string;
	shortDescription: string;
	uniqueID: string;
	parentCatalogGroupID: string;
	thumbnail: string;
	fullImage: string;
	sequence: string;
	seo: CatSEO;
	children?: CategoryType[];
	links: CatLink;
	description: string;
};

type CatLink = {
	parent: CatLinkHref;
	children: string[];
	self: CatLinkHref;
};

type CatLinkHref = {
	href: string;
};

export type CatSEO = {
	id: string;
	href: string;
};
