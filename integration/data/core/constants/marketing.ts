/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

export const EMSTYPE_LOCAL = 'local';
export const EMPTY_STRING = '';

export const MARKETING_SPOT_DATA_TYPE = {
	CATALOG_ENTRY_ID: 'CatalogEntryId',
	CATALOG_ENTRY: 'CatalogEntry',
	CONTENT: 'MarketingContent',
	CATALOG_GROUP_ID: 'CatalogGroupId',
	CATEGORY: 'Category',
	AI_ML_MODEL: 'AimlModel',
};

export const CONTENT_FORMAT_TEXT = 'Text';
export const CONTENT_FORMAT_FILE = 'File';
export const CONTENT_MIME_TYPE_IMAGE = 'image';

export const CATEGORY_DISPLAY = 'CategoryDisplay';
export const PRODUCT_DISPLAY = 'ProductDisplay';
export const SEARCH_DISPLAY = 'SearchDisplay';
export const TOP_CATEGORIES_DISPLAY = 'TopCategoriesDisplay';
export const DISPLAY_SEQ = 'displaySequence';

export const PARSE_CHECK = {
	hasAnchorTag: 'hasAnchorTag',
};

export const SUBSTITUTION = 'DM_Substitution';
export const SUBSTITUTION_MASKED = 'DM_SubstitutionMasked';
export const DM_SUBSTITUTION_DEFAULT_KEY = 'default';

export const CONTENT_ACTIONS = {
	addToCartAction: 'addToCartAction',
	addToWishListAction: 'addToWishListAction',
	addToCartAndApplyPromotionAction: 'addToCartAndApplyPromotionAction',
	issueCouponAction: 'issueCouponsAction',
	displayDiscountDetailsAction: 'displayDiscountDetailsAction',
};

export const URL_ACTIONS = {
	orderItemAdd: 'OrderItemAdd?',
	interestItemAdd: 'InterestItemAdd?',
	addOrderItemWithPromotionCodeOrCoupon: 'AddOrderItemWithPromotionCodeOrCoupon?',
	couponIssue: 'CouponsIssue?',
	discountDetailsDisplayView: 'DiscountDetailsDisplayView?',
};

export const ATTACHMENT_ASSET_MIME_TYPE = 'application';
export const REFERRER_COOKIE = 'referrer';
export const MARKETING_COOKIE_PREFIX = 'HC_';
