/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { FlowIfEnabled } from '@/components/blocks/FlexFlow';
import { OneClick } from '@/components/blocks/OneClick';
import { RenderContent } from '@/components/blocks/RenderContent';
import { footerGDPRDialogTabsButtonSX } from '@/components/content/Footer/styles/GDPRDialog/Tabs/button';
import { footerGDPRDialogTabsButtonsStack } from '@/components/content/Footer/styles/GDPRDialog/Tabs/buttonStack';
import { footerGDPRDialogTabsConsentRootListSX } from '@/components/content/Footer/styles/GDPRDialog/Tabs/consentRootList';
import { footerGDPRDialogTabsContentStack } from '@/components/content/Footer/styles/GDPRDialog/Tabs/contentStack';
import { footerGDPRDialogTabsListExpandSX } from '@/components/content/Footer/styles/GDPRDialog/Tabs/expand';
import { footerGDPRDialogTabsRootListTypographySX } from '@/components/content/Footer/styles/GDPRDialog/Tabs/rootListTypography';
import { useFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature';
import { useLocalization } from '@/data/Localization';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import {
	PRIVACY_POLICY_CUSTOMIZE_ALL,
	PRIVACY_POLICY_CUSTOMIZE_ALL_MARKETING_CONSENT_OFF,
} from '@/data/constants/privacyPolicy';
import { PrivacyPolicyTabProps } from '@/data/types/PrivacyPolicy';
import { ExpandCircleDownOutlined } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import { FC, MouseEvent, useCallback, useMemo, useState } from 'react';

export const FooterGDPRDialogTabsConsent: FC<PrivacyPolicyTabProps> = ({ content, onSubmit }) => {
	const nls = useLocalization('PrivacyPolicy');
	const [toggle, setToggle] = useState<Record<string, boolean>>({});
	const { data: _marketingConsent } = useFlexFlowStoreFeature({
		id: EMS_STORE_FEATURE.MARKETING_CONSENT,
	});
	const { featureEnabled: marketingConsentFeature } = _marketingConsent;
	const privacyPolicyCustomizeAll = useMemo(
		() =>
			marketingConsentFeature
				? PRIVACY_POLICY_CUSTOMIZE_ALL
				: PRIVACY_POLICY_CUSTOMIZE_ALL_MARKETING_CONSENT_OFF,
		[marketingConsentFeature]
	);

	const onToggle = useCallback(
		(index: number) => (_event: MouseEvent) =>
			setToggle((prev) => ({ ...prev, [`${index}`]: !prev[`${index}`] })),
		[]
	);
	return (
		<Stack {...footerGDPRDialogTabsContentStack}>
			{content?.map((data, index) => (
				<List key={index} dense={true} disablePadding sx={footerGDPRDialogTabsConsentRootListSX}>
					<ListItemButton onClick={onToggle(index)} disableGutters>
						<ListItemText>
							<Typography variant="body2" sx={footerGDPRDialogTabsRootListTypographySX}>
								{nls.Content[data.contentName as keyof typeof nls.Content].t()}
							</Typography>
						</ListItemText>
						<ExpandCircleDownOutlined sx={footerGDPRDialogTabsListExpandSX(!!toggle[`${index}`])} />
					</ListItemButton>
					<Collapse in={!!toggle[`${index}`]} unmountOnExit>
						<RenderContent content={data} />
					</Collapse>
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
						onClick={onSubmit(privacyPolicyCustomizeAll)}
					>
						{nls.Buttons.All.t()}
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
