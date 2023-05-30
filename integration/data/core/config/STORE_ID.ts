/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { switchOnMock } from '@/data/utils/switchOnMock';

export const STORE_ID = switchOnMock({ value: '41', mockValue: '11' });
