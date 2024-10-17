/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { LOCAL_STORAGE_KEY } from '@/data/config/LOCAL_STORAGE_KEY';
import { SKIP_STORAGE_KEY } from '@/data/config/SKIP_STORAGE_KEY';
import { StateObject } from '@/data/types/Basic';
import { isStateCompatible } from '@/data/utils/isStateCompatible';
import { SetStateAction, useEffect, useState } from 'react';
import { createContainer } from 'react-tracked';

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

const findByKey = (prefix: string, key: string) => new RegExp(`^${prefix}\\b`).test(key);
const skipStorage = (key: string) => SKIP_STORAGE_KEY.find((prefix) => findByKey(prefix, key));
const goesToLocalStorage = (key: string) =>
	LOCAL_STORAGE_KEY.find((prefix) => findByKey(prefix, key));

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
		!skipStorage(key) &&
		(goesToLocalStorage(key)
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

export const useInitState = <B extends StateObject>(key: string, baseState: B): B => {
	const [initState, setInitState] = useState(baseState);

	useEffect(() => {
		const _fromSession =
			typeof window !== 'undefined' &&
			!skipStorage(key) &&
			(goesToLocalStorage(key)
				? window.localStorage?.getItem(`state-${key}`)
				: window.sessionStorage?.getItem(`state-${key}`));
		if (_fromSession && isValidJSON(_fromSession)) {
			const sessionData: B = JSON.parse(_fromSession);
			if (isStateCompatible({ base: baseState, comparison: sessionData })) {
				setInitState(sessionData);
			} else {
				setInitState({ ...baseState, initialized: true });
			}
		} else {
			setInitState({ ...baseState, initialized: true });
		}
	}, [baseState, key]);
	return initState;
};

/**
 * Saves current state to local or session storage, based on key.
 */
const persistState = <S>(key: string, state: S) =>
	!skipStorage(key)
		? goesToLocalStorage(key)
			? localStorage.setItem(`state-${key}`, JSON.stringify(state))
			: sessionStorage.setItem(`state-${key}`, JSON.stringify(state))
		: null;

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
