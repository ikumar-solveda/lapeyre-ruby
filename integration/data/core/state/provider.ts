/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SetStateAction, useState } from 'react';
import { createContainer } from 'react-tracked';
import { StateObject } from '@/data/types/Basic';
import { isStateCompatible } from '@/data/utils/isStateCompatible';
import { LOCAL_STORAGE_KEY } from '@/data/config/LOCAL_STORAGE_KEY';

const useValue = () => useState<StateObject>({});

export const {
	Provider: StateProvider,
	useTrackedState,
	useUpdate: useSetState,
} = createContainer(useValue);

const isValidJSON = (string: string) => {
	try {
		JSON.parse(string);
		return true;
	} catch (e) {
		return false;
	}
};

/**
 * Retrieves initial state from local or session storage, if present.
 * @param baseState Default starting state for the provided
 * key.
 * @example
 *
 * ```
 * export const CART_BASE_STATE: Cart = getInitState('cart', {
 * 	items: [],
 * });
 * ```
 */
export const getInitState = <B extends StateObject>(key: string, baseState: B): B => {
	const fromSession =
		typeof window !== 'undefined' &&
		(LOCAL_STORAGE_KEY.includes(key)
			? window.localStorage?.getItem(`state-${key}`)
			: window.sessionStorage?.getItem(`state-${key}`));
	if (fromSession && isValidJSON(fromSession)) {
		const sessionData: B = JSON.parse(fromSession);
		return isStateCompatible({ base: baseState, comparison: sessionData })
			? sessionData
			: baseState;
	}
	return baseState;
};

/**
 * Saves current state to local or session storage, based on key.
 */
const persistState = <S>(key: string, state: S) =>
	LOCAL_STORAGE_KEY.includes(key)
		? localStorage.setItem(`state-${key}`, JSON.stringify(state))
		: sessionStorage.setItem(`state-${key}`, JSON.stringify(state));

type StateUpdate<B> = {
	setState: (value: SetStateAction<StateObject>) => void;
	now?: (state: B) => B;
	later?: (state: B) => Promise<B>;
};

/**
 * For a given base state and key, an update method is returned
 * that provides a way to update state immediately (now) and after
 * an async method finishes (later).
 * @param baseState Default starting state for the provided
 * key.
 */
export const getStateUpdater =
	<B>({ key, baseState }: { key: string; baseState: B }) =>
	async ({ setState, now, later }: StateUpdate<B>) => {
		let oldState: StateObject = { [key]: baseState };
		setState((prev) => {
			oldState = prev;
			if (now) {
				const updated = now(prev[key] || baseState);
				persistState(key, updated);
				return { ...prev, [key]: updated };
			}
			return prev;
		});
		if (later) {
			const updated = await later(oldState[key] || baseState);
			persistState(key, updated);
			setState((prev) => ({ ...prev, [key]: updated }));
		}
	};
