/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useContentClickActionDetails } from '@/data/Content/ContentClickActionDetails';
import { useSettings } from '@/data/Settings';
import { ACTIVITY_CONTENT } from '@/data/constants/gtm';
import { CONTENT_ACTIONS } from '@/data/constants/marketing';
import { EventsContext } from '@/data/context/events';
import { ESpotActivityContainer, ProcessedContent } from '@/data/types/Marketing';
import { parseContentAction } from '@/data/utils/parseContentAction';
import { MouseEvent, useCallback, useContext } from 'react';

type Props = Partial<Record<string, any>>;
export const useContentEvents = (_props?: Props) => {
	const { onPromotionClick } = useContext(EventsContext);
	const { settings } = useSettings();
	const { addToCartAction, addToWishlistAction } = useContentClickActionDetails();

	const onContentClick = useCallback(
		(content: ProcessedContent) => async (event: MouseEvent) => {
			const activity = content as unknown as Required<ESpotActivityContainer>;
			onPromotionClick({ gtm: { activity, type: ACTIVITY_CONTENT, settings } });

			// any other actions implied by the URL set on the content when it was created
			const linkAction = parseContentAction({ link: activity?.contentUrl });
			switch (linkAction?.action) {
				case CONTENT_ACTIONS.addToCartAction:
					addToCartAction(linkAction, event);
					break;
				case CONTENT_ACTIONS.addToWishListAction:
					addToWishlistAction(linkAction, event);
					break;
			}
		},
		[addToCartAction, addToWishlistAction, onPromotionClick, settings]
	);

	return { onContentClick };
};
