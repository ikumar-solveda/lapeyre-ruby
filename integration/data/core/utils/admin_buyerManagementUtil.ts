/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { BuyersFetchRequest } from '@/data/types/Admin_BuyerManagement';
import { isEmpty, omitBy } from 'lodash';

const SearchTypeAttrs: Partial<Record<keyof BuyersFetchRequest, boolean>> = {
	logonId: true,
	firstName: true,
	lastName: true,
};
const DepAttrs: Partial<Record<keyof BuyersFetchRequest, keyof BuyersFetchRequest>> = {
	logonIdSearchType: 'logonId',
	firstNameSearchType: 'firstName',
	lastNameSearchType: 'lastName',
};

export const sanitizeSearchPayload = (payload: BuyersFetchRequest) => {
	const clean: BuyersFetchRequest = omitBy(payload, isEmpty);
	Object.entries(DepAttrs)
		.filter(([_, value]) => isEmpty(clean[value]))
		.forEach(([key]) => delete clean[key as keyof BuyersFetchRequest]);
	const keys = Object.keys(clean).filter((k) => SearchTypeAttrs[k as keyof BuyersFetchRequest]);
	const extra = keys.reduce((agg, k) => {
		agg[`${k}SearchType` as keyof BuyersFetchRequest] = '3' as any;
		return agg;
	}, {} as BuyersFetchRequest);
	const updated = { ...clean, ...extra };
	return updated;
};
