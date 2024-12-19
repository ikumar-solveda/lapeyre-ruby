/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { BREADCRUMB_TRAIL } from '@/data/constants/schemaOrg';
import { useSchemaOrgForProduct } from '@/data/Content/SchemaOrgForProduct';
import { DataProps } from '@/data/types/SchemaOrg';
import { findSlotWithWidget } from '@/data/utils/findSlotWithWidget';
import { useMemo } from 'react';

export const useSchemaOrgForBundlePage = ({ data }: DataProps) => {
	const { schema } = useSchemaOrgForProduct({ partNumber: data?.tokenExternalValue as string });
	const requiresCrumb = useMemo(() => !!findSlotWithWidget(data, BREADCRUMB_TRAIL), [data]);
	return { schema, requiresCrumb };
	return { schema, requiresCrumb };
};
