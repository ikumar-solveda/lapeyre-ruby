/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { AdminOrganizationListItemDisplay } from '@/components/blocks/AdminOrganizationListItemDisplay';
import { SelectWithResize } from '@/components/blocks/SelectWithResize';
import { adminBuyerManagementOrganizationListMenu } from '@/components/content/AdminBuyerManagement/styles/organizationListMenu';
import { useAdmin_BuyerManagementAddBuyer } from '@/data/Content/Admin_BuyerManagementAddBuyer';
import { useAdmin_BuyerManagementBuyerDetails } from '@/data/Content/Admin_BuyerManagementBuyerDetails';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { ADDRESS_FIELD_LENGTH } from '@/data/constants/addressFields';
import { BUYER_MANAGEMENT } from '@/data/constants/admin_buyerManagement';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ContentContext } from '@/data/context/content';
import { AdminBuyerRegistrationValueType } from '@/data/types/Admin_BuyerRegistration';
import { REG_EX } from '@/utils/address';
import { useForm } from '@/utils/useForm';
import { FormControl, Grid, InputLabel, MenuItem, TextField } from '@mui/material';
import { FC, useContext, useRef } from 'react';

export const AdminBuyerManagementStepperOrganization: FC = () => {
	const { query } = useNextRouter();
	const { buyerId } = query;
	const localization = useLocalization('BuyerManagement');
	const { stepperFormValue, useBuyerManagementAddOrDetailsValue } = useContext(
		ContentContext
	) as unknown as {
		useBuyerManagementAddOrDetailsValue: ReturnType<
			typeof useAdmin_BuyerManagementAddBuyer & typeof useAdmin_BuyerManagementBuyerDetails
		>;
		stepperFormValue: ReturnType<typeof useForm<AdminBuyerRegistrationValueType>>;
	};

	const { organizations } = useBuyerManagementAddOrDetailsValue;
	const { handleInputChange, handleSelectChange, values, error } = stepperFormValue;
	const { settings } = useSettings();
	const { supportedCurrencies, supportedLanguages } = settings;
	const { language: langLocale, currency: currencyLocale } = useLocalization('CommerceEnvironment');
	const anchorRef = useRef<HTMLDivElement>(null);

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<FormControl variant="outlined" fullWidth required error={error?.parentMemberId}>
					<InputLabel htmlFor={`${BUYER_MANAGEMENT}-org-select`}>
						{localization.AccountLabels.ParentOrgName.t()}
					</InputLabel>
					<SelectWithResize
						anchorRef={anchorRef}
						id="orgName"
						name="parentMemberId"
						value={values?.parentMemberId as string}
						onChange={handleSelectChange}
						displayEmpty
						inputProps={{ id: `${BUYER_MANAGEMENT}-org-select` }}
						disabled={!!buyerId}
						MenuProps={adminBuyerManagementOrganizationListMenu}
					>
						<MenuItem value={EMPTY_STRING} hidden disabled>
							{localization.SelectParentOrganization.t()}
						</MenuItem>
						{organizations.map((organization) => (
							<MenuItem key={organization.organizationId} value={organization.organizationId}>
								<AdminOrganizationListItemDisplay
									organization={organization}
									anchorRef={anchorRef}
								/>
							</MenuItem>
						))}
					</SelectWithResize>
				</FormControl>
			</Grid>
			<Grid item xs={12}>
				<TextField
					data-testid={`${BUYER_MANAGEMENT}-logonId`}
					id={`${BUYER_MANAGEMENT}-logonId`}
					required
					inputProps={{ maxLength: ADDRESS_FIELD_LENGTH.logonId }}
					label={localization.AccountLabels.LogonId.t()}
					name="logonId"
					onChange={handleInputChange}
					value={values?.logonId}
					error={error?.logonId}
					fullWidth
					disabled={!!buyerId}
					autoComplete="off"
				/>
			</Grid>

			<Grid item xs={12} sm={6}>
				<TextField
					data-testid={`${BUYER_MANAGEMENT}-firstName`}
					id={`${BUYER_MANAGEMENT}-firstName`}
					required
					inputProps={{ maxLength: 40 }}
					label={localization.AccountLabels.FirstName.t()}
					name="firstName"
					fullWidth
					onChange={handleInputChange}
					value={values?.firstName}
					error={error?.firstName}
					autoComplete="given-name"
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextField
					data-testid={`${BUYER_MANAGEMENT}-lastName`}
					id={`${BUYER_MANAGEMENT}-lastName`}
					required
					inputProps={{ maxLength: 40 }}
					label={localization.AccountLabels.LastName.t()}
					name="lastName"
					fullWidth
					onChange={handleInputChange}
					value={values?.lastName}
					error={error?.lastName}
					autoComplete="family-name"
				/>
			</Grid>

			<Grid item xs={12} sm={6}>
				<TextField
					data-testid={`${BUYER_MANAGEMENT}-email`}
					id={`${BUYER_MANAGEMENT}-email`}
					required
					label={localization.AccountLabels.ContactEmail.t()}
					inputProps={{ maxLength: 100, type: 'email', pattern: REG_EX.EMAIL.source }}
					name="email1"
					fullWidth
					onChange={handleInputChange}
					value={values?.email1}
					error={error?.email1}
					autoComplete="email"
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextField
					data-testid={`${BUYER_MANAGEMENT}-phone`}
					id={`${BUYER_MANAGEMENT}-phone`}
					inputProps={{
						maxLength: 32,
						type: 'tel',
						pattern: REG_EX.PHONE.source,
					}}
					label={localization.AccountLabels.PhoneNumber.t()}
					name="phone1"
					fullWidth
					onChange={handleInputChange}
					value={values?.phone1}
					error={error?.phone1}
					autoComplete="tel"
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<FormControl variant="outlined" fullWidth required error={error?.preferredCurrency}>
					<InputLabel htmlFor={`${BUYER_MANAGEMENT}-currency-select`}>
						{localization.AccountLabels.PreferredCurrency.t()}
					</InputLabel>
					<SelectWithResize
						data-testid={`${BUYER_MANAGEMENT}-currency`}
						id={`${BUYER_MANAGEMENT}-currency`}
						name="preferredCurrency"
						value={(values?.preferredCurrency as string) ?? ''}
						onChange={handleSelectChange}
						inputProps={{ id: `${BUYER_MANAGEMENT}-currency-select` }}
						displayEmpty
					>
						<MenuItem value={EMPTY_STRING}>
							{localization.AccountLabels.SelectPreferredCurrency.t()}
						</MenuItem>
						{supportedCurrencies?.map((currency) => (
							<MenuItem value={currency} key={currency}>
								{currencyLocale[currency as keyof typeof currencyLocale].t()}
							</MenuItem>
						))}
					</SelectWithResize>
				</FormControl>
			</Grid>
			<Grid item xs={12} sm={6}>
				<FormControl variant="outlined" fullWidth required error={error?.preferredLanguage}>
					<InputLabel htmlFor={`${BUYER_MANAGEMENT}-language-select`}>
						{localization.AccountLabels.PreferredLanguage.t()}
					</InputLabel>
					<SelectWithResize
						data-testid={`${BUYER_MANAGEMENT}-language`}
						id={`${BUYER_MANAGEMENT}-language`}
						name="preferredLanguage"
						value={(values?.preferredLanguage as string) ?? ''}
						onChange={handleSelectChange}
						inputProps={{ id: `${BUYER_MANAGEMENT}-language-select` }}
						displayEmpty
					>
						<MenuItem value={EMPTY_STRING}>
							{localization.AccountLabels.SelectPreferredLanguage.t()}
						</MenuItem>
						{supportedLanguages.map((languageId) => (
							<MenuItem value={languageId} key={languageId}>
								{langLocale[languageId as keyof typeof langLocale].t()}
							</MenuItem>
						))}
					</SelectWithResize>
				</FormControl>
			</Grid>
		</Grid>
	);
};
