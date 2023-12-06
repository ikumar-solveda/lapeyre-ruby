/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { AdminOrganizationListItemDisplay } from '@/components/blocks/AdminOrganizationListItemDisplay';
import { SelectWithResize } from '@/components/blocks/SelectWithResize';
import { AdminOrganizationManagementStepperContextValue } from '@/components/content/AdminOrganizationManagement/parts/Stepper';
import { adminOrganizationManagementOrganizationListMenu } from '@/components/content/AdminOrganizationManagement/styles/organizationListMenu';
import { useLocalization } from '@/data/Localization';
import { ORGANIZATION } from '@/data/constants/admin_organizationManagement';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ContentContext } from '@/data/context/content';
import {
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	SelectChangeEvent,
	TextField,
} from '@mui/material';
import { FC, useCallback, useContext, useRef } from 'react';

const TEXT_LEN_MAX = { maxLength: 99 };
export const AdminOrganizationManagementStepperOrganization: FC = () => {
	const localization = useLocalization('OrganizationManagement');
	const { stepperFormValue, useAdmin_OrganizationManagementCreateOrDetailsValue } = useContext(
		ContentContext
	) as AdminOrganizationManagementStepperContextValue;
	const { handleInputChange, handleSelectChange, values, error, onNamedValueChange } =
		stepperFormValue;
	const { parentOrganizations, parentOrganizationsById, setParentOrganizationId } =
		useAdmin_OrganizationManagementCreateOrDetailsValue;
	const anchorRef = useRef<HTMLDivElement>(null);
	const onChange = useCallback(
		(event: SelectChangeEvent) => {
			handleSelectChange(event);
			setParentOrganizationId(() => event.target.value);
			onNamedValueChange('selectedRoles', {});
		},
		[handleSelectChange, onNamedValueChange, setParentOrganizationId]
	);

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<TextField
					required
					fullWidth
					inputProps={TEXT_LEN_MAX}
					id={`${ORGANIZATION}-name`}
					label={localization.NameOrganization.t()}
					name="orgEntityName"
					autoComplete="off"
					value={values.orgEntityName}
					onChange={handleInputChange}
					error={error?.orgEntityName}
					disabled={!!values.isEdit}
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					inputProps={TEXT_LEN_MAX}
					id={`${ORGANIZATION}-description`}
					label={localization.DescriptionOptional.t()}
					name="description"
					fullWidth
					value={values?.description}
					onChange={handleInputChange}
					error={error?.description}
				/>
			</Grid>
			{!values.isEdit || parentOrganizationsById[values.parentMemberId] ? (
				<Grid item xs={12}>
					<FormControl variant="outlined" fullWidth required error={error?.parentMemberId}>
						<InputLabel htmlFor="orgName">{localization.ParentOrg.t()}</InputLabel>
						<SelectWithResize
							anchorRef={anchorRef}
							id="orgName"
							name="parentMemberId"
							value={values.parentMemberId as string}
							displayEmpty
							disabled={!!values.isEdit}
							onChange={onChange}
							MenuProps={adminOrganizationManagementOrganizationListMenu}
						>
							<MenuItem value={EMPTY_STRING}>{localization.SelectParentOrganization.t()}</MenuItem>
							{parentOrganizations.map((organization) => (
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
			) : null}
		</Grid>
	);
};
