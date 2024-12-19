/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

/**
 * Try to avoid using this, use from the store configurations.
 */
export const LANGUAGE_MAP = {
	'-1': 'en-US',
	'-2': 'fr-FR',
	'-3': 'de-DE',
	'-4': 'it-IT',
	'-5': 'es-ES',
	'-6': 'pt-BR',
	'-7': 'zh-CN',
	'-8': 'zh-TW',
	'-10': 'ja-JP',
	'-20': 'ru-RU',
	'-21': 'ro-RO',
	'-9': 'ko-KR',
	'-22': 'pl-PL',
	'-23': 'ar-EG',
};

/**
 * Try to avoid using this, use from the store configurations.
 */
export const LANGUAGE_MAP_LOWERCASE = {
	'-1': 'en-us',
	'-2': 'fr-fr',
	'-3': 'de-de',
	'-4': 'it-it',
	'-5': 'es-es',
	'-6': 'pt-br',
	'-7': 'zh-cn',
	'-8': 'zh-tw',
	'-10': 'ja-jp',
	'-20': 'ru-ru',
	'-21': 'ro-ro',
	'-9': 'ko-kr',
	'-22': 'pl-pl',
	'-23': 'ar-eg',
};

/**
 * @deprecated, Try to avoid using this, use from the store configurations.
 */
export const REVERSE_LANGUAGE_MAP = {
	'en-US': '-1',
	'fr-FR': '-2',
	'de-DE': '-3',
	'it-IT': '-4',
	'es-ES': '-5',
	'pt-BR': '-6',
	'zh-CN': '-7',
	'zh-TW': '-8',
	'ja-JP': '-10',
	'ru-RU': '-20',
	'ro-RO': '-21',
	'ko-KR': '-9',
	'pl-PL': '-22',
	'ar-EG': '-23',
};

/**
 * @deprecated, Try to avoid using this, use from the store configurations.
 */
export const REVERSE_LANGUAGE_MAP_LOWERCASE = {
	'en-us': '-1',
	'fr-fr': '-2',
	'de-de': '-3',
	'it-it': '-4',
	'es-es': '-5',
	'pt-br': '-6',
	'zh-cn': '-7',
	'zh-tw': '-8',
	'ja-jp': '-10',
	'ru-ru': '-20',
	'ro-ro': '-21',
	'ko-kr': '-9',
	'pl-pl': '-22',
	'ar-eg': '-23',
};

/**
 * @deprecated, this is not actively used now.
 */
export const SHORT_LANGUAGE_MAP = {
	'-1': 'en',
	'-2': 'fr',
	'-3': 'de',
	'-4': 'it',
	'-5': 'es',
	'-6': 'pt',
	'-7': 'zh',
	'-8': 'zh-TW',
	'-10': 'ja',
	'-20': 'ru',
	'-21': 'ro',
	'-9': 'ko',
	'-22': 'pl',
	'-23': 'ar',
};

export const MP_ENABLED = 'hcl.marketplace.enabled';
export const MP_SELLER_REG_ENABLED = 'hcl.marketplace.self-registration';
export const MP_SELLER_REG_OFF = 'marketplace-seller-reg-off';
export const MP_SELLER_REG_ON = 'marketplace-seller-reg-on';
export const B2B_STORE_TYPE = 'BMH';
export const REQUEST_ID_HEADER_KEY = 'x-hcl-next-request-id';
export const SAS_STORE_REL_TYPE = '-11';
