/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { IncomingContent } from '@/data/types/IncomingContent';
import { Layout } from '@/data/types/Layout';
import { getContentItemForSlot } from '@/data/utils/getContentItemForSlot';

export const getKitPage = (props: IncomingContent): Layout => ({
	name: 'TripleStack',
	slots: {
		header: [{ name: 'Header', id: 'header' }],
		first: getContentItemForSlot(props, 'first'),
		second: getContentItemForSlot(props, 'second'),
		third: getContentItemForSlot(props, 'third'),
		footer: [{ name: 'Footer', id: 'footer' }],
	},
});
