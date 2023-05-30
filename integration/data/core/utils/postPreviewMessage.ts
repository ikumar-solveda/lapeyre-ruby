/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PreviewMessage } from '@/data/types/Preview';

export const postPreviewMessage = ({ message }: { message: PreviewMessage }) => {
	if (window.self !== window.parent) {
		window.parent.postMessage(message, '*');
	}
};
