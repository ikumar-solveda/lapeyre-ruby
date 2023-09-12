/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { AccountAddressFields } from '@/components/content/Account/parts/AddressFields';
import { AccountContactFields } from '@/components/content/Account/parts/ContactFields';
import { useCountry } from '@/data/Content/Country';
import { usePersonInfo } from '@/data/Content/PersonInfo';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { useForm } from '@/utils/useForm';
import { Box, Button, Grid, Stack, Typography, useTheme } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

export const AccountInformationForm: FC = () => {
	const AccountLabels = useLocalization('AccountSummary');
	const PersonalLabels = useLocalization('PersonalInformation');
	const { cancelEdit, savePersonInfo, personInfo } = useContext(ContentContext) as ReturnType<
		typeof usePersonInfo
	>;
	const { values, handleSubmit, formRef, handleInputChange, error, handleAutoCompleteInputChange } =
		useForm(personInfo);
	const { countries } = useCountry();
	const states = useMemo(
		() => countries.find((c) => c.displayName === values.country)?.states ?? [],
		[values.country, countries]
	);
	const {
		dimensions: { contentSpacing },
	} = useTheme();
	return (
		<Stack
			spacing={contentSpacing}
			component="form"
			noValidate
			ref={formRef}
			onSubmit={handleSubmit(savePersonInfo)}
		>
			<Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center">
				<Typography variant="h4" component="h3">
					{AccountLabels.Title.t()}
				</Typography>
				<Stack direction="row" spacing={1}>
					<Button
						variant="outlined"
						onClick={cancelEdit}
						data-testid="button-personal-information-cancel-edit"
						id="button-personal-information-cancel-edit"
					>
						{PersonalLabels.Cancel.t()}
					</Button>
					<Button
						variant="contained"
						type="submit"
						data-testid="button-personal-information-save-edit"
						id="button-personal-information-save-edit"
					>
						{PersonalLabels.SaveChanges.t()}
					</Button>
				</Stack>
			</Stack>
			<Box>
				<Grid container spacing={contentSpacing}>
					<Grid item xs={12} sm={6}>
						<AccountContactFields
							{...{
								values,
								handleInputChange,
								error,
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<AccountAddressFields
							{...{
								values,
								handleInputChange,
								handleAutoCompleteInputChange,
								error,
								countries,
								states,
							}}
						/>
					</Grid>
				</Grid>
			</Box>
		</Stack>
	);
};
