/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

export type APIConfigFromFile = {
	public: string;
	private: string;
	envHostKey: string;
	includeTags?: string[];
	excludeTags?: string[];
};

export type APIConfig = {
	public: string;
	private: string;
	envHostKey: string;
	includeTags: Record<string, string>;
	excludeTags: Record<string, string>;
};

export type APISpecData = {
	directoryName: string;
	configuration: APIConfig;
	bundleFile: string;
	output: string;
};

export type Parameter = {
	name?: string;
	schema: {
		type: string;
		enum?: string[];
	};
};

export type Paths = {
	[path: string]: {
		[method: string]: {
			parameters: Parameter[];
			tags?: string[];
		};
	};
};

export type SpecFromFilesInput = {
	files: string[];
	inputDirectory: string;
	configuration?: APIConfig;
};

export type SpecType = {
	tags: string[];
	paths: Paths;
	components: { schemas: Record<string, string> };
};
