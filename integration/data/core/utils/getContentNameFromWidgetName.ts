/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { camelCase } from 'lodash';

export const getContentNameFromWidgetName = (widgetName: string): string =>
	camelCase(widgetName.replace(/-widget/, '')).replace(/\w/, (m) => m.toUpperCase());
