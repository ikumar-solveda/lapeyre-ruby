/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useBreadcrumbTrail } from '@/data/Content/BreadcrumbTrail';
import { DataProps } from '@/data/types/SchemaOrg';
import { useMemo } from 'react';
import { BreadcrumbList, ListItem } from 'schema-dts';

export const useSchemaOrgForBreadcrumbTrail = ({ data: _data }: DataProps) => {
	const { breadcrumb } = useBreadcrumbTrail();

	const schema = useMemo(
		() =>
			JSON.stringify({
				'@type': 'BreadcrumbList',
				itemListElement: breadcrumb.map(
					({ label: name, href: item }, index) =>
						({
							'@type': 'ListItem',
							position: index + 1,
							name,
							item,
						} as ListItem)
				),
			} as BreadcrumbList),
		[breadcrumb]
	);

	return { schema };
};
