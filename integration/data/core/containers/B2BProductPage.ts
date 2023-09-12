/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { IncomingContent } from '@/data/types/IncomingContent';
import { Layout } from '@/data/types/Layout';
import { getContentItemForSlot } from '@/data/utils/getContentItemForSlot';

export const getB2BProductPage = (props: IncomingContent): Layout => ({
	name: 'AsideExtended',
	slots: {
		header: [{ name: 'Header', id: 'header' }],
		first: getContentItemForSlot(props, 'first'),
		second: getContentItemForSlot(props, 'second'),
		aside: getContentItemForSlot(props, 'third'),
		third: getContentItemForSlot(props, 'fourth'),
		fourth: getContentItemForSlot(props, 'fifth'),
		footer: [{ name: 'Footer', id: 'footer' }],
	},
});
