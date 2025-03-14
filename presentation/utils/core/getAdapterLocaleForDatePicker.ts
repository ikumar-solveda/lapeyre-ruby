/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { de, enUS, es, fr, it, ja, ko, pl, pt, ro, ru, zhCN, zhTW } from 'date-fns/locale';

const localeMap: Record<string, Locale> = {
	'en-us': enUS,
	'de-de': de,
	'ko-kr': ko,
	'es-es': es,
	'fr-fr': fr,
	'it-it': it,
	'ja-jp': ja,
	'pl-pl': pl,
	'pt-br': pt,
	'ro-ro': ro,
	'ru-ru': ru,
	'zh-cn': zhCN,
	'zh-tw': zhTW,
};
export const getAdapterLocaleForDatePicker = (locale: string) =>
	localeMap[locale as keyof typeof localeMap];
