/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useContext, useEffect } from 'react';
import { EventsContext } from '@/data/context/events';

export const useEventTracker = () => {
	const { registerEvent } = useContext(EventsContext);
	useEffect(() => {
		registerEvent('onPageView', () => {
			// do something
		});
	}, [registerEvent]);
	return {};
};
