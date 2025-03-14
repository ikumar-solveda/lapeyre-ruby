/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { useOpenGraphForProductPage } from '@/data/Content/OpenGraphForProductPage';
import type { DataProps } from '@/data/types/OpenGraph';
import { getOpenGraphTags } from '@/utils/getOpenGraphTags';
import HTMLReactParser from 'html-react-parser';
import Head from 'next/head';
import { type FC, useMemo } from 'react';

export const ProductPage: FC<DataProps> = (props) => {
	const { data } = useOpenGraphForProductPage(props);
	const og = useMemo(() => (data ? HTMLReactParser(getOpenGraphTags(data)) : undefined), [data]);
	return data ? <Head>{og}</Head> : null;
};
