/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { IncomingContent } from '@/data/types/IncomingContent';
import { Layout } from '@/data/types/Layout';
import { getContentItemForSlot } from '@/data/utils/getContentItemForSlot';

export const getCheckOutPage = (props: IncomingContent): Layout => ({
	name: 'DoubleStack',
	slots: {
		header: [{ name: 'Header', id: 'header' }],
		first: getContentItemForSlot(props, 'first'),
		second: [{ name: 'CheckOut', id: 'check-out' }, ...getContentItemForSlot(props, 'second')],
		footer: [{ name: 'Footer', id: 'footer' }],
	},
});
