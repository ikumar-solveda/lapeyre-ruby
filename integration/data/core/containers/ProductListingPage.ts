/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { IncomingContent } from '@/data/types/IncomingContent';
import { Layout } from '@/data/types/Layout';
import { getContentItemForSlot } from '@/data/utils/getContentItemForSlot';

export const getProductListingPage = (props: IncomingContent): Layout => ({
	name: 'AsideExtendedPlp',
	slots: {
		header: [{ name: 'Header', id: 'header' }],
		first: getContentItemForSlot(props, 'first'),
		aside: getContentItemForSlot(props, 'second'),
		second: getContentItemForSlot(props, 'third'),
		footer: [{ name: 'Footer', id: 'footer' }],
	},
});
