/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { INVENTORY_SYSTEMS } from '@/data/constants/inventory';
import { Settings } from '@/data/Settings';

export const isNonATP = (settings: Settings) =>
	settings?.inventorySystem === INVENTORY_SYSTEMS.NON_ATP;
