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

// export const CATEGORY_DISPLAY = 'CategoryDisplay';
// export const PRODUCT_DISPLAY = 'ProductDisplay';
// export const SEARCH_DISPLAY = 'SearchDisplay';
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

// B2C Const Code
export const PRODUCT_DISPLAY = 'ProductDisplay';
export const CATEGORY_DISPLAY = 'CategoryDisplay';
export const SEARCH_DISPLAY = 'SEARCH_DISPLAY';
export const HCL_Dx_PREFIX = 'dx://';
export const DX_HOST = '/dx/';
export const CONTENT_TYPE_VIDEO = 'Commerce Video Content';
export const EXTERNAL_LINK = 'external';
export const INTERNAL_LINK = 'internal';
export const CONTENT_FORMAT_ID = {
	STORE_TEXT: '2',
	EXTERNAL: '6',
};

export const LINK_USAGE = {
	STANDARD: 'Standard',
	PROMO: 'Promo',
	EVENT: 'Event',
	PROLINK: 'PROLINK',
};

export const CONTENT_TEMPLATE_ID = {
	COLLECTION_TEMPLATE: 'COLLECTION_TEMPLATE',
	PRODUCT_LIST_PUSH: 'PRODUCT_LIST_PUSH',
	HEADER_NAV: 'HEADER_NAVIGATION',
	FOOTER_NAV: 'FOOTER_NAVIGATION',
	FOOTER_SSNAV: 'FOOTER_SSNAVIGATION',
};

export const CONTENT_TEMPLATE = {
	IMAGE: 'Image',
	IMAGE_USAGE: 'Image Usage',
	IMAGE_ALTERNATE_URL: 'Image Alternate URL',
	TEXT: 'Text',
	TEXT_ELEMENT_WIDTH: 'Text Element Width',
	TEXT_ALIGNMENT: 'Text Alignment',
	TEXT_ELEMENT_PADDING_DESKTOP: 'Text Element Padding (Desktop)',
	TEXT_ELEMENT_PADDING_TABLET: 'Text Element Padding (Tablet)',
	TEXT_ELEMENT_PADDING_MOBILE: 'Text Element Padding (Mobile)',
	BUTTON_LINK: 'Button Link',
	BUTTON_TEXT_DISPLAY: 'Button Text to Display',
	BUTTON_APPEARANCE: 'Button Appearance',
	HEIGHT_DESKTOP: 'Height (Desktop)',
	HEIGHT_TABLET: 'Height (Tablet)',
	HEIGHT_MOBILE: 'Height (Mobile)',
	ELEMENT_ALIGNMENT: 'Element Alignment',
	BORDER_RADIUS: 'Border Radius',
	DROP_SHADOW: 'Drop Shadow',
	LAYOUT_DIRECTION: 'Layout Direction',
	VIDEO: 'Video',
	VIDEO_ALTERNATE_URL: 'Video Alternate URL',
	VIDEO_POSTER: 'Video Poster',
	VIDEO_POSTER_ALTERNATE_URL: 'Video Poster Alternate URL',
	VIDEO_USAGE: 'Yes',
	VIDEO_AUTOPLAY: 'Video Auto-play',
	VIDEO_AUTOPLAY_YES: 'Yes',
	VIDEO_CONTROLS: 'Video Controls',
	VIDEO_VOLUME: 'Video Volume',
	ML_TRANSLATION: 'ML Translations',
	USE_AS_BACKGROUND_IMAGE: 'Use as background image',
	USE_AS_BACKGROUND_VIDEO: 'Use as Background Video',
	SHOW_VIDEO_CONTROLS: 'Show video controls',
	NOT_MUTED: 'Not muted',
	VIDEO_TEMPLATE_ID: 'd78c2265-d156-4798-b30b-fe4b9145b554',
	PRIMARY_BUTTON: 'Primary Button',
	SECONDARY_BUTTON: 'Secondary Button',
	TEXT_LINK: 'Text Link',
	USE_ENTIRE_CONTENT_AREA_AS_LINK: 'Do not show button - Use entire content area as a link',
	USE_DROP_SHADOW: 'Use drop shadow',
	SHOW_DROP_SHADOW: 'Show drop shadow',
	PRIMARY: 'primary',
	SECONDARY: 'secondary',
	TEXT_APPEARANCE: 'text',
	AREA: 'area',
	FLEX_START: 'flex-start',
	FLEX_END: 'flex-end',
	CENTER: 'center',
	DATE_START: 'Date de debut',
	DATE_END: 'Date de fin',
	TEXT_BANNER: 'Texte defilant',
	HEADER_NAV_LINK: 'Libelle',
	HEADER_NAV_USAGE: 'Type',
	FOOTER_TITRE_SECTION: 'Titre de la section',
	FOOTER_NAV_LINK_1: 'URL_1',
	FOOTER_NAV_LINK_2: 'URL_2',
	FOOTER_NAV_LINK_3: 'URL_3',
	FOOTER_NAV_LINK_4: 'URL_4',
	FOOTER_NAV_LINK_5: 'URL_5',
	FOOTER_NAV_LINK_6: 'URL_6',
	FOOTER_NAV_LINK_7: 'URL_7',
	FOOTER_NAV_LINK_8: 'URL_8',
	FOOTER_NAV_LINK_9: 'URL_9',
	FOOTER_NAV_LINK_10: 'URL_10',
	FOOTER_NAV_LINK_11: 'URL_11',
	FOOTER_NAV_LINK_12: 'URL_12',
	PRODUCT_LIST_PUSH_HTML: 'html',
	PRODUCT_LIST_PUSH_URL: 'URL',
	PRODUCT_LIST_PUSH_POSITION: 'position',
	PRODUCT_LIST_PUSH_IMAGE: 'img',
};
