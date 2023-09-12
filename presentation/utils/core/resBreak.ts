/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ResponsiveStyleValue } from '@mui/system';

export const resBreak = <T>({
	mobile,
	desktop,
	tablet,
}: Record<string, string | number>): Exclude<ResponsiveStyleValue<T>, null> =>
	({
		xs: mobile,
		sm: tablet ?? mobile,
		md: desktop,
	} as Exclude<ResponsiveStyleValue<T>, null>);
