/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { TabData, Tabs } from '@/components/blocks/Tabs';
import { adminApprovalsManagementTabSX } from '@/components/content/AdminApprovalsManagement/styles/tab';
import { AdminBuyerManagementMemberGroupTab } from '@/components/content/AdminBuyerManagement/parts/Tab/MemberGroup';
import { useAdmin_BuyerManagementAddBuyer } from '@/data/Content/Admin_BuyerManagementAddBuyer';
import { useAdmin_BuyerManagementBuyerDetails } from '@/data/Content/Admin_BuyerManagementBuyerDetails';
import { useEditBuyerMemberGroup } from '@/data/Content/EditBuyerMemberGroups';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { AdminBuyerRegistrationValueType } from '@/data/types/Admin_BuyerRegistration';
import { useForm } from '@/utils/useForm';
import { isNil, isUndefined } from 'lodash';
import { FC, useContext, useEffect, useMemo } from 'react';

export const AdminBuyerManagementStepperMemberGroup: FC = () => {
	const { query } = useNextRouter();
	const { buyerId } = query;
	const userId = useMemo(() => [buyerId].flat(1).at(-1), [buyerId]);
	const localization = useLocalization('BuyerManagement');
	const includeTitle = localization.include.t();
	const excludeTitle = localization.exclude.t();
	const { stepperFormValue, useBuyerManagementAddOrDetailsValue } = useContext(
		ContentContext
	) as unknown as {
		stepperFormValue: ReturnType<typeof useForm<AdminBuyerRegistrationValueType>>;
		useBuyerManagementAddOrDetailsValue: ReturnType<
			typeof useAdmin_BuyerManagementAddBuyer & typeof useAdmin_BuyerManagementBuyerDetails
		>;
	};
	const { organizationsById } = useBuyerManagementAddOrDetailsValue;
	const { onNamedValueChange } = stepperFormValue;
	const useEditBuyerMemberGroupValue = useEditBuyerMemberGroup(userId ?? '');
	const { incGroupAsString, excGroupAsString } = useEditBuyerMemberGroupValue;

	const contextValue = useMemo(
		() => ({ stepperFormValue, useEditBuyerMemberGroupValue, organizationsById }),
		[stepperFormValue, useEditBuyerMemberGroupValue, organizationsById]
	);

	useEffect(() => {
		if (!isNil(incGroupAsString) && !isNil(excGroupAsString)) {
			onNamedValueChange('assignedIncludeMemberGroup', incGroupAsString);
			onNamedValueChange('assignedExcludeMemberGroup', excGroupAsString);
			onNamedValueChange('selectedIncludeMemberGroup', incGroupAsString);
			onNamedValueChange('selectedExcludeMemberGroup', excGroupAsString);
		}
	}, [incGroupAsString, excGroupAsString, onNamedValueChange]);

	const tabs: TabData[] = useMemo(
		() => [
			{
				title: includeTitle,
				content: <AdminBuyerManagementMemberGroupTab />,
			},
			{
				title: excludeTitle,
				content: <AdminBuyerManagementMemberGroupTab exclude={true} />,
			},
		],
		[excludeTitle, includeTitle]
	);

	return (
		<ContentProvider value={contextValue}>
			{isUndefined(excGroupAsString) || isUndefined(incGroupAsString) ? (
				<ProgressIndicator />
			) : (
				<Tabs
					tabs={tabs}
					collectionName={localization.StepperLabels.Groups.t()}
					tabSX={adminApprovalsManagementTabSX}
				/>
			)}
		</ContentProvider>
	);
};
