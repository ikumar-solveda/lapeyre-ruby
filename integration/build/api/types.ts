/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

export type APIConfig = {
	public: string;
	private: string;
	envHostKey: string;
};

export type APISpecData = {
	directoryName: string;
	configuration: APIConfig;
	bundleFile: string;
	output: string;
};
