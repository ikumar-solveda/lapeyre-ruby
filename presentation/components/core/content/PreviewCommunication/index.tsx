/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useSettings } from '@/data/Settings';
import { usePreviewMessageState } from '@/data/state/usePreviewMessageState';
import { PreviewMessage } from '@/data/types/Preview';
import { FC, useCallback, useEffect } from 'react';

/**
 * This is used as app level message receiver.
 * @param param0
 * @returns
 */
export const PreviewCommunication: FC = () => {
	const { settings } = useSettings();
	const { setPreviewMessage } = usePreviewMessageState();
	const receiveMessage = useCallback(
		(event: MessageEvent<PreviewMessage>) => {
			if (window === window.parent || event.source !== window.parent) {
				// from unknown source
				return;
			}
			const data = event.data;
			if (data?.action && data.action.startsWith('PREVIEW')) {
				setPreviewMessage(data);
			}
		},
		[setPreviewMessage]
	);
	const { inPreview } = settings;
	useEffect(() => {
		if (inPreview) {
			window.addEventListener('message', receiveMessage);
		}
		return () => window.removeEventListener('message', receiveMessage);
	}, [inPreview, receiveMessage]);
	return null;
};
