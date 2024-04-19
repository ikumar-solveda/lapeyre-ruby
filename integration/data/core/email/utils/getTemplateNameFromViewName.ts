/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { camelCase } from 'lodash';

export const getTemplateNameFromViewName = (viewName: string): string =>
	camelCase(viewName.replace(/View$/, '')).replace(/\w/, (m) => m.toUpperCase());
