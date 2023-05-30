/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Layout } from '@/data/types/Layout';
import { FC } from 'react';

export const layoutManifestCustom: {
	[key: string]: FC<{ layout: Layout }>;
} = {};
