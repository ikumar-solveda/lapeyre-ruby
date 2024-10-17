/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { getInitState } from '@/data/state/provider';
import { RememberMe } from '@/data/types/RememberMe';

const REMEMBER_ME_BASE = { remember: false };

export const GET_REMEMBER_ME_BASE_STATE = (key: string): RememberMe =>
	getInitState(key, REMEMBER_ME_BASE);
