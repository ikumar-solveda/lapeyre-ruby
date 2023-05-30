/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { IncomingContent } from '@/data/types/IncomingContent';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { PAGE_TOKEN_NAME_CATEGORY } from '@/data/constants/layout';

// tokenValue is staticPageId, categoryId, productId
// tokenExternalValue is pageIdentifier, category identifier, part number.
const getApplicableTokenValue = (
	tokenExternalValue: string,
	tokenValue: string,
	tokenName: string
) => (tokenName === PAGE_TOKEN_NAME_CATEGORY ? tokenValue : tokenExternalValue);

export const getWidgetId = (props: IncomingContent) => {
	const { tokenExternalValue, tokenValue, tokenName } = props;
	return getApplicableTokenValue(tokenExternalValue, tokenValue, tokenName) ?? EMPTY_STRING;
};
