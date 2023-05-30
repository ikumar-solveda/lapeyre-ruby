/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { queryParametersToHandle } from '@/data/constants/queryParametersToHandle';
import { QueryParameterNameToHandleType } from '@/data/types/QueryParametersOfConcern';
import { GetServerSidePropsContext } from 'next';

export const constructRedirectURLParameters = ({
	context,
}: {
	context: GetServerSidePropsContext;
}) => {
	const { query } = context;
	return queryParametersToHandle.reduce(
		(params: URLSearchParams, name: QueryParameterNameToHandleType) => {
			const value = [query[name]].flat(1).at(0);
			if (value) params.append(name, value);
			return params;
		},
		new URLSearchParams()
	);
};
