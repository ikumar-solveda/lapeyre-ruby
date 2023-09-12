/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useSettings } from '@/data/Settings';
import { ACTIVITY_CONTENT } from '@/data/constants/gtm';
import { EventsContext } from '@/data/context/events';
import { ESpotActivityContainer, ProcessedContent } from '@/data/types/Marketing';
import { MouseEvent, useCallback, useContext } from 'react';

type Props = Partial<Record<string, any>>;
export const useContentEvents = (_props?: Props) => {
	const { onPromotionClick } = useContext(EventsContext);
	const { settings } = useSettings();

	const onContentClick = useCallback(
		(content: ProcessedContent) => async (_event: MouseEvent) => {
			const activity = content as unknown as Required<ESpotActivityContainer>;
			onPromotionClick({ gtm: { activity, type: ACTIVITY_CONTENT, settings } });
		},
		[onPromotionClick, settings]
	);

	return { onContentClick };
};
