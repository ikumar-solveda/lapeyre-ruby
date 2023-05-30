/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { AutocompleteInputChangeReason, SelectChangeEvent } from '@mui/material';
import { mapValues } from 'lodash';
import {
	ChangeEvent,
	FormEvent,
	RefObject,
	SyntheticEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useNotifications } from '@/data/Content/Notifications';

type FormInput = Record<string, unknown> & {
	dirty?: boolean;
};

type Submit<T extends FormInput> = (values: T, event?: FormEvent<HTMLFormElement>) => void;

export type ErrorState<T extends FormInput> = { [k in keyof T]: boolean };

export type FormState<T extends FormInput> = {
	values: T;
	handleAutoCompleteInputChange: (
		name: keyof T
	) => (
		_event: React.SyntheticEvent,
		value: string,
		_reason: AutocompleteInputChangeReason
	) => void;
	handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
	handleSelectChange: (event: SelectChangeEvent) => void;
	onNamedValueChange: (name: keyof T, value: string) => void;
	error: ErrorState<T>;
	/**
	 * If the values of Type T `dirty===false`, the `onSubmit` function shall skip the actual update
	 * @param onSubmit
	 * @param event
	 * @returns
	 */
	handleSubmit: (
		onSubmit: Submit<T>,
		event?: SubmitEvent
	) => (event: FormEvent<HTMLFormElement>) => void;
	formRef: RefObject<HTMLFormElement>;
};

const focusOnFirstError = (form?: HTMLFormElement) => {
	if (!form) return;
	const length = form.elements.length;
	// eslint-disable-next-line functional/no-loop-statement
	for (let i = 0; i < length; i++) {
		const element = form.elements.item(i) as HTMLInputElement;
		const error = element?.checkValidity ? !element.checkValidity() : false;
		if (error) {
			element.focus();
			return;
		}
	}
};

const getFormFields = (form: HTMLFormElement | null): string[] => {
	const rc = [];
	if (form) {
		const length = form.elements.length;
		// eslint-disable-next-line functional/no-loop-statement
		for (let i = 0; i < length; i++) {
			const element = form.elements.item(i) as HTMLInputElement;
			if (element.name) {
				rc.push(element.name);
			}
		}
	}
	return rc;
};

export const useForm = <T extends FormInput>(input: T): FormState<T> => {
	const formRef = useRef<HTMLFormElement>(null);
	const [values, setValues] = useState<T>(() => input);
	const [showError, setShowError] = useState(false);
	const initialError = useMemo(
		() =>
			Object.keys(input).reduce(
				(initial, current) => ({ ...initial, [current]: false }),
				{} as ErrorState<T>
			),
		[input]
	);

	const [error, setError] = useState<ErrorState<T>>(() => initialError);
	const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const elm = event.target;
		const { name, value, type, checked } = elm;
		const _name = name as keyof T;
		setValues((previousValues) => ({
			...previousValues,
			[_name]: type === 'checkbox' ? checked : value,
			...(previousValues.dirty !== undefined && { dirty: true }),
		}));
	}, []);
	const handleSelectChange = useCallback((event: SelectChangeEvent) => {
		const elm = event.target;
		const { name, value } = elm;
		const _name = name as keyof T;
		setValues((previousValues) => ({
			...previousValues,
			[_name]: value,
			...(previousValues.dirty !== undefined && { dirty: true }),
		}));
	}, []);
	const handleAutoCompleteInputChange = useCallback(
		(name: keyof T) =>
			(_event: SyntheticEvent, value: string, _reason: AutocompleteInputChangeReason) => {
				setValues((previousValues) => ({
					...previousValues,
					[name]: value,
					...(previousValues.dirty !== undefined && { dirty: true }),
				}));
			},
		[]
	);
	const onNamedValueChange = useCallback((name: keyof T, value: string) => {
		setValues((previousValues) => ({
			...previousValues,
			[name]: value,
			...(previousValues.dirty !== undefined && { dirty: true }),
		}));
	}, []);

	const { clearMessage } = useNotifications();
	const handleSubmit = useCallback(
		(onSubmit: (currentValues: T, event?: FormEvent<HTMLFormElement>) => void) =>
			(event: FormEvent<HTMLFormElement>) => {
				clearMessage();
				event.preventDefault();
				setValues((previousValues) =>
					mapValues(previousValues, (value: any) =>
						typeof value === 'string' ? value.trim() : value
					)
				);
				if (values.dirty === false || formRef.current?.checkValidity()) {
					onSubmit(values, event);
				} else {
					focusOnFirstError(event?.currentTarget);
					setShowError(true);
				}
			},
		[values, clearMessage]
	);

	useEffect(() => {
		if (showError) {
			const fields = getFormFields(formRef.current);
			const newError = (fields as (keyof T)[]).reduce((previousError, fieldName) => {
				let element: HTMLInputElement = formRef.current?.[fieldName as string];
				if (element instanceof RadioNodeList) {
					element = element[0] as HTMLInputElement;
				}
				previousError[fieldName] = element?.checkValidity ? !element.checkValidity() : false;
				return previousError;
			}, {} as ErrorState<T>);
			setError(newError);
		} else {
			setError(initialError);
		}
	}, [initialError, showError, values]);

	useEffect(() => setValues(() => input), [input]);

	return {
		values,
		handleAutoCompleteInputChange,
		handleInputChange,
		handleSelectChange,
		onNamedValueChange,
		handleSubmit,
		error,
		formRef,
	};
};
