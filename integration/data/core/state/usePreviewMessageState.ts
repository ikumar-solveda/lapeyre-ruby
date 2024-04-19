/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useSettings } from '@/data/Settings';
import { PREVIEW_MESSAGE } from '@/data/constants/previewMessage';
import { GET_PREVIEW_MESSAGE_BASE_STATE } from '@/data/state/byStore/previewMessage';
import { getStateUpdater, useSetState, useTrackedState } from '@/data/state/provider';
import { PreviewMessage } from '@/data/types/Preview';
import { getStateKey } from '@/data/utils/getStateKey';
import { useCallback, useMemo } from 'react';

/**
 * React hook for use by the presentation layer at APP level
 * to read and set preview message from tooling UI.
 */

export const usePreviewMessageState = () => {
	const { settings } = useSettings();
	const key = useMemo(() => getStateKey(PREVIEW_MESSAGE, settings), [settings]);
	const baseState = useMemo(() => GET_PREVIEW_MESSAGE_BASE_STATE(key), [key]);
	const previewMessageUpdater = useMemo(
		() =>
			getStateUpdater({
				key,
				baseState,
			}),
		[baseState, key]
	);

	const setState = useSetState();
	const fullState = useTrackedState();
	const previewMessage = fullState[key] as PreviewMessage;

	const setPreviewMessage = useCallback(
		(message: PreviewMessage) =>
			previewMessageUpdater({
				setState,
				now: (_pre) => message,
			}),
		[previewMessageUpdater, setState]
	);

	return {
		setPreviewMessage,
		previewMessage: previewMessage || baseState,
	};
};

export { postPreviewMessage } from '@/data/utils/postPreviewMessage';
