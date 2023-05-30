/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SELECTED_PROFILE } from '@/data/constants/checkoutProfile';
import { SELECTED_PROFILE_BASE_STATE } from '@/data/state/base/checkoutProfile';
import { getStateUpdater, useSetState, useTrackedState } from '@/data/state/provider';
import { SelectedProfile } from '@/data/types/CheckoutProfiles';
import { useCallback } from 'react';

const selectedProfileUpdater = getStateUpdater({
	key: SELECTED_PROFILE,
	baseState: SELECTED_PROFILE_BASE_STATE,
});

/**
 * React hook for use by the presentation layer to read selected store state
 * data and expose event handlers (actions) related to data changes.
 */

export const useSelectedProfileState = () => {
	const setState = useSetState();
	const { selectedProfile } = useTrackedState() as {
		selectedProfile: SelectedProfile;
	};

	const selectProfile = useCallback(
		(profile: string) =>
			selectedProfileUpdater({
				setState,
				now: (selectedProfile) => ({ ...selectedProfile, profile }),
			}),
		[setState]
	);

	const resetSelectedProfile = useCallback(
		() =>
			selectedProfileUpdater({
				setState,
				later: async (selectedProfile) => ({
					...selectedProfile,
					profile: '',
				}),
			}),
		[setState]
	);

	return {
		selectedProfile: selectedProfile || SELECTED_PROFILE_BASE_STATE,
		actions: { selectProfile, resetSelectedProfile },
	};
};
