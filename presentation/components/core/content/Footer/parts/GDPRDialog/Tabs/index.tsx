/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { TabData, Tabs } from '@/components/blocks/Tabs';
import { FooterGDPRDialogTabsConsent } from '@/components/content/Footer/parts/GDPRDialog/Tabs/Consent';
import { FooterGDPRDialogTabsCustomize } from '@/components/content/Footer/parts/GDPRDialog/Tabs/Customize';
import { useLocalization } from '@/data/Localization';
import { PrivacyPolicyTabProps } from '@/data/types/PrivacyPolicy';
import { FC, useMemo } from 'react';

export const FooterGDPRDialogTabs: FC<PrivacyPolicyTabProps> = ({ content, onSubmit }) => {
	const nls = useLocalization('PrivacyPolicy');
	const tabs = useMemo(
		() =>
			[
				{
					id: 'Consent',
					title: nls.Tabs.Consent.t(),
					content: <FooterGDPRDialogTabsConsent content={content} onSubmit={onSubmit} />,
				},
				{
					id: 'Customize',
					title: nls.Tabs.Customize.t(),
					content: <FooterGDPRDialogTabsCustomize onSubmit={onSubmit} />,
				},
			] as TabData[],
		[content, onSubmit, nls.Tabs]
	);

	return <Tabs tabs={tabs} collectionName="privacy-policy-modal" />;
};
