/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { getProductListQueryParameters } from '@/data/utils/getProductListQueryParameters';
import { omit } from 'lodash';

export const getProductListFacetFilters = (
	filters: ReturnType<typeof getProductListQueryParameters>
) => omit(filters, 'offset', 'limit', 'searchTerm');
