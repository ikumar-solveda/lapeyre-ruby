/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { AdminOrganizationListItemDisplay } from '@/components/blocks/AdminOrganizationListItemDisplay';
import { SelectWithResize } from '@/components/blocks/SelectWithResize';
import { adminBuyerManagementHeaderSearchOptionsSX } from '@/components/content/AdminBuyerManagement/styles/Header/searchOptions';
import { adminBuyerManagementOrganizationListMenu } from '@/components/content/AdminBuyerManagement/styles/organizationListMenu';
import { useAdmin_BuyerManagement } from '@/data/Content/Admin_BuyerManagement';
import { useAdmin_OrganizationRoles } from '@/data/Content/Admin_OrganizationRoles';
import { useLocalization } from '@/data/Localization';
import { getActiveOrganizationId } from '@/data/Settings';
import { useUser } from '@/data/User';
import { searchInitialValues } from '@/data/constants/admin_buyerManagement';
import { ContentContext } from '@/data/context/content';
import { useForm } from '@/utils/useForm';
import {
	Button,
	Grid,
	InputLabel,
	MenuItem,
	OutlinedInput,
	SelectChangeEvent,
	Stack,
} from '@mui/material';
import { FC, useCallback, useContext, useMemo, useRef } from 'react';

export const AdminBuyerManagementHeaderSearchOptions: FC = () => {
	const localization = useLocalization('BuyerManagement');
	const { buyerManagementValue, searchFormValue } = useContext(ContentContext) as {
		buyerManagementValue: ReturnType<typeof useAdmin_BuyerManagement>;
		searchFormValue: ReturnType<typeof useForm<typeof searchInitialValues>>;
	};
	const { accountStatuses, organizationsList } = buyerManagementValue;
	const { values, handleInputChange, handleSelectChange, onNamedValueChange, submitting } =
		searchFormValue;
	const { user } = useUser();
	const sessionOrgId = useMemo(
		() => getActiveOrganizationId(user?.context)?.organizationId ?? '',
		[user]
	);
	const organizationAdminValue = useAdmin_OrganizationRoles(values.parentOrgId || sessionOrgId);
	const anchorRef = useRef<HTMLDivElement>(null);

	const { roles } = organizationAdminValue;
	const onOrg = useCallback(
		(event: SelectChangeEvent) => {
			onNamedValueChange('roleId', '');
			handleSelectChange(event);
		},
		[handleSelectChange, onNamedValueChange]
	);

	return (
		<Stack sx={adminBuyerManagementHeaderSearchOptionsSX} spacing={2} useFlexGap>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6} md={4}>
					<InputLabel htmlFor="firstName">{localization.FirstName.t()}</InputLabel>
					<OutlinedInput
						id="firstName"
						name="firstName"
						fullWidth
						value={values.firstName}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<InputLabel htmlFor="lastName">{localization.LastName.t()}</InputLabel>
					<OutlinedInput
						id="lastName"
						name="lastName"
						fullWidth
						value={values.lastName}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<InputLabel htmlFor="accountStatus">{localization.UserAccountStatus.t()}</InputLabel>
					<SelectWithResize
						id="accountStatus"
						name="accountStatus"
						fullWidth
						value={values.accountStatus}
						onChange={handleSelectChange}
						displayEmpty
					>
						<MenuItem value="">{localization.SelectUserAccountStatus.t()}</MenuItem>
						{accountStatuses.map(({ label, value }) => (
							<MenuItem key={label} value={value}>
								{label}
							</MenuItem>
						))}
					</SelectWithResize>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<InputLabel htmlFor="parentOrgId">{localization.ParentOrganization.t()}</InputLabel>
					<SelectWithResize
						anchorRef={anchorRef}
						id="parentOrgId"
						name="parentOrgId"
						fullWidth
						value={values.parentOrgId}
						onChange={onOrg}
						displayEmpty
						MenuProps={adminBuyerManagementOrganizationListMenu}
					>
						<MenuItem value="">{localization.SelectParentOrganization.t()}</MenuItem>
						{organizationsList.map((organization) => (
							<MenuItem key={organization.displayName} value={organization.organizationId}>
								<AdminOrganizationListItemDisplay
									organization={organization}
									anchorRef={anchorRef}
								/>
							</MenuItem>
						))}
					</SelectWithResize>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<InputLabel htmlFor="roleId">{localization.role.t()}</InputLabel>
					<SelectWithResize
						id="roleId"
						name="roleId"
						fullWidth
						value={values.roleId}
						onChange={handleSelectChange}
						displayEmpty
					>
						<MenuItem value="">{localization.SelectRole.t()}</MenuItem>
						{roles?.map(({ displayName, roleId }) => (
							<MenuItem key={displayName} value={roleId}>
								{displayName}
							</MenuItem>
						))}
					</SelectWithResize>
				</Grid>
			</Grid>
			<Grid container spacing={2}>
				<Grid item>
					<Button variant="contained" type="submit" disabled={submitting}>
						{localization.Search.t()}
					</Button>
				</Grid>
				<Grid item>
					<Button variant="outlined" type="reset">
						{localization.ClearResults.t()}
					</Button>
				</Grid>
			</Grid>
		</Stack>
	);
};
