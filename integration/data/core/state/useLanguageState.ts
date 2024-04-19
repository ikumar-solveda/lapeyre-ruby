/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useSettings } from '@/data/Settings';
import { LANGUAGE_STATE_KEY } from '@/data/constants/language';
import { GET_LANGUAGE_BASE_STATE } from '@/data/state/byStore/language';
import { getStateUpdater, useSetState, useTrackedState } from '@/data/state/provider';
import { SelectedLanguage } from '@/data/types/Language';
import { getStateKey } from '@/data/utils/getStateKey';
import { useCallback, useMemo } from 'react';

/**
 * React hook for use by the presentation layer to read selected language state
 * data and expose event handlers (actions) related to data changes.
 */

export const useLanguageState = () => {
	const { settings } = useSettings();
	const key = useMemo(() => getStateKey(LANGUAGE_STATE_KEY, settings), [settings]);
	const baseState = useMemo(() => GET_LANGUAGE_BASE_STATE(key), [key]);
	const languageUpdater = useMemo(
		() =>
			getStateUpdater({
				key,
				baseState,
			}),
		[baseState, key]
	);

	const setState = useSetState();
	const fullState = useTrackedState();
	const language = fullState[key] as SelectedLanguage;

	const saveLanguage = useCallback(
		(locale: string, sessionId: string) =>
			languageUpdater({
				setState,
				now: (language) => ({ ...language, sessionId, locale }),
			}),
		[languageUpdater, setState]
	);

	const updateRejectedLanguage = useCallback(
		(rejectedLocale: Record<string, boolean>) =>
			languageUpdater({
				setState,
				now: (language) => ({ ...language, rejectedLocale }),
			}),
		[languageUpdater, setState]
	);

	return {
		language: language || baseState,
		actions: { saveLanguage, updateRejectedLanguage },
	};
};
