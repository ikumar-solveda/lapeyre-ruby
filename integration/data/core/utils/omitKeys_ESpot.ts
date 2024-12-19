/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { UNUSED_ESPOT_KEYS } from '@/data/constants/omitKeys_ESpot';
import { recursiveOmit } from '@/data/utils/recursiveOmit';

/**
 * for a given e-spot response, omit attribute and value pairs that aren't consumed by us
 * @param response object to omit keys/attributes from
 * @returns response with some keys/attributes omitted
 */
export const omitKeys_ESpot = <T>(response?: T) =>
	response ? recursiveOmit<typeof response>(response, UNUSED_ESPOT_KEYS) : response;
