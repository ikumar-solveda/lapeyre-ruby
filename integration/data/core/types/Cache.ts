/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

export type CacheScope = {
	requestScope?: boolean;
	scopeKey?: unknown;
};

export type Cache = Pick<Map<string, Promise<any>>, 'get' | 'keys' | 'set' | 'values' | 'has'> & {
	set: (key: string, value: any, scope?: CacheScope) => Map<string, Promise<any>>;
	get: (key: string, scope?: CacheScope) => Promise<any>;
	has: (key: string, scope?: CacheScope) => boolean;
};
