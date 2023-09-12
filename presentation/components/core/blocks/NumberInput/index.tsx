/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { numberInputContainerSX } from '@/components/blocks/NumberInput/styles/container';
import { numberInputControlsSX } from '@/components/blocks/NumberInput/styles/controls';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { useLocalization } from '@/data/Localization';
import { combineSX } from '@/utils/combineSX';
import { convertMaybeStringToInt } from '@/utils/convertMaybeStringToInt';
import { formatNumberValue } from '@/utils/formatNumberValue';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { ChangeEvent, FC, FocusEvent, useEffect, useRef, useState } from 'react';

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
	onChange: (value: NumberValue) => void;
	customValidator?: (value: NumberValue) => boolean;
	disallowEmptyOnBlur?: boolean;
	maxLength?: number;
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
	sx,
	disallowEmptyOnBlur,
	customValidator,
	maxLength,
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

	const updateValue = (value: string) => {
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
			convertMaybeStringToInt({
				input: cleanedValue,
				decimalSeparator,
				thousandSeparator,
			})
		);
	};

	const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		updateValue(e.target.value);
	};

	const step = (amount: number) => () => updateValue(((internalValue ?? 0) + amount).toString());
	const inputRef = useRef<HTMLInputElement>();

	const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
		if (disallowEmptyOnBlur && e.target.value.trim() === '') {
			updateValue((min ?? fieldValue ?? '').toString());
		}
	};

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
			customValidator(internalValue)
				? inputRef.current.setCustomValidity('')
				: inputRef.current.setCustomValidity('error');
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
			inputProps={{
				'aria-label': common.quantity.t({ n: fieldValue ?? '' }),
				maxLength: maxLength ?? null,
			}}
			inputRef={inputRef}
			onBlur={onBlurHandler}
			InputProps={{
				startAdornment: showControls ? (
					<Button
						disabled={disabled}
						aria-label={common.decrement.t()}
						onClick={step(-1)}
						sx={numberInputControlsSX}
					>
						<RemoveIcon />
					</Button>
				) : (
					prefix && <InputAdornment position="start">{prefix}</InputAdornment>
				),
				endAdornment: showControls && (
					<Button
						disabled={disabled}
						onClick={step(1)}
						sx={numberInputControlsSX}
						aria-label={common.increment.t()}
					>
						<AddIcon />
					</Button>
				),
			}}
		/>
	);
};
