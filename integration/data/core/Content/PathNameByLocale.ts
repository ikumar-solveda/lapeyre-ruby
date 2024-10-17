/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalizationForLocale } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { encodeRedirectPath } from '@/data/utils/encodeRedirectPath';
import { getIdFromPath } from '@/data/utils/getIdFromPath';
import { routeToPage } from 'integration/generated/routeToPageMap';
import { useMemo } from 'react';

type Props = {
	locale: string;
};

const empty = {} as any;

export const usePathNameByLocale = ({ locale }: Props) => {
	const { settings } = useSettings();
	const { storeToken } = settings;
	const { query } = useNextRouter();
	const { path } = query;
	const currentPathname = getIdFromPath(path, storeToken);
	const { pageName } = useMemo(
		() => routeToPage[encodeRedirectPath(currentPathname)]?.at(0) || empty,
		[currentPathname]
	);
	const targetLocaleRoutes = useLocalizationForLocale('Routes', locale);
	const pathname = useMemo(
		() =>
			currentPathname === 'home'
				? ''
				: pageName && targetLocaleRoutes
				? targetLocaleRoutes[pageName as keyof typeof targetLocaleRoutes].route.t()
				: currentPathname,
		[currentPathname, pageName, targetLocaleRoutes]
	);
	return pathname;
};
