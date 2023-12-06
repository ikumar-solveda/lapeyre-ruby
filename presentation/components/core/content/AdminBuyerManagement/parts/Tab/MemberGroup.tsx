/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { adminBuyerManagementStepperChipSX } from '@/components/content/AdminBuyerManagement/styles/Stepper/chip';
import { adminBuyerManagementTabMemberGroupSelectionAvailableGroupsSX } from '@/components/content/AdminBuyerManagement/styles/Tab/memberGroupSelectionAvailableGroups';
import { adminBuyerManagementTabMemberGroupSelectionHeaderSX } from '@/components/content/AdminBuyerManagement/styles/Tab/memberGroupSelectionHeader';
import { adminBuyerManagementTabMemberGroupSelectionStack } from '@/components/content/AdminBuyerManagement/styles/Tab/memberGroupSelectionStack';
import { adminBuyerManagementTabMemberGroupStack } from '@/components/content/AdminBuyerManagement/styles/Tab/memberGroupStack';
import { useAdmin_BuyerManagementAddBuyer } from '@/data/Content/Admin_BuyerManagementAddBuyer';
import { useAdmin_BuyerManagementBuyerDetails } from '@/data/Content/Admin_BuyerManagementBuyerDetails';
import { useEditBuyerMemberGroup } from '@/data/Content/EditBuyerMemberGroups';
import { useLocalization } from '@/data/Localization';
import { BUYER_MANAGEMENT } from '@/data/constants/admin_buyerManagement';
import { ContentContext } from '@/data/context/content';
import { AdminBuyerRegistrationValueType } from '@/data/types/Admin_BuyerRegistration';
import { useForm } from '@/utils/useForm';
import SearchIcon from '@mui/icons-material/Search';
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
	Stack,
	TextField,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { keyBy, remove } from 'lodash';
import { ChangeEvent, FC, useCallback, useContext, useEffect, useMemo } from 'react';

export const AdminBuyerManagementMemberGroupTab: FC<{ exclude?: boolean }> = ({
	exclude = false,
}) => {
	const localization = useLocalization('BuyerManagement');
	const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
	const { stepperFormValue, useEditBuyerMemberGroupValue, organizationsById } = useContext(
		ContentContext
	) as {
		stepperFormValue: ReturnType<typeof useForm<AdminBuyerRegistrationValueType>>;
		useEditBuyerMemberGroupValue: ReturnType<typeof useEditBuyerMemberGroup>;
		organizationsById: ReturnType<
			typeof useAdmin_BuyerManagementAddBuyer & typeof useAdmin_BuyerManagementBuyerDetails
		>['organizationsById'];
	};
	const { searchText, onSearch, setSearchText, availableGroups } = useEditBuyerMemberGroupValue;
	const { onNamedValueChange, values } = stepperFormValue;
	const { selectedIncludeMemberGroup, selectedExcludeMemberGroup } = values;
	const keyByIdAvailableGroups = useMemo(
		() => keyBy(availableGroups, 'memberGroupId'),
		[availableGroups]
	);

	const chipGroups = useMemo(() => {
		if (exclude) {
			return selectedExcludeMemberGroup?.split(',').filter(Boolean) ?? [];
		} else {
			return selectedIncludeMemberGroup?.split(',').filter(Boolean) ?? [];
		}
	}, [exclude, selectedExcludeMemberGroup, selectedIncludeMemberGroup]);

	const onChecked = useCallback(
		(event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
			const { value } = event.target;
			const exSelected = selectedExcludeMemberGroup?.split(',').filter(Boolean) ?? [];
			const inSelected = selectedIncludeMemberGroup?.split(',').filter(Boolean) ?? [];
			if (checked) {
				if (exclude) {
					exSelected.push(value);
					remove(inSelected, (id) => value === id);
				} else {
					inSelected.push(value);
					remove(exSelected, (id) => value === id);
				}
				onNamedValueChange('selectedExcludeMemberGroup', exSelected.sort().join(','));
				onNamedValueChange('selectedIncludeMemberGroup', inSelected.sort().join(','));
			} else {
				remove(exclude ? exSelected : inSelected, (id) => value === id);
				onNamedValueChange(
					exclude ? 'selectedExcludeMemberGroup' : 'selectedIncludeMemberGroup',
					exclude ? exSelected.sort().join(',') : inSelected.sort().join(',')
				);
			}
		},
		[exclude, onNamedValueChange, selectedExcludeMemberGroup, selectedIncludeMemberGroup]
	);

	const onDelete = useCallback(
		(memberGroupId: string) => (_event: Event) => {
			if (exclude) {
				const selected = selectedExcludeMemberGroup?.split(',').filter(Boolean) ?? [];
				remove(selected, (id) => String(memberGroupId) === id);
				onNamedValueChange('selectedExcludeMemberGroup', selected.sort().join(','));
			} else {
				const selected = selectedIncludeMemberGroup?.split(',').filter(Boolean) ?? [];
				remove(selected, (id) => String(memberGroupId) === id);
				onNamedValueChange('selectedIncludeMemberGroup', selected.sort().join(','));
			}
		},
		[exclude, onNamedValueChange, selectedExcludeMemberGroup, selectedIncludeMemberGroup]
	);

	useEffect(() => {
		setSearchText('');
	}, [setSearchText, exclude]);

	return (
		<Stack
			{...adminBuyerManagementTabMemberGroupStack}
			divider={<Divider orientation={isMobile ? 'horizontal' : 'vertical'} flexItem />}
		>
			<Stack {...adminBuyerManagementTabMemberGroupSelectionStack}>
				<Box sx={adminBuyerManagementTabMemberGroupSelectionHeaderSX}>
					<Typography>
						{exclude ? localization.EncludeMemberGroups.t() : localization.IncludeMemberGroups.t()}
					</Typography>
					<Typography sx={adminBuyerManagementTabMemberGroupSelectionAvailableGroupsSX}>
						{localization.AvailableGroups.t()}
					</Typography>
				</Box>
				<TextField
					data-testid={`${BUYER_MANAGEMENT}-stepper-membergroup-seach-${exclude}`}
					id={`${BUYER_MANAGEMENT}-stepper-membergroup-seach-${exclude}`}
					label={localization.Search.t()}
					fullWidth
					inputProps={{ maxLength: 128 }}
					value={searchText}
					onChange={onSearch}
					InputProps={{
						startAdornment: (
							<InputAdornment position="end">
								<IconButton edge="start">
									<SearchIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<FormControl>
					<FormGroup>
						{availableGroups
							.filter(
								({ memberGroupId, name }) =>
									(!searchText || !name || name.toLowerCase().includes(searchText.toLowerCase())) &&
									((!exclude && !selectedExcludeMemberGroup?.includes(String(memberGroupId))) || // include tab, member group is not part of excluded selected can display
										(exclude && !selectedIncludeMemberGroup?.includes(String(memberGroupId)))) // exclude tab, member group is not part of included selected can display
							)
							.map(({ memberGroupId, name, ownerId }) => (
								<FormControlLabel
									key={memberGroupId}
									control={
										<Checkbox
											data-testid={`${BUYER_MANAGEMENT}-stepper-membergroup-check-${memberGroupId}`}
											id={`${BUYER_MANAGEMENT}-stepper-membergroup-check-${memberGroupId}`}
											checked={chipGroups.includes(String(memberGroupId))}
											onChange={onChecked}
											value={memberGroupId}
										/>
									}
									label={`${name} - ${organizationsById[String(ownerId)]?.displayName}`}
								/>
							))}
					</FormGroup>
				</FormControl>
			</Stack>
			<Stack {...adminBuyerManagementTabMemberGroupSelectionStack}>
				<Typography sx={adminBuyerManagementTabMemberGroupSelectionHeaderSX}>
					{localization.SelectedGroups.t()}
				</Typography>
				{chipGroups.map((memberGroupId) => (
					<Typography component="div" key={memberGroupId} marginTop={1}>
						<Chip
							label={`${keyByIdAvailableGroups[memberGroupId]?.name} - ${
								organizationsById[String(keyByIdAvailableGroups[memberGroupId]?.ownerId)]
									?.displayName
							}`}
							data-testid={`${BUYER_MANAGEMENT}-stepper-membergroup-check-${memberGroupId}`}
							id={`${BUYER_MANAGEMENT}-stepper-membergroup-check-${memberGroupId}`}
							onDelete={onDelete(memberGroupId)}
							sx={adminBuyerManagementStepperChipSX}
						/>
					</Typography>
				))}
			</Stack>
		</Stack>
	);
};
