/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useSettings } from '@/data/Settings';
import { REMEMBER_ME_STATE_KEY } from '@/data/constants/rememberMe';
import { GET_REMEMBER_ME_BASE_STATE } from '@/data/state/byStore/rememberMe';
import { getStateUpdater, useSetState, useTrackedState } from '@/data/state/provider';
import { RememberMe } from '@/data/types/RememberMe';
import { getStateKey } from '@/data/utils/getStateKey';
import { useCallback, useMemo } from 'react';

/**
 * React hook for use by the presentation layer to read rememberMe state
 * data and expose event handlers (actions) related to data changes.
 */

export const useRememberMeState = () => {
	const { settings } = useSettings();
	const key = useMemo(() => getStateKey(REMEMBER_ME_STATE_KEY, settings), [settings]);
	const baseState = useMemo(() => GET_REMEMBER_ME_BASE_STATE(key), [key]);
	const rememberMeUpdater = useMemo(
		() =>
			getStateUpdater({
				key,
				baseState,
			}),
		[baseState, key]
	);

	const setState = useSetState();
	const fullState = useTrackedState();
	const rememberMe = fullState[key] as RememberMe;

	const setRememberMe = useCallback(
		(remember: boolean) =>
			rememberMeUpdater({
				setState,
				now: (rememberMeState) => ({ ...rememberMeState, remember }),
			}),
		[rememberMeUpdater, setState]
	);

	return {
		rememberMe: rememberMe || baseState,
		actions: { setRememberMe },
	};
};
