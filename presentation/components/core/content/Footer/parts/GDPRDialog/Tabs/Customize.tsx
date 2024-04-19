/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { FlowIfEnabled } from '@/components/blocks/FlexFlow';
import { OneClick } from '@/components/blocks/OneClick';
import { footerGDPRDialogTabsButtonSX } from '@/components/content/Footer/styles/GDPRDialog/Tabs/button';
import { footerGDPRDialogTabsButtonsStack } from '@/components/content/Footer/styles/GDPRDialog/Tabs/buttonStack';
import { footerGDPRDialogTabsContentStack } from '@/components/content/Footer/styles/GDPRDialog/Tabs/contentStack';
import { footerGDPRDialogTabsRootListTypographySX } from '@/components/content/Footer/styles/GDPRDialog/Tabs/rootListTypography';
import { useFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature';
import { useLocalization } from '@/data/Localization';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import {
	PRIVACY_POLICY_CUSTOMIZE_ALL,
	PRIVACY_POLICY_CUSTOMIZE_ALL_MARKETING_CONSENT_OFF,
	PRIVACY_POLICY_CUSTOMIZE_LIST,
	PRIVACY_POLICY_CUSTOMIZE_LIST_MARKETING_CONSENT_OFF,
} from '@/data/constants/privacyPolicy';
import { PrivacyPolicyTabProps } from '@/data/types/PrivacyPolicy';
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Stack,
	Switch,
	Typography,
} from '@mui/material';
import { FC, MouseEvent, useCallback, useMemo, useState } from 'react';

export const FooterGDPRDialogTabsCustomize: FC<PrivacyPolicyTabProps> = ({ onSubmit }) => {
	const nls = useLocalization('PrivacyPolicy');
	const { data: _marketingConsent } = useFlexFlowStoreFeature({
		id: EMS_STORE_FEATURE.MARKETING_CONSENT,
	});
	const { featureEnabled: marketingConsentFeatureEnabled } = _marketingConsent;
	const privacyPolicyCustomizeAll = useMemo(
		() =>
			marketingConsentFeatureEnabled
				? PRIVACY_POLICY_CUSTOMIZE_ALL
				: PRIVACY_POLICY_CUSTOMIZE_ALL_MARKETING_CONSENT_OFF,
		[marketingConsentFeatureEnabled]
	);
	const privacyPolicyCustomizeList = useMemo(
		() =>
			marketingConsentFeatureEnabled
				? PRIVACY_POLICY_CUSTOMIZE_LIST
				: PRIVACY_POLICY_CUSTOMIZE_LIST_MARKETING_CONSENT_OFF,
		[marketingConsentFeatureEnabled]
	);
	const [selections, setSelections] = useState(privacyPolicyCustomizeAll);
	const onToggle = useCallback(
		(key: string | undefined, on: any, off: any) => (_event: MouseEvent) =>
			key
				? setSelections((prev) => ({ ...prev, [key]: !prev[key] || prev[key] === off ? on : off }))
				: null,
		[]
	);

	return (
		<Stack {...footerGDPRDialogTabsContentStack}>
			{privacyPolicyCustomizeList.map(({ id, disabled, key = '', on, off }) => (
				<List key={id} dense={true} disablePadding>
					<ListItem disableGutters sx={{ color: 'button.primary' }}>
						<ListItemIcon>
							<Switch
								onClick={onToggle(key, on, off)}
								disabled={!!disabled}
								checked={selections[key] === on}
							/>
						</ListItemIcon>
						<ListItemText>
							<Typography variant="body2" sx={footerGDPRDialogTabsRootListTypographySX}>
								{nls.Customize[id].t()}
							</Typography>
						</ListItemText>
					</ListItem>
				</List>
			))}
			<Stack {...footerGDPRDialogTabsButtonsStack}>
				<FlowIfEnabled feature={EMS_STORE_FEATURE.MARKETING_CONSENT}>
					<OneClick
						sx={footerGDPRDialogTabsButtonSX}
						variant="contained"
						id="accept-all"
						data-testid="accept-all"
						aria-label={nls.Buttons.All.t()}
						onClick={onSubmit(PRIVACY_POLICY_CUSTOMIZE_ALL)}
					>
						{nls.Buttons.All.t()}
					</OneClick>
					<OneClick
						sx={footerGDPRDialogTabsButtonSX}
						variant="contained"
						id="accept-selected"
						data-testid="accept-selected"
						aria-label={nls.Buttons.Selected.t()}
						onClick={onSubmit(selections)}
					>
						{nls.Buttons.Selected.t()}
					</OneClick>
				</FlowIfEnabled>
				<OneClick
					sx={footerGDPRDialogTabsButtonSX}
					variant="contained"
					id="accept-necessary"
					data-testid="accept-necessary"
					aria-label={nls.Buttons.Necessary.t()}
					onClick={onSubmit()}
				>
					{nls.Buttons.Necessary.t()}
				</OneClick>
			</Stack>
		</Stack>
	);
};
