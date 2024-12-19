/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { WL_NAME_REGEX } from '@/data/constants/wishlist';

export const invalidWishListName = (name: string) =>
	!name?.trim().length || !WL_NAME_REGEX.test(name);
