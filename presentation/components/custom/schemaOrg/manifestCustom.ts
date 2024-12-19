/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { ComponentType } from 'react';
import { IncomingContent } from '@/data/types/IncomingContent';

export const schemaOrgManifestCustom: Record<
	string,
	ComponentType<{ data: IncomingContent | undefined }>
> = {};
