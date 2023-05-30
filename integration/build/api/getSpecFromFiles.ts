/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import fs from 'fs-extra';
import path from 'path';

type Parameter = {
	name?: string;
	schema: {
		type: string;
		enum?: string[];
	};
};

type Paths = {
	[path: string]: {
		[method: string]: {
			parameters: Parameter[];
		};
	};
};

type SpecFromFilesInput = {
	files: string[];
	inputDirectory: string;
};

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

export const getSpecFromFiles = ({
	files,
	inputDirectory,
}: SpecFromFilesInput) =>
	files
		.filter((file) => !file.startsWith('.') && file.endsWith('.json'))
		.reduce(
			(
				specJson:
					| {
							tags: string[];
							paths: Paths;
							components: { schemas: Record<string, string> };
					  }
					| undefined,
				file
			) => {
				const spec = fs.readJSONSync(
					path.resolve(inputDirectory, file),
					'utf-8'
				);
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
			},
			undefined
		);
