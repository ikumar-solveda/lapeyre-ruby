/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { UNUSED_CATEGORY_KEYS } from '@/data/constants/omitKeys_Category';
import type { CategoryType } from '@/data/types/Category';
import { recursiveOmit } from '@/data/utils/recursiveOmit';

export const omitKeys_Category = (category: CategoryType) =>
	recursiveOmit(category, UNUSED_CATEGORY_KEYS);
