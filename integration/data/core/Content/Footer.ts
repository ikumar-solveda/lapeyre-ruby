/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { getContentRecommendation } from '@/data/Content/ContentRecommendation';
import { getFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature-Server';
import { getModalPrivacyPolicy } from '@/data/Content/ModalPrivacyPolicy';
import { getStaticPagesURL } from '@/data/Content/_StaticPagesURL-Server';
import { getLocalization } from '@/data/Localization';
import { getSettings } from '@/data/Settings';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { ID } from '@/data/types/Basic';
import { ContentProps } from '@/data/types/ContentProps';
import { getChildContentItems } from '@/data/utils/getChildContentItems';
import { useMemo } from 'react';

export const getFooter = async ({ cache, id, context, properties }: ContentProps) => {
	await getSettings(cache, context);
	await Promise.all([
		getModalPrivacyPolicy({ cache, context }),
		getFlexFlowStoreFeature({ cache, id: EMS_STORE_FEATURE.QUICK_ORDER, context }),
		getStaticPagesURL({ cache, id, context }),
		getLocalization(cache, context.locale || 'en-US', 'Footer'),
		...getChildContentItems(id).map((contentProperties) =>
			getContentRecommendation({
				cache,
				id,
				context,
				properties: { ...properties, ...contentProperties },
			})
		),
	]);
};

export const useFooter = (id: ID) => ({
	contentItems: useMemo(() => getChildContentItems(id), [id]),
});
