/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import type { ProductSuggestionEntry } from 'integration/generated/query/data-contracts';

export type SuggestionBySearchTermQuery = {
	/** Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work. */
	pageSize?: number;
	/** Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work. */
	pageNumber?: number;
	/** The search type is a numeric string which controls the query operator: ANY, OR, AND and control what data to be returned. For a detailed list of valid values, see the online documentation on Match type (_wcf.search.type). Known valid values include : 0: ANY (exclude SKU)1: EXACT (exclude SKU), 2: ALL (exclude SKU), 3: NONE (exclude SKU), 10: ANY (include SKU), 11: EXACT (include SKU), 12: ALL (include SKU), 13: NONE (include SKU), 100: ANY (only SKU), 101: EXACT (only SKU), 102: ALL (only SKU), 103: NONE (only SKU), 1000: ANY (include products, kits, bundles, category level SKU) (exclude product level SKU), 1001: EXACT (include products, kits, bundles, category level SKU) (exclude product level SKU), 1002: ALL (include products, kits, bundles, category level SKU) (exclude product level SKU), 1003: NONE (include products, kits, bundles, category level SKU) (exclude product level SKU), 10000: ANY (include category level SKU) (exclude products, kits, bundles, product level SKU), 10001: EXACT (include category level SKU) (exclude products, kits, bundles, product level SKU), 10002: ALL (include category level SKU) (exclude products, kits, bundles, product level SKU), 10003: NONE (include category level SKU) (exclude products, kits, bundles, product level SKU) */
	searchType?: number;
	/** The sorting to be used in the returned result, "count" or "index". By default, it is "count". */
	term?: boolean;
	/** The contractId */
	contractId?: string;
	/** Language identifier. If not specified, the "locale" parameter will be used. If "locale" is not specified, then the store default language will be used. */
	langId?: string;
	/** The sorting to be used in the returned result, "count" or "index". By default, it is "count". */
	termsSort?: boolean;
	/** The catalog identifier. If none is specified, the store default catalog will be used. */
	catalogId?: string;
	/** Option to force an entitlement check. */
	checkEntitlement?: boolean;
	/** Profile name. Profiles determine the subset of data to be returned by a search query. */
	profileName?: string;
};

export type { ProductSuggestionEntry };
