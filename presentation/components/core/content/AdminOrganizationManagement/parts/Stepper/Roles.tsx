import { AdminOrganizationManagementStepperContextValue } from '@/components/content/AdminOrganizationManagement/parts/Stepper';
import { adminOrganizationManagementStepperRoleTooltipIconSX } from '@/components/content/AdminOrganizationManagement/styles/Stepper/roleTooltipIcon';
import { adminOrganizationManagementStepperRolesAndApprovalsChipSX } from '@/components/content/AdminOrganizationManagement/styles/Stepper/rolesAndApprovalsChip';
import { adminOrganizationManagementStepperRolesHeaderSX } from '@/components/content/AdminOrganizationManagement/styles/Stepper/rolesHeader';
import { adminOrganizationManagementStepperRolesSelectionStack } from '@/components/content/AdminOrganizationManagement/styles/Stepper/rolesSelectionStack';
import { adminOrganizationManagementStepperRolesStack } from '@/components/content/AdminOrganizationManagement/styles/Stepper/rolesStack';
import { updateRoleUsage } from '@/data/Content/Admin_OrganizationManagementStepper';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import RoleDescriptionIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import {
	Box,
	Checkbox,
	Chip,
	Divider,
	FormControlLabel,
	FormGroup,
	InputAdornment,
	Stack,
	TextField,
	Tooltip,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { isEmpty } from 'lodash';
import { useContext, useMemo } from 'react';

const TEXT_LEN_MAX = { maxLength: 99 };
export const AdminOrganizationManagementStepperRoles = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const orientation = useMemo(() => (isMobile ? 'horizontal' : 'vertical'), [isMobile]);
	const localization = useLocalization('OrganizationManagement');
	const { useAdmin_OrganizationManagementCreateOrDetailsValue, stepperFormValue } = useContext(
		ContentContext
	) as AdminOrganizationManagementStepperContextValue;
	const { values, onNamedValueChange } = stepperFormValue;
	const { selectedRoles } = values;
	const { displayedRoles, onRoleSearch, rolesById } =
		useAdmin_OrganizationManagementCreateOrDetailsValue;
	const onChange = (roleId: string) => () => {
		const newValue = updateRoleUsage(roleId, values.selectedRoles);
		onNamedValueChange('selectedRoles', newValue as Record<string, true>);
	};

	return isEmpty(rolesById) ? (
		<Stack>
			<Typography>{localization.RolesNotModifiable.t()}</Typography>
		</Stack>
	) : (
		<Stack
			{...adminOrganizationManagementStepperRolesStack}
			divider={<Divider orientation={orientation} flexItem />}
		>
			<Stack {...adminOrganizationManagementStepperRolesSelectionStack}>
				<Typography sx={adminOrganizationManagementStepperRolesHeaderSX} textAlign="left">
					{localization.SelectApprovalTypesAvailableText.t()}
				</Typography>
				<TextField
					fullWidth
					id="search-roles"
					data-testid="search-roles"
					name="roles"
					label={localization.SearchRoles.t()}
					placeholder={localization.SearchRoles.t()}
					inputProps={TEXT_LEN_MAX}
					onChange={onRoleSearch}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon onClick={() => null} id="search-icon" />
							</InputAdornment>
						),
					}}
				/>
				<FormGroup>
					{displayedRoles.map(({ roleId, name, description }) => (
						<Typography key={roleId}>
							<FormControlLabel
								control={<Checkbox checked={!!selectedRoles[roleId]} onChange={onChange(roleId)} />}
								label={name}
							/>
							{description ? (
								<Tooltip
									arrow
									placement="top"
									disableFocusListener
									disableTouchListener
									title={description}
								>
									<RoleDescriptionIcon
										sx={adminOrganizationManagementStepperRoleTooltipIconSX}
										fontSize="small"
									/>
								</Tooltip>
							) : null}
						</Typography>
					))}
				</FormGroup>
			</Stack>
			<Stack {...adminOrganizationManagementStepperRolesSelectionStack}>
				<Typography sx={adminOrganizationManagementStepperRolesHeaderSX}>
					{localization.SelectedRoles.t()}
				</Typography>
				{!isEmpty(selectedRoles) ? (
					Object.entries(selectedRoles).map(([selectedOption], i) => (
						<Box key={i}>
							<Chip
								label={rolesById[selectedOption].displayName}
								onDelete={onChange(selectedOption)}
								sx={adminOrganizationManagementStepperRolesAndApprovalsChipSX}
							/>
						</Box>
					))
				) : (
					<Typography>{localization.NoRolesSelectedText.t()}</Typography>
				)}
			</Stack>
		</Stack>
	);
};
