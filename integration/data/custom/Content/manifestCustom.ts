/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ContentProps } from '@/data/types/ContentProps';

export const dataContentManifestCustom: {
	[key: string]: (props: ContentProps) => Promise<any>;
} = {};
