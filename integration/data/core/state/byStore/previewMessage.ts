/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { getInitState } from '@/data/state/provider';
import { PreviewMessage } from '@/data/types/Preview';

const initMessage: PreviewMessage = {
	data: null,
	action: 'PREVIEW_NO_OP',
};

export const GET_PREVIEW_MESSAGE_BASE_STATE = (key: string) => getInitState(key, initMessage);
