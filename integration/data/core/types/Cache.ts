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
	/**
	 * Only set cache to server level.
	 * For caching things only at the server that aren't necessarily returned in the fallback.
	 * @param key
	 * @param value
	 * @param scope
	 * @returns
	 */
	setPersistentOnly: (key: string, value: any, scope?: CacheScope) => void;
	get: (key: string, scope?: CacheScope) => Promise<any>;
	has: (key: string, scope?: CacheScope) => boolean;
	getRequestCache: () => Map<string, Promise<any>>;
};

export type CacheKeyName =
	| 'registerType'
	| 'pathIdentifier'
	| 'langId'
	| 'storeId'
	| 'currentTradingAgreementIds'
	| string;
