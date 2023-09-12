/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { Settings } from '@/data/Settings';
import { B2B_STORE_TYPE } from '@/data/constants/environment';

export const isB2BStore = (settings: Settings) => settings?.storeType === B2B_STORE_TYPE;
