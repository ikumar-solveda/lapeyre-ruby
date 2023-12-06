/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { CatSEO } from '@/data/types/Category';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
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
	/** usually only used in kit and bundle responses */
	catalogEntryTypeCode?: string;
	hasSingleSKU: boolean;
	buyable: string;
	sellerId: string;
	manufacturer: string;
	price: Price[];
	attributes: ResponseProductAttribute[];
	numberOfSKUs: number;
	items: ResponseProductType[];
	/** usually only used in kit and bundle responses */
	sKUs?: ResponseProductType[];
	components?: ResponseProductType[];
	/** only available on elements of components array  */
	quantity?: string;
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

export type BundleTableRowData = ProductType & {
	rowNumber: number;
	isOneSku: boolean;
	availability: ProductAvailabilityData[];
	attrStates: Record<string, string>;
	selectedSku?: ProductType;
	quantity: string;
};

export type ProductType = Omit<ResponseProductType, 'items' | 'components' | 'sKUs'> & {
	productPrice: ProductDisplayPrice;
	colorSwatches: ProductAttributeValue[];
	ribbons: Ribbon[];
	items: ProductType[];
	descriptiveAttributes: ProductAttribute[];
	definingAttributes: ProductAttribute[];
	components?: ProductType[];
	sKUs?: ProductType[];
	position?: number;
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

export type ResponseProductAttributeValue = {
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

export type ItemDetails = {
	name: string;
	partNumber: string;
	thumbnail: string;
	href: string;
};

export type KitTableData = {
	quantity?: number;
	itemDetails?: ItemDetails;
	attributes?: Record<string, string>;
	subRows?: KitTableData[];
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
	activity?: string;
	espot?: string;
	experiment?: string;
	experimentName?: string;
	testElementName?: string;
	testelement?: string;
	searchExecution?: {
		searchTerm?: string;
		searchRule?: Record<string, any>;
		nlp?: {
			pos: string;
		};
		customFields?: Record<string, any>;
	}[];
};

export type SkuListTableData = ProductType & {
	availability: ProductAvailabilityData[];
};

export type ProductInfoData = {
	productInfo: ProductInfo;
};

export type ProductInfo = {
	displayedProdOrSku: ProductType | null; // currently displayed product or sku in the product information widget
	filteredSkus: ProductType[]; // currently filtered sku list displayed in the sku list widget
	skuAndQuantities: Record<string, number>; // SKUs partNumber and it's quantity for quantity bigger than 0
	skuAndPickupMode: Record<string, string>; // SKUs partNumber and it's pickup mode for quantity bigger than 0
};
