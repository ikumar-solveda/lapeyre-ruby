/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { AdminOrganizationListItemDisplay } from '@/components/blocks/AdminOrganizationListItemDisplay';
import { SelectWithResize } from '@/components/blocks/SelectWithResize';
import { adminBuyerManagementStepperChipSX } from '@/components/content/AdminBuyerManagement/styles/Stepper/chip';
import { adminBuyerManagementStepperFormSX } from '@/components/content/AdminBuyerManagement/styles/Stepper/form';
import { adminBuyerManagementStepperRolesHeaderSX } from '@/components/content/AdminBuyerManagement/styles/Stepper/rolesHeader';
import { adminBuyerManagementStepperRolesSelectionStack } from '@/components/content/AdminBuyerManagement/styles/Stepper/rolesSelectionStack';
import { adminBuyerManagementStepperRolesStack } from '@/components/content/AdminBuyerManagement/styles/Stepper/rolesStack';
import { adminBuyerManagementOrganizationListMenu } from '@/components/content/AdminBuyerManagement/styles/organizationListMenu';
import { useAdmin_BuyerManagementAddBuyer } from '@/data/Content/Admin_BuyerManagementAddBuyer';
import { useAdmin_BuyerManagementBuyerDetails } from '@/data/Content/Admin_BuyerManagementBuyerDetails';
import { useLocalization } from '@/data/Localization';
import { BUYER_MANAGEMENT } from '@/data/constants/admin_buyerManagement';
import { ContentContext } from '@/data/context/content';
import { flatSelectedRoleData } from '@/utils/buyerManagementRoleUtil';
import { Search } from '@mui/icons-material';
import {
	Box,
	Checkbox,
	Chip,
	Divider,
	FormControl,
	FormControlLabel,
	FormGroup,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	SelectChangeEvent,
	Stack,
	TextField,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { isEmpty } from 'lodash';
import { ChangeEvent, FC, useCallback, useContext, useMemo, useRef, useState } from 'react';

export const AdminBuyerManagementStepperRoles: FC = () => {
	const [roleSearch, setRoleSearch] = useState('');
	const { useBuyerManagementAddOrDetailsValue } = useContext(ContentContext) as unknown as {
		useBuyerManagementAddOrDetailsValue: ReturnType<
			typeof useAdmin_BuyerManagementAddBuyer & typeof useAdmin_BuyerManagementBuyerDetails
		>;
	};
	const {
		organizations,
		setSelectedOrg,
		selectedOrg,
		selectedRoles,
		roles,
		onRoleCheckboxChanged,
		onDeSelectRole,
		organizationsById,
	} = useBuyerManagementAddOrDetailsValue;
	const selectedRolesList = useMemo(() => flatSelectedRoleData(selectedRoles), [selectedRoles]);
	const localization = useLocalization('BuyerManagement').RolesLabels;
	const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
	const anchorRef = useRef<HTMLDivElement>(null);

	const onOrgSelectChanged = useCallback(
		(event: SelectChangeEvent) => {
			const { value } = event.target;
			setSelectedOrg(value);
		},
		[setSelectedOrg]
	);

	const onRoleSearchChanged = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setRoleSearch(event.target.value ?? '');
	}, []);

	return (
		<Stack
			{...adminBuyerManagementStepperRolesStack}
			divider={<Divider orientation={isMobile ? 'horizontal' : 'vertical'} flexItem />}
		>
			<Stack {...adminBuyerManagementStepperRolesSelectionStack}>
				<Typography sx={adminBuyerManagementStepperRolesHeaderSX}>
					{localization.SelectRoleText.t()}
				</Typography>
				<FormControl variant="outlined" fullWidth>
					<InputLabel htmlFor="parentOrgId">{localization.SelectOrganization.t()}</InputLabel>
					<SelectWithResize
						anchorRef={anchorRef}
						data-testid={`${BUYER_MANAGEMENT}-stepper-role-select-org`}
						id={`${BUYER_MANAGEMENT}-stepper-role-select-org`}
						fullWidth
						value={selectedOrg ?? ''}
						onChange={onOrgSelectChanged}
						displayEmpty
						MenuProps={adminBuyerManagementOrganizationListMenu}
					>
						<MenuItem value="">{localization.SelectOrganization.t()}</MenuItem>
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
				<TextField
					data-testid={`${BUYER_MANAGEMENT}-stepper-role-search`}
					id={`${BUYER_MANAGEMENT}-stepper-role-search`}
					placeholder={localization.SearchRoles.t()}
					onChange={onRoleSearchChanged}
					inputProps={{ maxLength: 128 }}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton aria-label={localization.SearchRoles.t()} edge="end" type="submit">
									<Search />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<FormControl sx={adminBuyerManagementStepperFormSX} component="fieldset" variant="standard">
					<FormGroup>
						{(roleSearch
							? roles.filter(({ displayName }) =>
									displayName.toLowerCase().includes(roleSearch.toLowerCase())
							  )
							: roles
						).map((role) => (
							<FormControlLabel
								key={`${role?.roleId}-${selectedOrg}`}
								name="roles"
								control={
									<Checkbox
										data-testid={`${BUYER_MANAGEMENT}-stepper-role-role-checkbox-${role?.roleId}-${selectedOrg}`}
										id={`${BUYER_MANAGEMENT}-stepper-role-role-checkbox-${role?.roleId}-${selectedOrg}`}
										onChange={onRoleCheckboxChanged}
										value={role.roleId}
										checked={!!selectedRoles[selectedOrg]?.[role.roleId]}
									/>
								}
								label={role?.displayName}
							/>
						))}
					</FormGroup>
				</FormControl>
			</Stack>
			<Stack {...adminBuyerManagementStepperRolesSelectionStack}>
				<Typography sx={adminBuyerManagementStepperRolesHeaderSX}>
					{localization.SelectedRolesText.t()}
				</Typography>
				{isEmpty(selectedRolesList) ? (
					<Typography>{localization.NoSelectionText.t()}</Typography>
				) : (
					selectedRolesList.map(({ roleId, orgId, displayName }) => (
						<Box key={roleId}>
							<Chip
								data-testid={`${BUYER_MANAGEMENT}-stepper-role-selected-role-${roleId}-${orgId}`}
								id={`${BUYER_MANAGEMENT}-stepper-role-selected-role-${roleId}-${orgId}`}
								label={`${displayName} - ${organizationsById[orgId]?.displayName}`}
								sx={adminBuyerManagementStepperChipSX}
								onDelete={onDeSelectRole({ orgId, roleId })}
							/>
						</Box>
					))
				)}
			</Stack>
		</Stack>
	);
};
