/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import {
	DATA_KEY_QUOTE_ATTACHMENTS,
	DATA_KEY_QUOTE_BY_ID,
	DATA_KEY_QUOTE_COMMENTS,
	DATA_KEY_QUOTE_ITEMS,
	DATA_KEY_QUOTE_UPLOAD_FILE_STATUS,
	DATA_KEY_QUOTES,
} from '@/data/constants/dataKey';
import { generateKeyMatcher } from '@/data/utils/generateKeyMatcher';

const keysToMatch: Record<string, boolean> = {
	[DATA_KEY_QUOTES]: true,
	[DATA_KEY_QUOTE_BY_ID]: true,
	[DATA_KEY_QUOTE_COMMENTS]: true,
	[DATA_KEY_QUOTE_ITEMS]: true,
	[DATA_KEY_QUOTE_ATTACHMENTS]: true,
	[DATA_KEY_QUOTE_UPLOAD_FILE_STATUS]: true,
};

export const quoteMutatorKeyMatcher = generateKeyMatcher(keysToMatch);

const keysToMatchQuoteItems: Record<string, boolean> = { [DATA_KEY_QUOTE_ITEMS]: true };
export const quoteItemsMutatorKeyMatcher = generateKeyMatcher(keysToMatchQuoteItems);

const keysToMatchQuoteAttachments: Record<string, boolean> = { [DATA_KEY_QUOTE_ATTACHMENTS]: true };
export const quoteAttachmentsMutatorKeyMatcher = generateKeyMatcher(keysToMatchQuoteAttachments);
