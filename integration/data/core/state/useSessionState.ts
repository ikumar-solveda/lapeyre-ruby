/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useSettings } from '@/data/Settings';
import { SESSION_STATE_KEY } from '@/data/constants/session';
import { GET_SESSION_BASE_STATE } from '@/data/state/byStore/session';
import { getStateUpdater, useSetState, useTrackedState } from '@/data/state/provider';
import { getStateKey } from '@/data/utils/getStateKey';
import { useCallback, useMemo } from 'react';

/**
 * React hook for use by the presentation layer to read some session-specific state
 * data and expose event handlers (actions) related to data changes.
 */
type SessionStateType = ReturnType<typeof GET_SESSION_BASE_STATE>;

export const useSessionState = () => {
	const { settings } = useSettings();
	const key = useMemo(() => getStateKey(SESSION_STATE_KEY, settings), [settings]);
	const sessionUpdater = useMemo(
		() =>
			getStateUpdater({
				key,
				baseState: GET_SESSION_BASE_STATE(key),
			}),
		[key]
	);

	const setState = useSetState();
	const fullState = useTrackedState();
	const sessionData = fullState[key] as SessionStateType;

	const saveSessionData = useCallback(
		(data: SessionStateType) =>
			sessionUpdater({
				setState,
				now: (_data) => ({ ..._data, ...data }),
			}),
		[sessionUpdater, setState]
	);

	const clearSessionData = useCallback(
		() =>
			sessionUpdater({
				setState,
				later: async (_data) => ({} as SessionStateType),
			}),
		[sessionUpdater, setState]
	);

	return {
		sessionData: sessionData || GET_SESSION_BASE_STATE(key),
		actions: { saveSessionData, clearSessionData },
	};
};
