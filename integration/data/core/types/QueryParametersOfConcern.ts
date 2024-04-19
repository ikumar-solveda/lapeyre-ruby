/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { queryParametersToHandle } from '@/data/constants/queryParametersToHandle';

export type QueryParameterNameToHandleType = (typeof queryParametersToHandle)[number];

export type QueryParametersOfConcern = {
	[k in QueryParameterNameToHandleType]?: string;
};
