/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PREVIEW_MESSAGE } from '@/data/constants/previewMessage';
import { PREVIEW_MESSAGE_BASE_STATE } from '@/data/state/base/previewMessage';
import { getStateUpdater, useSetState, useTrackedState } from '@/data/state/provider';
import { PreviewMessage } from '@/data/types/Preview';
import { useCallback } from 'react';

const previewMessageUpdater = getStateUpdater({
	key: PREVIEW_MESSAGE,
	baseState: PREVIEW_MESSAGE_BASE_STATE,
});

/**
 * React hook for use by the presentation layer at APP level
 * to read and set preview message from tooling UI.
 */

export const usePreviewMessageState = () => {
	const setState = useSetState();
	const { previewMessage } = useTrackedState() as {
		previewMessage: PreviewMessage;
	};

	const setPreviewMessage = useCallback(
		(message: PreviewMessage) =>
			previewMessageUpdater({
				setState,
				now: (_pre) => message,
			}),
		[setState]
	);

	return {
		setPreviewMessage,
		previewMessage: previewMessage || PREVIEW_MESSAGE_BASE_STATE,
	};
};

export { postPreviewMessage } from '@/data/utils/postPreviewMessage';
