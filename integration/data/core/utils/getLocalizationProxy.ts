/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

type TemplateArgs = Record<string, ArgTypes>;
type ArgTypes = string | number;

/**
 * @returns unique variable names found in template string.
 */
const EMPTY_MATCH: string[] = [];
const extractVariableNames = (search: string) => {
	const variables = (search.match(/({{\s*[a-zA-Z0-9]+\s*}})/g) || EMPTY_MATCH).reduce(
		(acc, variable) => {
			acc[variable.replaceAll(/{{\s*|\s*}}/g, '')] = true;
			return acc;
		},
		{} as Record<string, boolean>
	);
	return variables;
};

/**
 * Determines which variable name is the plural key, if any.
 * We assume if _plural key exists, it only exists for this purpose and then check if only a single
 *   variable is in the string, otherwise check for a "count" variable.
 */
const getPluralArgKey = (value: string | any, plural?: string) => {
	let rc = '';
	if (plural) {
		const variables = extractVariableNames(value);
		const keys = Object.keys(variables);
		rc = keys.length === 1 ? keys[0] : variables['count'] ? 'count' : rc;
	}
	return rc;
};

/**
 * @returns localized string from provided template and arguments.
 */
const processLocalizationString = (
	{ value, plural, pluralArgKey }: Record<string, string>,
	args: TemplateArgs
) =>
	Object.entries(args).reduce(
		(agg, [key, value]) => agg.replaceAll(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), value as string),
		plural && args[pluralArgKey] !== 1 ? plural : value
	);

const EMPTY_ARGS = {};
const get = (target: any, key: string): any => {
	if (key === 't') {
		return (args: TemplateArgs = EMPTY_ARGS) =>
			typeof target.value === 'string' ? processLocalizationString(target, args) : '';
	} else {
		const value = target[key];
		const plural = target[`${key}_plural`];
		return getLocalizationProxy(
			typeof value === 'object'
				? value
				: { value, plural, pluralArgKey: getPluralArgKey(value, plural) }
		);
	}
};

/**
 * Localization translation retrieval wrapper.
 */
const EMPTY_TARGET = {};
export const getLocalizationProxy = (object: any = EMPTY_TARGET) => new Proxy(object, { get });
