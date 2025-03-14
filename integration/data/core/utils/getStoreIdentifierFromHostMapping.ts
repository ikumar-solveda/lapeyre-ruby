/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { storeConfig } from '@/data/storeConfig';
import { getRequestId } from '@/data/utils/getRequestId';
import { debugWithId } from '@/data/utils/loggerUtil';
import type { GetServerSidePropsContext } from 'next/types';

export const getStoreIdentifierFromHostMapping = ({
	context,
}: {
	context: GetServerSidePropsContext;
}) => {
	const { req } = context;
	const hostName = (req?.headers['host'] ?? 'localhost').split(':')[0];
	debugWithId(getRequestId(context), 'getStoreIdentifierFromHostMapping:hostName: ' + hostName);
	return storeConfig['0']?.hostMapping?.[hostName];
};
