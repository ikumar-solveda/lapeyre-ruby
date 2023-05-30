/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Layout } from '@/data/types/Layout';

export const getResetPasswordPage = (): Layout => ({
	name: 'DoubleStack',
	slots: {
		header: [{ name: 'Header', id: 'header' }],
		first: [],
		second: [{ name: 'ResetPassword', id: 'reset-password' }],
		footer: [{ name: 'Footer', id: 'footer' }],
	},
});
