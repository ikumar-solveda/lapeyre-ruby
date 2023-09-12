/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PREVIEW_MESSAGE } from '@/data/constants/previewMessage';
import { getInitState } from '@/data/state/provider';
import { PreviewMessage } from '@/data/types/Preview';

const initMessage: PreviewMessage = {
	data: null,
	action: 'PREVIEW_NO_OP',
};

/**
 * @deprecated no longer maintained -- DO NOT USE
 */
export const PREVIEW_MESSAGE_BASE_STATE = getInitState(PREVIEW_MESSAGE, initMessage);
