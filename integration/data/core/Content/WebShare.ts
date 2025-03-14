/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { NEXT_DEFAULT_LOCALE } from '@/data/config/DEFAULTS';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useSettings } from '@/data/Settings';
import { ProductType } from '@/data/types/Product';
import { errorWithId } from '@/data/utils/loggerUtil';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export const useWebShare = () => {
	const { locale } = useNextRouter();
	const params = useSearchParams();
	const query = params?.toString() ?? '';
	const {
		settings: { storeToken },
	} = useSettings();
	const { urlKeywordName } = storeToken ?? {};
	const [shareEnabled, setShareEnabled] = useState<boolean>(false);
	const constructProductData = useCallback(
		(sku: ProductType) => {
			let url = window.location.href;
			const href = sku.seo.href;
			if (href) {
				const localeName = !locale || locale === NEXT_DEFAULT_LOCALE ? '' : locale;
				const path = (
					urlKeywordName
						? `/${localeName}/${urlKeywordName}${sku.seo.href}`
						: `/${localeName}${sku.seo.href}`
				).replace(/[/]+/, '/');
				url = `${window.location.origin}${path}${query ? `?${query}` : ''}`;
			}
			return {
				title: sku.name,
				url,
			};
		},
		[locale, query, urlKeywordName]
	);

	const share = useCallback(
		async (sku: ProductType) => {
			const shareData = constructProductData(sku);
			if (navigator.share && navigator.canShare(shareData)) {
				try {
					await navigator.share(shareData);
				} catch (error) {
					errorWithId(undefined, 'Error sharing data', { error });
				}
			} else {
				errorWithId(undefined, 'Share is not supported!');
			}
		},
		[constructProductData]
	);

	useEffect(() => {
		setShareEnabled(navigator.share !== undefined);
	}, []);

	return {
		share,
		shareEnabled,
	};
};
