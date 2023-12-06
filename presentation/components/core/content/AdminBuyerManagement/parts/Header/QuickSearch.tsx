/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useAdmin_BuyerManagement } from '@/data/Content/Admin_BuyerManagement';
import { useLocalization } from '@/data/Localization';
import { ADDRESS_FIELD_LENGTH } from '@/data/constants/addressFields';
import { searchInitialValues } from '@/data/constants/admin_buyerManagement';
import { ContentContext } from '@/data/context/content';
import { useForm } from '@/utils/useForm';
import { Search } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { ChangeEvent, FC, useContext } from 'react';

export const AdminBuyerManagementHeaderQuickSearch: FC = () => {
	const localization = useLocalization('BuyerManagement');
	const { searchFormValue, buyerManagementValue } = useContext(ContentContext) as {
		buyerManagementValue: ReturnType<typeof useAdmin_BuyerManagement>;
		searchFormValue: ReturnType<typeof useForm<typeof searchInitialValues>>;
	};
	const { onDebouncedSearch } = buyerManagementValue;
	const { values, handleInputChange } = searchFormValue;
	const onLogonId = (event: ChangeEvent<HTMLInputElement>) => {
		handleInputChange(event);
		onDebouncedSearch({ [event.target.name]: event.target.value } as typeof values);
	};

	return (
		<TextField
			data-testid="logonId"
			id="logonId"
			name="logonId"
			placeholder={localization.SearchByLogonId.t()}
			onChange={onLogonId}
			value={values.logonId}
			inputProps={{ maxLength: ADDRESS_FIELD_LENGTH.logonId }}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton aria-label={localization.SearchByLogonId.t()} edge="end" type="submit">
							<Search />
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);
};
