/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useStoreLocale } from '@/data/Content/StoreLocale';
import { useSettings } from '@/data/Settings';
import { GOOGLE_MAP_REGION, STORE_LOCATOR_LIBRARY } from '@/data/constants/storeLocator';
import { useGoogleMapsAPILocale } from '@/data/state/useGoogleMapsAPILocale';
import { logger } from '@/logging/logger';
import { Box } from '@mui/material';
import { LoadScript } from '@react-google-maps/api';
import { FC, useCallback } from 'react';

const HiddenDiv: FC<{ locale: string }> = ({ locale }) => {
	logger.debug('Loading Google Maps API', { locale });
	return <Box sx={{ display: 'none' }} />;
};

export const GoogleMapsAPILoader: FC = () => {
	const { settings } = useSettings();
	const {
		actions: { saveLocale },
	} = useGoogleMapsAPILocale();
	const { localeName: locale } = useStoreLocale();
	const mapApiKey = settings.mapApiKey || '';
	const onLoad = useCallback(() => {
		setTimeout(() => {
			saveLocale(locale);
		}, 300);
	}, [locale, saveLocale]);

	return (
		<LoadScript
			googleMapsApiKey={mapApiKey}
			libraries={STORE_LOCATOR_LIBRARY}
			language={locale}
			region={GOOGLE_MAP_REGION}
			onLoad={onLoad}
			loadingElement={<HiddenDiv locale={locale} />}
		/>
	);
};
