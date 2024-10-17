/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import {
	GOOGLE_MAPS_API_LOCALE_BASE_STATE,
	GOOGLE_MAPS_API_LOCALE_STATE_KEY,
} from '@/data/constants/googleMaps';
import { getStateUpdater, useSetState, useTrackedState } from '@/data/state/provider';
import { useCallback, useMemo } from 'react';

/**
 * React hook for use by the presentation layer to read and update locale
 * of the current Google Map API.
 */
export const useGoogleMapsAPILocale = () => {
	const key = GOOGLE_MAPS_API_LOCALE_STATE_KEY;
	const baseState = GOOGLE_MAPS_API_LOCALE_BASE_STATE;
	const localeUpdater = useMemo(
		() =>
			getStateUpdater({
				key,
				baseState,
			}),
		[baseState, key]
	);

	const setState = useSetState();
	const fullState = useTrackedState();
	const APILocale = fullState[key] as { locale: string };

	const saveLocale = useCallback(
		(locale: string) =>
			localeUpdater({
				setState,
				now: (APILocale) => ({ ...APILocale, locale }),
			}),
		[localeUpdater, setState]
	);
	return {
		loadedLocale: APILocale || baseState,
		actions: { saveLocale },
	};
};
