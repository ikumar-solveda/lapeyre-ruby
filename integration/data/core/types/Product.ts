/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { CatSEO } from '@/data/types/Category';
import { Slide } from '@/data/types/Slide';

// future use for breadcrumb trail
export type ProductQueryResponse = {
	metaData: MetaData;
	contents: ResponseProductType[];
	total: number;
	breadCrumbTrailEntryView?: BreadCrumbTrailEntryView[];
	facets?: ProductFacet[];
};

export type Attachment = {
	mimeType: string;
	attachmentAssetPath: string;
	name: string;
	attachmentAssetID: string;
};

export type ResponseProductType = {
	attachments: Attachment[];
	name: string;
	partNumber: string;
	shortDescription: string;
	longDescription: string;
	id: string;
	parentCatalogGroupID: string | string[];
	parentCatalogEntryID: string;
	thumbnail: string;
	fullImage: string;
	sequence: string;
	seo: CatSEO;
	type: string;
	hasSingleSKU: boolean;
	buyable: string;
	sellerId: string;
	manufacturer: string;
	price: Price[];
	attributes: ResponseProductAttribute[];
	numberOfSKUs: number;
	items: ResponseProductType[];
	merchandisingAssociations: ResponseProductType[];
	groupingProperties?: GroupingProperties;
	images?: Slide[];
	seller: string;
};

export type GroupingProperties = {
	groupCount: number;
	groupHero: string;
	groupListPriceRange: [string, string];
	groupOfferPriceRange: [string, string];
	groupMinPriceValue: string;
	groupMaxPriceValue: string;
};

export type Ribbon = { identifier: string; value: string };
export type ProductDisplayPrice = {
	min?: number | null;
	max?: number | null;
	currency?: string;
	offer?: number;
	list?: number;
};
export type ProductType = Omit<ResponseProductType, 'items'> & {
	productPrice: ProductDisplayPrice;
	colorSwatches: ProductAttributeValue[];
	ribbons: Ribbon[];
	items: ProductType[];
	descriptiveAttributes: ProductAttribute[];
	definingAttributes: ProductAttribute[];
};

export type ResponseProductAttribute = {
	associatedKeyword: string;
	merchandisable: string;
	identifier: string;
	sequence: string;
	storeDisplay: string;
	usage: string;
	displayable: string;
	name: string;
	facetable: string;
	id: string;
	comparable: string;
	swatchable: string;
	searchable: string;
	values: ResponseProductAttributeValue[];
};

export type ProductAttribute = Omit<ResponseProductAttribute, 'values'> & {
	values: ProductAttributeValue[];
};

type ResponseProductAttributeValue = {
	identifier: string | string[];
	sequence: string | string[];
	unitOfMeasure: string | string[];
	unitID: string | string[];
	image1: string | string[];
	value: string | string[];
	image1path: string | string[];
	id: string | string[];
	attributeIdentifier?: string | undefined;
};

export type ProductAttributeValue = {
	identifier: string;
	sequence: string;
	unitOfMeasure: string;
	unitID: string;
	image1: string;
	value: string;
	image1path: string;
	id: string;
	attributeIdentifier?: string;
};

export type Price = {
	usage: string;
	description: string;
	currency: string;
	value: string;
};

export type ProductFacet = {
	entry: ProductFacetEntry[];
	value: string;
	name: string;
	extendedData: FacetExtendedData;
};

export type ProductFacetEntry = {
	count: number;
	extendedData: FacetEntryExtendedData;
	frequency: string;
	fullPath: string;
	fullPathCategoryIds: string;
	image: string;
	label: string;
	name: string;
	shortDescription: string;
	term: string;
	value: string;
};

export type Selection = {
	sku?: ProductType;
	quantity: number;
	attrsByIdentifier?: Record<string, string>;
	buyable: boolean;
};

export type SellerInfo = {
	name: string;
	id: string;
};

type FacetEntryExtendedData = {
	image1: string;
	parentIds: string;
	sequence: string;
	uniqueId: string;
	unitID: string;
	unitOfMeasure: string;
};

type FacetExtendedData = {
	allValuesReturned: string;
	allowMultipleValueSelection: string;
	displaySequence: string;
	displayable: string;
	facet_id: string;
	fdesc: string;
	fname: string;
	groupId: string;
	keywordSearch: string;
	max_display: string;
	maximumValuesToDisplay: string;
	name: string;
	propertyId: string;
	propertyname: string;
	propertyvalue: string;
	selection: string;
	sequence: string;
	sortorder: string;
	srchattr_id: string;
	srchattridentifier: string;
	storeent_id: string;
	unitID: string;
	unitOfMeasure: string;
	zero_display: string;
};

type BreadCrumbTrailEntryView = {
	label: string;
	type: string;
	value: string;
	seo: CatSEO;
};

type MetaData = {
	price: string;
};
