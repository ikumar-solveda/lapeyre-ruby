/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { StoreLocatorBase } from '@/components/content/StoreLocator/StoreLocatorBase';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { useGoogleMapsAPILocale } from '@/data/state/useGoogleMapsAPILocale';
import { StoreLocatorBaseProps } from '@/data/types/StoreLocator';
import { FC } from 'react';

export const StoreLocatorCommon: FC<StoreLocatorBaseProps> = (props) => {
	const { loadedLocale } = useGoogleMapsAPILocale();
	const { localeName: locale } = useStoreLocale();
	return locale && locale === loadedLocale.locale ? (
		<StoreLocatorBase {...props} />
	) : (
		<ProgressIndicator />
	);
};
