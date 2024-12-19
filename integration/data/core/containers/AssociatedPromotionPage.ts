/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Layout } from '@/data/types/Layout';

export const getAssociatedPromotionPage = (): Layout => ({
	name: 'DoubleStack',
	slots: {
		header: [{ name: 'Header', id: 'header' }],
		first: [],
		second: [{ name: 'AssociatedPromotion', id: 'associated-promotion' }],
		footer: [{ name: 'Footer', id: 'footer' }],
	},
});
