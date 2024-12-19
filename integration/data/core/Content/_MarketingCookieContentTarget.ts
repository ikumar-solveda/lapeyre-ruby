/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { getMarketingCookieContentTarget } from '@/data/utils/getMarketingCookieContentTarget';
import { useMemo } from 'react';
import { useCookies } from 'react-cookie';

export const useMarketingCookieContentTarget = () => {
	const [cookies] = useCookies();
	const targets = useMemo(() => getMarketingCookieContentTarget({ cookies }), [cookies]);
	return targets;
};
