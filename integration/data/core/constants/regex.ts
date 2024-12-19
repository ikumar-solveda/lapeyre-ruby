/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

export const REGEX = {
	EMAIL: /^([\w.%+\-]+)@((?!-)[\w\-]+(?<!-)\.)+([a-z]{2,})$/i,
	PHONE: /^[\-+\(\) ]*[0-9][\-+\(\) 0-9]*$/,
	NICKNAME_ALPHA_NUMERIC_SPECIAL_CHAR: /^(?!\s)[a-zA-Z0-9 ]+(?<!\s)$/,
	CARD_NUMBER_MASK: /[0-9](?=([0-9]{4}))/g,
	IDENTIFICATION: /^\d+$/,
	SEARCH_REDIRECT_SUFFIX: /[&]?\*=$/,
};
