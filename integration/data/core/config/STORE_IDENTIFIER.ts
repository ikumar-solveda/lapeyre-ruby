/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { switchOnMock } from '@/data/utils/switchOnMock';

export const STORE_IDENTIFIER = switchOnMock({ value: 'Ruby', mockValue: 'Emerald' });
