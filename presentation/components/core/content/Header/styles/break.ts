/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SystemStyleObject } from '@mui/system';

export const headerBreak = ({ mobile, desktop }: Record<string, string>): SystemStyleObject => ({
	xs: mobile,
	sm: mobile,
	md: desktop,
});
