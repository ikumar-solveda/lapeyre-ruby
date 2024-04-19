/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { queryParametersToHandle } from '@/data/constants/queryParametersToHandle';
import {
	QueryParameterNameToHandleType,
	QueryParametersOfConcern,
} from '@/data/types/QueryParametersOfConcern';

export const extractParamsOfConcern = (asPath: string) => {
	// asPath. e.g. "/emerald/furniture?a=b"
	const splits = asPath.split('?');
	const storeTokenCandidate = (splits.at(0) ?? '').split('/').at(1) ?? ''.toLowerCase();
	const urlParams = new URLSearchParams(splits.at(1) ?? '');
	const queryOfConcern = queryParametersToHandle.reduce(
		(params: QueryParametersOfConcern, name: QueryParameterNameToHandleType) => {
			const param = urlParams.get(name);
			if (param) params[name] = param;
			return params;
		},
		{} as QueryParametersOfConcern
	);
	return { storeTokenCandidate, queryOfConcern };
};
