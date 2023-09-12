/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useLocalization } from '@/data/Localization';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	SxProps,
	Theme,
} from '@mui/material';
import { FC, useId, useState } from 'react';

type Props = {
	label: string;
	name: string;
	value?: string;
	disabled?: boolean;
	placeholder?: string;
	inputProps?: object;
	required?: boolean;
	sx?: SxProps<Theme>;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: boolean;
	autoFocus?: boolean;
	helperText?: string;
};

export const PasswordInput: FC<Props> = ({
	label,
	name,
	value,
	disabled,
	placeholder,
	inputProps,
	required,
	sx,
	onChange,
	error = false,
	autoFocus = false,
	helperText = '',
}) => {
	const id = useId();
	const [showPassword, setShowPassword] = useState<boolean>(true);
	const passwordInputNLS = useLocalization('PasswordInput');

	return (
		<FormControl variant="outlined" sx={sx} fullWidth={true} error={error} required={required}>
			<InputLabel htmlFor={`${id}-adorned-password`}>{label}</InputLabel>
			<OutlinedInput
				id={`${id}-adorned-password`}
				data-testid={`${id}-adorned-password`}
				name={name}
				type={showPassword ? 'password' : 'text'}
				value={value}
				autoFocus={autoFocus}
				onChange={onChange}
				inputProps={inputProps}
				disabled={disabled}
				autoComplete="off"
				placeholder={placeholder}
				error={error}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label={passwordInputNLS.toggleLabel.t()}
							onClick={() => setShowPassword(!showPassword)}
							onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
								event.preventDefault();
							}}
							edge="end"
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
				label={label}
			/>
			{helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
		</FormControl>
	);
};
