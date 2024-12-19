/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { at } from 'lodash';
import { DrawInterfaceTypesInput, MissingLogInput } from './types';

/**
 * @returns unique variable names found in template string.
 */
const extractVariableNames = (templateString: string) =>
	(templateString.match(/({{\s*[a-zA-Z0-9]+\s*}})/g) || [])
		.map((string) => string.replace('{{', '').replace('}}', '').trim())
		.filter((value, index, array) => array.indexOf(value) === index);

/**
 * @returns Types definition code for template string
 */
const drawInterfaceFunctionType = (templateString: string, nestLevel = 1) => {
	const variableNames = extractVariableNames(templateString);
	const numeric = variableNames.find((x) => x === parseInt(x).toString());
	return `${'\t'.repeat(nestLevel)}t: (${
		variableNames.length > 0
			? numeric
				? `args: [${variableNames.map(() => 'ArgTypes').join(', ')}, ...ArgTypes[]]`
				: `{${variableNames.join(', ')}}: TemplateArgs`
			: 'args?: [...ArgTypes[]]'
	}) => string;`;
};

const findWhereMissing = ({ missing, path }: MissingLogInput) =>
	Object.keys(
		Object.entries(missing).reduce(
			(missing, [lang, tree]) =>
				at(tree, [path.join('.')]).at(0) ? { ...missing, [lang]: true } : missing,
			{}
		)
	);

const drawKey = (key: string) => (/^(?!\d)[a-zA-Z0-9_]+$/.test(key) ? key : `'${key}'`);

export const drawInterfaceTypes = ({
	tree,
	path = [],
	missing,
	nestLevel = 1,
}: DrawInterfaceTypesInput): string =>
	Object.entries(tree)
		.map(([key, value]) => {
			const missingLangs = findWhereMissing({ missing, path: [...path, key] });
			return ['string', 'object'].includes(typeof value) && !key.endsWith('_plural')
				? `${
						missingLangs.length > 0 && typeof value === 'string'
							? `/** @deprecated WARNING Translation Missing in: ${missingLangs.join(' & ')} */\n\t`
							: ''
				  }${'\t'.repeat(nestLevel)}${drawKey(key)}: {\n${
						typeof value === 'object'
							? drawInterfaceTypes({
									tree: value,
									path: [...path, key],
									missing,
									nestLevel: nestLevel + 1,
							  })
							: drawInterfaceFunctionType(value, nestLevel + 1)
				  }\n${'\t'.repeat(nestLevel)}};`
				: '';
		})
		.join('\n');
