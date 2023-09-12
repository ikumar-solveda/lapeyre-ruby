/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { getInitState } from '@/data/state/provider';
import { SelectedLanguage } from '@/data/types/Language';

export const GET_LANGUAGE_BASE_STATE = (key: string): SelectedLanguage =>
	getInitState(key, {
		locale: '',
		sessionId: '',
		rejectedLocale: {},
	});
