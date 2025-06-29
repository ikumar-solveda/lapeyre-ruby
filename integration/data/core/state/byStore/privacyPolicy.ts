/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { getInitState } from '@/data/state/provider';
import { PrivacyPolicy } from '@/data/types/PrivacyPolicy';

const PRIVACY_POLICY_BASE = { sessionId: '' };

export const GET_PRIVACY_POLICY_BASE_STATE = (key: string): PrivacyPolicy =>
	getInitState(key, PRIVACY_POLICY_BASE);
