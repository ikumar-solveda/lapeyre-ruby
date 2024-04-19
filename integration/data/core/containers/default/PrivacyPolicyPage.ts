/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { DefaultContainerLayout } from '@/data/types/ContainerLayout';
const Layout: DefaultContainerLayout = {
	id: '12510',
	name: 'PrivacyPolicyPageLayout',
	containerName: 'home-page',
	isStoreDefault: true,
	slots: [
		{
			id: '1',
			widgets: [
				{
					id: '3032',
					name: 'PrivacyPolicyPageBannerWidget',
					widgetName: 'e-marketing-spot-widget',
					sequence: 0.0,
					properties: {
						emsName: 'PrivacyPolicyPageCenter_Content',
						emsType: 'global',
					},
				},
			],
		},
	],
};
export default Layout;
