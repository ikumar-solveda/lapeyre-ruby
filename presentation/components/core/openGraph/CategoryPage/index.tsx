/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { useOpenGraphForCategoryPage } from '@/data/Content/OpenGraphForCategoryPage';
import type { DataProps } from '@/data/types/OpenGraph';
import { getOpenGraphTags } from '@/utils/getOpenGraphTags';
import HTMLReactParser from 'html-react-parser';
import Head from 'next/head';
import { FC, useMemo } from 'react';

export const CategoryPage: FC<DataProps> = (props) => {
	const { data } = useOpenGraphForCategoryPage(props);
	const og = useMemo(() => (data ? HTMLReactParser(getOpenGraphTags(data)) : undefined), [data]);
	return data ? <Head>{og}</Head> : null;
};
