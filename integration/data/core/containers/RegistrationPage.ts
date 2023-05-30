/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Layout } from '@/data/types/Layout';

export const getRegistrationPage = (): Layout => ({
	name: 'DoubleStack',
	slots: {
		header: [{ name: 'Header', id: 'header' }],
		first: [],
		second: [{ name: 'Register', id: 'register' }],
		footer: [{ name: 'Footer', id: 'footer' }],
	},
});
