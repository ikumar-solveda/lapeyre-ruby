/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useNextRouter } from '@/data/Content/_NextRouter';
import { DataProps } from '@/data/types/SchemaOrg';
import { getProductListQueryParameters } from '@/data/utils/getProductListQueryParameters';
import { useMemo } from 'react';
import { SearchAction } from 'schema-dts';
import { EMPTY_STRING } from '@/data/constants/marketing';

export const useSchemaOrgForSearchPage = ({ data: _data }: DataProps) => {
	const router = useNextRouter();
	const { query, asPath } = router;
	const filteredParams = useMemo(() => getProductListQueryParameters(query), [query]);
	const schema = useMemo(
		() =>
			JSON.stringify({
				'@type': 'SearchAction',
				target: asPath,
				query: 'required name=' + filteredParams.searchTerm?.toString().trim() || EMPTY_STRING,
			} as SearchAction),
		[filteredParams, asPath]
	);

	return { schema };
};
