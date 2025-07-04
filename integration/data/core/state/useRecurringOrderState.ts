/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023, 2024.
 */

import { useSettings } from '@/data/Settings';
import { RECURRING_ORDER_INFO_KEY } from '@/data/constants/recurringOrder';
import { RECURRING_ORDER_INFO } from '@/data/state/byStore/recurringOrderInfo';
import { getStateUpdater, useSetState, useTrackedState } from '@/data/state/provider';
import { RecurringOrderState } from '@/data/types/RecurringOrder';
import { getStateKey } from '@/data/utils/getStateKey';
import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent, useCallback, useMemo } from 'react';

/**
 * React hook for use by the presentation layer at APP level
 * to read and set preview message from tooling UI.
 */

export const useRecurringOrderState = () => {
	const { settings } = useSettings();
	const key = useMemo(() => getStateKey(RECURRING_ORDER_INFO_KEY, settings), [settings]);
	const baseState = useMemo(() => RECURRING_ORDER_INFO(key), [key]);
	const recurringStateUpdater = useMemo(
		() =>
			getStateUpdater({
				key,
				baseState,
			}),
		[baseState, key]
	);

	const setState = useSetState();
	const fullState = useTrackedState();
	const recurringOrderInfo = fullState[key] as RecurringOrderState;

	const setEnablement = useCallback(
		(_event: ChangeEvent, value: boolean) =>
			recurringStateUpdater({
				setState,
				now: () => ({
					frequency: 'Everyday',
					startDate: new Date().toISOString(),
					isRecurring: value,
				}),
			}),
		[recurringStateUpdater, setState]
	);

	const setFrequency = useCallback(
		(event: SelectChangeEvent) =>
			recurringStateUpdater({
				setState,
				now: (prev) => ({ ...prev, frequency: event.target.value }),
			}),
		[recurringStateUpdater, setState]
	);

	const setStartDate = useCallback(
		(value: Date | null = new Date()) =>
			recurringStateUpdater({
				setState,
				now: (prev: RecurringOrderState) => ({
					...prev,
					startDate: value?.toISOString(),
				}),
			}),
		[recurringStateUpdater, setState]
	);

	const setEndDate = useCallback(
		(value: Date | null = new Date()) =>
			recurringStateUpdater({
				setState,
				now: (prev: RecurringOrderState) => ({
					...prev,
					endDate: value?.toISOString(),
				}),
			}),
		[recurringStateUpdater, setState]
	);

	const setRecurringOrderDetails = useCallback(
		(isRecurring: boolean, frequency: string, startDate: string, endDate: string) =>
			recurringStateUpdater({
				setState,
				now: (recurringOrderInfo) => ({
					...recurringOrderInfo,
					isRecurring,
					frequency,
					startDate,
					endDate,
				}),
			}),
		[recurringStateUpdater, setState]
	);

	const resetRecurringOrderDetails = useCallback(
		() =>
			recurringStateUpdater({
				setState,
				later: async (recurringOrderInfo) => ({
					...recurringOrderInfo,
					isRecurring: false,
					frequency: 'Everyday',
					startDate: new Date().toISOString(),
					endDate: new Date().toISOString(),
				}),
			}),
		[recurringStateUpdater, setState]
	);

	return {
		recurringOrderInfo: recurringOrderInfo || baseState,
		actions: {
			setEnablement,
			setFrequency,
			setStartDate,
			setEndDate,
			setRecurringOrderDetails,
			resetRecurringOrderDetails,
		},
	};
};
