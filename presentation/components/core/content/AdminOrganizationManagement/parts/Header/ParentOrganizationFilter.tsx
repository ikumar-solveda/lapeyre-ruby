/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { AdminOrganizationListItemDisplay } from '@/components/blocks/AdminOrganizationListItemDisplay';
import { SelectWithResize } from '@/components/blocks/SelectWithResize';
import { adminOrganizationManagementOrganizationListMenu } from '@/components/content/AdminOrganizationManagement/styles/organizationListMenu';
import { useAdmin_OrganizationManagement } from '@/data/Content/Admin_OrganizationManagement';
import { useLocalization } from '@/data/Localization';
import { initialSearchValues } from '@/data/constants/admin_organizationManagement';
import { ContentContext } from '@/data/context/content';
import { useForm } from '@/utils/useForm';
import { FormControl, MenuItem, SelectChangeEvent } from '@mui/material';
import { FC, useCallback, useContext, useMemo, useRef, useState } from 'react';

export const AdminOrganizationManagementParentOrganizationFilter: FC = () => {
	const { useAdmin_OrganizationManagementValue, searchFormValue } = useContext(ContentContext) as {
		useAdmin_OrganizationManagementValue: ReturnType<typeof useAdmin_OrganizationManagement>;
		searchFormValue: ReturnType<typeof useForm<typeof initialSearchValues>>;
	};
	const { parentOrganizations, parentOrganizationsByName, onSearch } =
		useAdmin_OrganizationManagementValue;
	const { values, handleSelectChange } = searchFormValue;
	const { ParentOrgPlaceholder } = useLocalization('OrganizationManagement');
	const placeholder = useMemo(() => ParentOrgPlaceholder.t(), [ParentOrgPlaceholder]);
	const [display, setDisplay] = useState<string>('');
	const onRenderValue = (value: string) => (value ? display : placeholder);
	const anchorRef = useRef<HTMLDivElement>(null);

	const onParentOrg = useCallback(
		(event: SelectChangeEvent<string>) => {
			setDisplay(parentOrganizationsByName[event.target.value]?.displayName ?? '');
			handleSelectChange(event);
			onSearch({ [event.target.name]: event.target.value } as typeof values);
		},
		[handleSelectChange, onSearch, parentOrganizationsByName]
	);

	return (
		<FormControl fullWidth>
			<SelectWithResize
				anchorRef={anchorRef}
				fullWidth
				displayEmpty
				id="filter-by-parent-org"
				data-testid="filter-by-parent-org"
				name="parentOrgName"
				value={values.parentOrgName}
				onChange={onParentOrg}
				renderValue={onRenderValue}
				MenuProps={adminOrganizationManagementOrganizationListMenu}
			>
				<MenuItem value="">{placeholder}</MenuItem>
				{parentOrganizations.map((org, index) => (
					<MenuItem key={index} value={org.organizationName}>
						<AdminOrganizationListItemDisplay organization={org} anchorRef={anchorRef} />
					</MenuItem>
				))}
			</SelectWithResize>
		</FormControl>
	);
};
