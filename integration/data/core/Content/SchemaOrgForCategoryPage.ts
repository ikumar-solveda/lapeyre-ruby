/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { BREADCRUMB_TRAIL } from '@/data/constants/schemaOrg';
import { useSchemaOrgForCategory } from '@/data/Content/SchemaOrgForCategory';
import { DataProps } from '@/data/types/SchemaOrg';
import { findSlotWithWidget } from '@/data/utils/findSlotWithWidget';
import { useMemo } from 'react';

export const useSchemaOrgForCategoryPage = (props: DataProps) => {
	const { data } = props;
	const input = useMemo(() => ({ parentCategoryId: data?.tokenValue }), [data]);
	const { hierarchical } = useSchemaOrgForCategory(input);
	const requiresCrumb = useMemo(() => !!findSlotWithWidget(data, BREADCRUMB_TRAIL), [data]);

	return { schema: hierarchical, requiresCrumb };
};
