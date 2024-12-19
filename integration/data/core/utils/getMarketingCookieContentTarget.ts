/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { ALL_COOKIES } from '@/data/constants/marketingCookieContentTarget';
import { dataMarketingCookieContentTargetManifest } from '@/data/MarketingCookieContentTarget/manifest';
import entries from 'lodash/entries';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';

const EMPTY_TARGETS = {};

const getMarketingCookieContentTargetsListFromManifest = () => {
	if (dataMarketingCookieContentTargetManifest.ALL) {
		return [ALL_COOKIES];
	} else {
		return entries(dataMarketingCookieContentTargetManifest)
			.filter(([_, value]) => value)
			.map(([target]) => target);
	}
};

export const getMarketingCookieContentTarget = ({
	cookies,
}: {
	cookies: Partial<{
		[key: string]: string;
	}>;
}) => {
	const cookieTargets = getMarketingCookieContentTargetsListFromManifest();
	return isEmpty(cookieTargets)
		? EMPTY_TARGETS
		: cookieTargets.at(0) === ALL_COOKIES
		? cookies
		: pick(cookies, cookieTargets);
};
