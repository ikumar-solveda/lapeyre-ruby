/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { WC_PREFIX } from '@/data/constants/cookie';

type Props = { prefix?: string; name: string; storeId: string };

export const getCookieName = ({ prefix = WC_PREFIX, name, storeId }: Props) => {
	const rc = `${prefix}${name}_${storeId}`;
	return rc;
};
