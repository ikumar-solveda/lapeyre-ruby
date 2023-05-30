export interface CatalogGroupDetailArray {
	/** @format int32 */
	recordSetCount?: number;
	/** @format int32 */
	recordSetTotal?: number;
	recordSetComplete?: boolean;
	/** @format int32 */
	recordSetStartNumber?: number;
	resourceName?: string;
	resourceId?: string;
	/** @format int64 */
	uniqueId?: number;
	catalogGroupView?: CatalogGroupView[];
}

export interface CatalogGroupView {
	identifier?: string;
	fullImage?: string;
	thumbnail?: string;
	/** @format int32 */
	storeID?: number;
	name?: string;
	shortDescription?: string;
	userData?: UserDataType;
	parentCatalogGroupID?: string[];
	childCatalogGroupID?: string[];
}

export interface UserDataType {
	name?: string[];
	value?: string[];
}

export interface CatalogGroupDetailWithSequenceArray {
	/** @format int32 */
	recordSetCount?: number;
	/** @format int32 */
	recordSetTotal?: number;
	recordSetComplete?: boolean;
	/** @format int32 */
	recordSetStartNumber?: number;
	resourceName?: string;
	resourceId?: string;
	/** @format int64 */
	uniqueId?: number;
	catalogGroupView?: CatalogGroupViewWithSequence[];
}

export interface CatalogGroupViewWithSequence {
	identifier?: string;
	fullImage?: string;
	thumbnail?: string;
	/** @format int32 */
	storeID?: number;
	name?: string;
	shortDescription?: string;
	userData?: UserDataType;
	parentCatalogGroupID?: string[];
	childCatalogGroupID?: string[];
	sequnece?: string[];
}

export interface ADAttribute {
	ad_attribute?: string;
	description?: string;
	usage?: string;
}

export interface Attachment {
	identifier?: string;
	/** @format int64 */
	catentry_id?: number;
	usage?: string;
	/** @format int64 */
	attachmentAssetID?: number;
	mimeType?: string;
	attachmentAssetPath?: string;
}

export interface Attribute {
	usage?: string;
	facetable?: boolean;
	storeDisplay?: boolean;
	sequence?: string;
	value?: AttributeValue[];
}

export interface AttributeValue {
	value?: string;
	identifier?: string;
	uniqueID?: string;
	sequence?: string;
}

export interface Component {
	price?: Price[];
	hasSingleSKU?: boolean;
	resourceId?: string;
	/** @format int64 */
	uniqueID?: number;
	partNumber?: string;
	shortDescription?: string;
	catalogEntryTypeCode?: string;
	fullImage?: string;
	thumbnail?: string;
	buyable?: boolean;
	/** @format int32 */
	storeID?: number;
	name?: string;
	parentCatalogGroupID?: string[];
	manufacturer?: string;
	quantity?: string;
	skus?: SKU[];
}

export interface MerchandisingAssociation {
	price?: Price[];
	hasSingleSKU?: boolean;
	resourceId?: string;
	/** @format int64 */
	uniqueID?: number;
	partNumber?: string;
	shortDescription?: string;
	catalogEntryTypeCode?: string;
	fullImage?: string;
	thumbnail?: string;
	buyable?: boolean;
	/** @format int32 */
	storeID?: number;
	name?: string;
	parentCatalogGroupID?: string[];
	manufacturer?: string;
	quantity?: string;
	associationType?: string;
	ad_attribute?: ADAttribute;
	/** @format int32 */
	numberOfSKUs?: number;
}

export interface MetaData {
	price?: string;
	spellCheck?: string[];
}

export interface Price {
	usage?: string;
	description?: string;
	currency?: string;
	value?: number;
}

export interface ProductDetail {
	ad_attribute?: ADAttribute[];
	attributes?: Attribute[];
	userData?: UserDataType[];
	price?: Price[];
	numberOfSKUs?: string;
	/** @format int32 */
	disallowRecurringOrder?: number;
	manufacturer?: string;
	parentCatalogGroupID?: string[];
	name?: string;
	/** @format int64 */
	uniqueID?: number;
	partNumber?: string;
	thumbnail?: string;
	shortDescription?: string;
	longDescription?: string;
	keyword?: string;
	hasSingleSKU?: boolean;
	hasSingleSKUESet?: boolean;
	singleSKUCatalogEntryID?: string;
	storeID?: string;
	fullImage?: string;
	parentCatalogEntryID?: string;
	subscriptionTypeCode?: string;
	dynamicKitURL?: string;
	dynamicKitDefaultConfiguration?: string;
	dynamicKitDefaultConfigurationComplete?: boolean;
	dynamicKitDefaultConfigurationCompleteESet?: boolean;
	dynamicKitModelReference?: string;
	title?: string;
	metaDescription?: string;
	metaKeyword?: string;
	fullImageAltDescription?: string;
	buyable?: boolean;
	catalogEntryTypeCode?: string;
	/** @format int32 */
	recordSetCount?: number;
	/** @format int32 */
	recordSetTotal?: number;
	/** @format int32 */
	recordSetTotalMatches?: number;
	recordSetComplete?: boolean;
	/** @format int32 */
	recordSetStartNumber?: number;
	resourceName?: string;
	resourceId?: string;
	metaData?: MetaData;
	components?: Component[];
	merchandisingAssociations?: MerchandisingAssociation[];
	attachments?: Attachment[];
	skus?: SKU[];
}

export interface SKU {
	price?: Price[];
	hasSingleSKU?: boolean;
	resourceId?: string;
	/** @format int64 */
	uniqueID?: number;
	partNumber?: string;
	shortDescription?: string;
	catalogEntryTypeCode?: string;
	fullImage?: string;
	thumbnail?: string;
	buyable?: boolean;
	/** @format int32 */
	storeID?: number;
	name?: string;
	parentCatalogGroupID?: string[];
	manufacturer?: string;
}

export interface BreadCrumbTrailEntryView {
	lable?: string;
	type?: string;
	value?: string;
}

export type BreadCrumbTrailEntryViewExtended = object;

export type Entry = object;

export interface FacetView {
	value?: string;
	name?: string;
	entry?: Entry[];
}

export interface ProductSummary {
	ad_attribute?: ADAttribute[];
	attributes?: Attribute[];
	userData?: UserDataType[];
	price?: Price[];
	numberOfSKUs?: string;
	/** @format int32 */
	disallowRecurringOrder?: number;
	manufacturer?: string;
	parentCatalogGroupID?: string[];
	name?: string;
	/** @format int64 */
	uniqueID?: number;
	partNumber?: string;
	thumbnail?: string;
	shortDescription?: string;
	longDescription?: string;
	keyword?: string;
	hasSingleSKU?: boolean;
	hasSingleSKUESet?: boolean;
	singleSKUCatalogEntryID?: string;
	storeID?: string;
	fullImage?: string;
	parentCatalogEntryID?: string;
	subscriptionTypeCode?: string;
	dynamicKitURL?: string;
	dynamicKitDefaultConfiguration?: string;
	dynamicKitDefaultConfigurationComplete?: boolean;
	dynamicKitDefaultConfigurationCompleteESet?: boolean;
	dynamicKitModelReference?: string;
	title?: string;
	metaDescription?: string;
	metaKeyword?: string;
	fullImageAltDescription?: string;
	buyable?: boolean;
	catalogEntryTypeCode?: string;
	/** @format int32 */
	recordSetCount?: number;
	/** @format int32 */
	recordSetTotal?: number;
	/** @format int32 */
	recordSetTotalMatches?: number;
	recordSetComplete?: boolean;
	/** @format int32 */
	recordSetStartNumber?: number;
	resourceName?: string;
	resourceId?: string;
	metaData?: MetaData;
}

export interface ProductSummaryArray {
	catalogEntryView?: ProductSummary[];
	facetView?: FacetView[];
	breadCrumbTrailEntryView?: BreadCrumbTrailEntryView[];
	breadCrumbTrailEntryViewExtended?: BreadCrumbTrailEntryViewExtended;
}

export interface ProductDetailArray {
	catalogEntryView?: ProductDetail[];
	facetView?: FacetView[];
	breadCrumbTrailEntryView?: BreadCrumbTrailEntryView[];
	breadCrumbTrailEntryViewExtended?: BreadCrumbTrailEntryViewExtended;
}

export interface Query {
	params?: object[];
	queryFields?: string[];
	sortFields?: object;
	provider?: string[];
	preprocessor?: string[];
	postprocessor?: string[];
	responseFields?: string[];
	highlight?: object;
	spellcheck?: object;
	group?: object;
	hero?: object;
}

export interface SearchProfile {
	parentProfileName?: string;
	profileName?: string;
	indexName?: string;
	query?: Query;
}

export interface CategorySuggestion {
	suggestionView?: CategorySuggestionView[];
}

export interface CategorySuggestionView {
	categorySeparator?: string;
	identifier?: string;
	entry?: CategoryViewEntry[];
}

export interface CategoryViewEntry {
	value?: string;
	fullPath?: string;
	fullPathCategoryIds?: string;
	image?: string;
	name?: string;
	shortDescription?: string;
	userData?: UserDataType;
}

export interface KeywordSuggestion {
	suggestionView?: KeywordSuggestionView[];
}

export interface KeywordSuggestionView {
	identifier?: string;
	entry?: Entry[];
}

export interface CommonSuggestionView {
	identifier?: string;
	entry?: Entry[];
	userData?: UserDataType;
}

export interface CommonSuggestions {
	suggestionView?: CommonSuggestionView[];
}

export interface ProductSuggestion {
	/** @format int32 */
	recordSetCount?: number;
	/** @format int32 */
	recordSetTotal?: number;
	recordSetComplete?: boolean;
	/** @format int32 */
	recordSetStartNumber?: number;
	resourceName?: string;
	resourceId?: string;
	suggestionView?: ProductSuggestionView[];
}

export interface ProductSuggestionView {
	identifier?: string;
	entry?: ProductSuggestionEntry[];
}

export interface ProductSuggestionEntry {
	hasSingleSKU?: boolean;
	resourceId?: string;
	/** @format int64 */
	uniqueID?: number;
	partNumber?: string;
	shortDescription?: string;
	thumbnail?: string;
	/** @format int32 */
	storeID?: number;
	name?: string;
	userData?: UserDataType;
}
