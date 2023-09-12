/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { isEqual } from 'lodash';
import { Key } from 'swr';

/**
 * Generate a key matcher
 * @param keysToMatch record of keys to be matched against
 * @returns
 */
export const generateKeyMatcher =
	(keysToMatch: Record<any, boolean>) =>
	/**
	 *
	 * @param excludeKey The key that will be excluded from mutation.
	 * @returns
	 */
	(excludeKey: Key) =>
	/**
	 * Mutator key match function
	 * @param key the key to match
	 * @returns boolean.
	 */
	(key: Key) =>
		isEqual(key, excludeKey) ? false : Array.isArray(key) ? !!keysToMatch[key.at(-1)] : false;
