/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { LayoutProps } from '@/data/types/AppRouter';

const RootLayout = ({ children }: LayoutProps) => (
	<html>
		<body>{children}</body>
	</html>
);

export default RootLayout;
