/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

type TemplateArgs = Record<string, ArgTypes>;
type ArgTypes = string | number;

/**
 * @returns unique variable names found in template string.
 */
const extractVariableNames = (string: string) =>
	(string.match(/({{\s*[a-zA-Z0-9]+\s*}})/g) || [])
		.map((string) => string.replace('{{', '').replace('}}', '').trim())
		.filter((value, index, array) => array.indexOf(value) === index);

/**
 * Determines which variable name is the plural key, if any.
 * Checks for single variable shared between plural and singular
 * templates, otherwise checks for a shared "count" variable.
 */
const getPluralArgKey = (value: string | any, plural?: string) => {
	if (typeof value !== 'string' || !plural) return '';
	const pluralKeys = extractVariableNames(plural);
	const intersection = extractVariableNames(value).filter((value) => pluralKeys.includes(value));
	return intersection.length === 1
		? intersection.at(0)
		: intersection.includes('count')
		? 'count'
		: '';
};

/**
 * @returns localized string from provided template and arguments.
 */
const processLocalizationString = (
	{ value, plural, pluralArgKey }: Record<string, string>,
	args: TemplateArgs
) =>
	Object.entries(args).reduce(
		(string, [key, value]) =>
			string.replaceAll(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), value.toString()),
		plural && args[pluralArgKey] !== 1 ? plural : value
	);

/**
 * Localization translation retrieval wrapper.
 */
export const getLocalizationProxy = (object?: any): any =>
	new Proxy(object || {}, {
		get: (target, key: string) => {
			if (key !== 't') {
				const value = target[key];
				const plural = typeof key === 'string' ? target[`${key}_plural`] : undefined;
				return getLocalizationProxy(
					typeof value === 'object'
						? value
						: { value, plural, pluralArgKey: getPluralArgKey(value, plural) }
				);
			}
			return (args: TemplateArgs = {}) =>
				typeof target.value === 'string' ? processLocalizationString(target, args) : '';
		},
	});
