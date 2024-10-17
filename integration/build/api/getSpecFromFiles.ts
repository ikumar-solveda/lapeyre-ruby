/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import fs from 'fs-extra';
import { isEmpty } from 'lodash';
import path from 'path';
import { APIConfig, Parameter, Paths, SpecFromFilesInput, SpecType } from './types';

const cleanEnumFromSchema = (paths: Paths) => {
	Object.entries(paths).forEach((path) =>
		Object.values(path).forEach(
			(method) =>
				typeof method !== 'string' &&
				(Array.isArray(method.parameters) ? method.parameters : []).forEach(
					(param: Parameter) => param.schema && delete param.schema.enum
				)
		)
	);
	return paths;
};

const filterByTags = (paths: Paths, configuration?: APIConfig) => {
	if (configuration) {
		const { includeTags, excludeTags } = configuration;

		if (!isEmpty(includeTags) || !isEmpty(excludeTags)) {
			Object.entries(paths).forEach(([path, methods]) => {
				Object.entries(methods).forEach(([method, { tags }]) => {
					if (!isEmpty(includeTags)) {
						// output only paths with tags that are included
						if (tags && !tags.some((tag) => includeTags[tag])) {
							delete paths[path][method];
						}
					} else if (!isEmpty(excludeTags)) {
						// output only paths with tags that are not excluded
						if (tags && tags.some((tag) => excludeTags[tag])) {
							delete paths[path][method];
						}
					}
				});
				if (isEmpty(methods)) {
					delete paths[path];
				}
			});
		}
	}
};

export const getSpecFromFiles = ({ files, inputDirectory, configuration }: SpecFromFilesInput) =>
	files
		.filter((file) => !file.startsWith('.') && file.endsWith('.json'))
		.reduce((specJson: SpecType | undefined, file) => {
			const spec = fs.readJSONSync(path.resolve(inputDirectory, file), 'utf-8');
			filterByTags(spec.paths, configuration);

			if (!specJson) return spec;
			specJson.tags = specJson.tags.concat(spec.tags);
			specJson.paths = {
				...specJson.paths,
				...cleanEnumFromSchema(spec.paths),
			};
			specJson.components.schemas = {
				...specJson.components.schemas,
				...spec.components.schemas,
			};
			return specJson;
		}, undefined);
