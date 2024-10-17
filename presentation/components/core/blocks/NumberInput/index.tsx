/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { numberInputContainerSX } from '@/components/blocks/NumberInput/styles/container';
import { numberInputControlsSX } from '@/components/blocks/NumberInput/styles/controls';
import { numberInputInputAdornmentSX } from '@/components/blocks/NumberInput/styles/inputAdornment';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { useLocalization } from '@/data/Localization';
import { combineSX } from '@/utils/combineSX';
import { convertMaybeStringToInt } from '@/utils/convertMaybeStringToInt';
import { formatNumberValue } from '@/utils/formatNumberValue';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { ChangeEvent, FC, FocusEvent, useCallback, useEffect, useRef, useState } from 'react';

type NumberValue = number | null;
type MaybeString = string | number | null;

type Props = Omit<TextFieldProps, 'onChange' | 'value'> & {
	value: MaybeString;
	loading?: boolean;
	min?: number;
	max?: number;
	precision?: number;
	thousandSeparator?: string;
	decimalSeparator?: string;
	showControls?: boolean;
	prefix?: string;
	postfix?: string;
	onChange: (value: NumberValue) => void;
	customValidator?: (value: NumberValue) => boolean;
	disallowEmptyOnBlur?: boolean;
	maxLength?: number;
	isControlled?: boolean; // indicates that the value is controlled by caller
};

/**
 * Number input field for incrementing and decrementing numbers, with formatting.
 * @note This component does not support fractional min/max values.
 */
export const NumberInput: FC<Props> = ({
	onChange,
	loading = false,
	precision = 0,
	decimalSeparator = '.',
	thousandSeparator = ',',
	showControls = false,
	value,
	min = 0,
	max,
	prefix,
	postfix,
	sx,
	disallowEmptyOnBlur,
	customValidator,
	maxLength = null,
	isControlled = false,
	...props
}) => {
	const common = useLocalization('Common');
	const [fieldValue, setFieldValue] = useState<MaybeString>(() =>
		formatNumberValue({ value, precision, decimalSeparator, thousandSeparator, min, max })
	);
	const [internalValue, setInternalValue] = useState<NumberValue>(() =>
		convertMaybeStringToInt({ input: value, decimalSeparator, thousandSeparator })
	);
	const [externalUpdate, setExternalUpdate] = useState<NumberValue>(() =>
		convertMaybeStringToInt({ input: value, decimalSeparator, thousandSeparator })
	);
	const { disabled } = props;

	const updateValue = useCallback(
		(value: string) => {
			const cleanedValue = formatNumberValue({
				value,
				precision,
				decimalSeparator,
				thousandSeparator,
				min,
				max,
			});
			setFieldValue(cleanedValue);
			setInternalValue(
				convertMaybeStringToInt({ input: cleanedValue, decimalSeparator, thousandSeparator })
			);
		},
		[decimalSeparator, max, min, precision, thousandSeparator]
	);

	const changeHandler = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => updateValue(e.target.value),
		[updateValue]
	);

	const step = useCallback(
		(amount: number) => () => updateValue(((internalValue ?? 0) + amount).toString()),
		[internalValue, updateValue]
	);
	const inputRef = useRef<HTMLInputElement>();

	const onBlurHandler = useCallback(
		(e: FocusEvent<HTMLElement>) => {
			const intValue = convertMaybeStringToInt({
				input: value,
				decimalSeparator,
				thousandSeparator,
			});
			const intFieldValue = convertMaybeStringToInt({
				input: fieldValue,
				decimalSeparator,
				thousandSeparator,
			});
			if (isControlled && intValue !== intFieldValue) {
				setTimeout(() => {
					setInternalValue(intValue);
					setExternalUpdate(intValue);
					setFieldValue(
						formatNumberValue({ value, precision, decimalSeparator, thousandSeparator, min, max })
					);
				}, 300);
			} else if (
				disallowEmptyOnBlur &&
				e.target instanceof HTMLInputElement &&
				e.target.value.trim() === ''
			) {
				updateValue((min ?? fieldValue ?? '').toString());
			}
		},
		[
			decimalSeparator,
			disallowEmptyOnBlur,
			fieldValue,
			isControlled,
			max,
			min,
			precision,
			thousandSeparator,
			updateValue,
			value,
		]
	);

	/**
	 * Fire change event if real values have changed
	 */
	useEffect(() => {
		if (!onChange || externalUpdate === internalValue) {
			return;
		}
		onChange(internalValue);
		setExternalUpdate(internalValue);
		if (inputRef.current && customValidator) {
			inputRef.current.setCustomValidity(customValidator(internalValue) ? '' : 'error');
			// We currently aren't showing built-in form validation message.
			// This just needs to be a non-empty string for useForm() to trigger error state.
		}
	}, [onChange, internalValue, externalUpdate, customValidator]);

	/**
	 * Update based on received input changes.
	 */
	useEffect(() => {
		const updatedValue = convertMaybeStringToInt({
			input: value,
			decimalSeparator,
			thousandSeparator,
		});
		setInternalValue(updatedValue);
		setExternalUpdate(updatedValue);
		setFieldValue(
			formatNumberValue({ value, precision, decimalSeparator, thousandSeparator, min, max })
		);
	}, [decimalSeparator, max, min, precision, thousandSeparator, value]);

	return loading ? (
		<ProgressIndicator />
	) : (
		<TextField
			{...props}
			value={fieldValue ?? ''}
			type="text"
			sx={combineSX([numberInputContainerSX(showControls), sx])}
			onChange={changeHandler}
			inputProps={{ 'aria-label': common.quantity.t({ n: fieldValue ?? '' }), maxLength }}
			inputRef={inputRef}
			onBlur={onBlurHandler}
			InputProps={{
				startAdornment: showControls ? (
					<Button
						disabled={disabled}
						aria-label={common.decrement.t()}
						onClick={step(-1)}
						onBlur={onBlurHandler}
						sx={numberInputControlsSX}
					>
						<RemoveIcon />
					</Button>
				) : prefix ? (
					<InputAdornment position="start" sx={numberInputInputAdornmentSX}>
						{prefix}
					</InputAdornment>
				) : null,
				endAdornment: showControls ? (
					<Button
						disabled={disabled}
						aria-label={common.increment.t()}
						onClick={step(1)}
						onBlur={onBlurHandler}
						sx={numberInputControlsSX}
					>
						<AddIcon />
					</Button>
				) : postfix ? (
					<InputAdornment position="end" sx={numberInputInputAdornmentSX}>
						{postfix}
					</InputAdornment>
				) : null,
			}}
		/>
	);
};
