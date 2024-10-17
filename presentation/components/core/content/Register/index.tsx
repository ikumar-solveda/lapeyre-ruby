/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FlowIfEnabled } from '@/components/blocks/FlexFlow';
import { Linkable } from '@/components/blocks/Linkable';
import { MarketingConsentChoice } from '@/components/blocks/MarketingConsentChoice';
import { PasswordInput } from '@/components/blocks/PasswordInput';
import { registerButtonSX } from '@/components/content/Register/styles/button';
import { registerContainerSX } from '@/components/content/Register/styles/container';
import { useRegistration } from '@/data/Content/Registration';
import { useLocalization } from '@/data/Localization';
import { ADDRESS_FIELD_LENGTH } from '@/data/constants/addressFields';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ID } from '@/data/types/Basic';
import { REG_EX } from '@/utils/address';
import { useForm } from '@/utils/useForm';
import {
	Button,
	Checkbox,
	Divider,
	FormControlLabel,
	Grid,
	Paper,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { escapeRegExp } from 'lodash';
import { FC } from 'react';

export const Register: FC<{ id: ID }> = () => {
	const registerNLS = useLocalization('RegistrationLayout');
	const RouteLocal = useLocalization('Routes');

	const { registrationSubmit, initialRegistration } = useRegistration();
	const {
		formRef,
		values: registrationValues,
		handleInputChange: handleChange,
		handleSubmit,
		error,
		submitting,
	} = useForm(initialRegistration);

	return (
		<Grid container spacing={2}>
			<Grid item xs={12} md={6} m="auto">
				<Paper
					sx={registerContainerSX}
					component="form"
					onSubmit={handleSubmit(registrationSubmit)}
					ref={formRef}
					noValidate
				>
					<Stack spacing={2}>
						<Typography variant="h4">{registerNLS.Register.t()}</Typography>
						<TextField
							margin="normal"
							required
							name="logonId"
							label={registerNLS.LogonId.t()}
							autoFocus
							value={registrationValues.logonId}
							onChange={handleChange}
							inputProps={{
								maxLength: ADDRESS_FIELD_LENGTH.logonId,
								'data-testid': 'logonId-textfield-register',
							}}
							error={error.logonId}
							helperText={error.logonId ? registerNLS.Msgs.InvalidFormat.t() : EMPTY_STRING}
						/>
						<Grid container>
							<Grid item xs={12} sm={6} pr={{ xs: 0, sm: 1 }}>
								<TextField
									margin="none"
									required
									fullWidth
									name="firstName"
									label={registerNLS.FirstName.t()}
									error={error.firstName}
									value={registrationValues.firstName}
									onChange={handleChange}
									inputProps={{
										maxLength: 40,
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={6} pl={{ xs: 0, sm: 1 }} mt={{ xs: 2, sm: 0 }}>
								<TextField
									margin="none"
									required
									fullWidth
									name="lastName"
									label={registerNLS.LastName.t()}
									error={error.lastName}
									value={registrationValues.lastName}
									onChange={handleChange}
									inputProps={{
										maxLength: 40,
									}}
								/>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs={12} sm={6} pr={{ xs: 0, sm: 1 }}>
								<PasswordInput
									required
									name="logonPassword"
									label={registerNLS.Password.t()}
									value={registrationValues.logonPassword}
									onChange={handleChange}
									error={error.logonPassword}
									inputProps={{
										maxLength: 100,
										pattern: escapeRegExp(registrationValues.logonPasswordVerify),
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={6} pl={{ xs: 0, sm: 1 }} mt={{ xs: 2, sm: 0 }}>
								<PasswordInput
									required
									name="logonPasswordVerify"
									label={registerNLS.VerifyPassword.t()}
									value={registrationValues.logonPasswordVerify}
									error={error.logonPasswordVerify}
									onChange={handleChange}
									inputProps={{
										maxLength: 100,
										pattern: escapeRegExp(registrationValues.logonPassword),
									}}
								/>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs={12} sm={6} pr={{ xs: 0, sm: 1 }}>
								<TextField
									fullWidth
									margin="none"
									required
									name="email"
									label={registerNLS.Email.t()}
									autoFocus
									value={registrationValues.email}
									onChange={handleChange}
									inputProps={{
										maxLength: 100,
										type: 'email',
										placeholder: registerNLS.emailPlaceholder.t(),
										pattern: REG_EX.EMAIL.source,
									}}
									error={error.email}
									helperText={error.email ? registerNLS.Msgs.InvalidFormat.t() : EMPTY_STRING}
								/>
							</Grid>
							<Grid item xs={12} sm={6} pl={{ xs: 0, sm: 1 }} mt={{ xs: 2, sm: 0 }}>
								<TextField
									margin="none"
									fullWidth
									inputProps={{
										maxLength: 32,
										type: 'tel',
										pattern: REG_EX.PHONE.source,
									}}
									label={registerNLS.Phone.t()}
									name="phone1"
									onChange={handleChange}
									value={registrationValues.phone1}
									error={error.phone1}
									helperText={error.phone1 ? registerNLS.Msgs.InvalidFormat.t() : EMPTY_STRING}
								/>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs={12}>
								<FormControlLabel
									control={
										<Checkbox
											name="receiveEmail"
											checked={registrationValues.receiveEmail}
											onChange={handleChange}
										/>
									}
									label={registerNLS.TextContent.t()}
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControlLabel
									control={
										<Checkbox
											name="rememberMe"
											checked={registrationValues.rememberMe}
											onChange={handleChange}
										/>
									}
									label={registerNLS.RememberMe.t()}
								/>
							</Grid>
						</Grid>
						<FlowIfEnabled feature={EMS_STORE_FEATURE.MARKETING_CONSENT}>
							<Stack>
								<MarketingConsentChoice
									name="marketingTrackingConsent"
									checked={registrationValues.marketingTrackingConsent || false}
									onChange={handleChange}
									value={registrationValues.marketingTrackingConsent || false}
								/>
							</Stack>
						</FlowIfEnabled>
						<Stack spacing={2}>
							<Stack alignItems="center">
								<Button
									type="submit"
									variant="contained"
									sx={registerButtonSX}
									disabled={submitting}
									data-testid="button-register-submit"
									id="button-register-submit"
								>
									{registerNLS.RegisterComplete.t()}
								</Button>
							</Stack>
							<Divider />
							<Stack alignItems="center" spacing={2}>
								<Typography variant="body1">{registerNLS.Account.t()}</Typography>
								<Linkable
									href={`/${RouteLocal.Login.route.t()}`}
									type="button"
									variant="outlined"
									sx={registerButtonSX}
									data-testid="button-register-signin"
									id="button-register-signin"
								>
									{registerNLS.SignIn.t()}
								</Linkable>
							</Stack>
						</Stack>
					</Stack>
				</Paper>
			</Grid>
		</Grid>
	);
};
