/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { PasswordInput } from '@/components/blocks/PasswordInput';
import { accountChangePasswordFormSX } from '@/components/content/Account/styles/changePasswordForm';
import type { ChangePasswordValues } from '@/data/Content/PersonInfo';
import { useLocalization } from '@/data/Localization';
import type { useForm } from '@/utils/useForm';
import { Stack } from '@mui/material';
import { escapeRegExp } from 'lodash';
import type { FC } from 'react';

type Props = ReturnType<typeof useForm<ChangePasswordValues>>;

export const AccountChangePasswordFormV2: FC<Props> = ({ values, error, handleInputChange }) => {
	const ChangePasswordLabels = useLocalization('ChangePassword');
	return (
		<Stack display="block" spacing={3} sx={accountChangePasswordFormSX}>
			<PasswordInput
				value={values.xcred_logonPasswordOld}
				required
				label={ChangePasswordLabels.CurrentPasswordLabel.t()}
				autoFocus
				error={error.xcred_logonPasswordOld}
				name="xcred_logonPasswordOld"
				onChange={handleInputChange}
			/>
			<PasswordInput
				value={values.logonPassword}
				required
				error={error.logonPassword}
				label={ChangePasswordLabels.NewPasswordLabel.t()}
				name="logonPassword"
				onChange={handleInputChange}
				inputProps={{
					maxLength: 100,
					pattern: escapeRegExp(values.xcred_logonPasswordVerify),
				}}
			/>
			<PasswordInput
				value={values.xcred_logonPasswordVerify}
				required
				error={error.xcred_logonPasswordVerify}
				label={ChangePasswordLabels.VerifyPasswordLabel.t()}
				name="xcred_logonPasswordVerify"
				onChange={handleInputChange}
				inputProps={{
					maxLength: 100,
					pattern: escapeRegExp(values.logonPassword),
				}}
			/>
		</Stack>
	);
};
