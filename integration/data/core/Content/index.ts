/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { dataContentManifest } from '@/data/Content/manifest';
import { ContentProps } from '@/data/types/ContentProps';

export const getContent = async (name: string, props: ContentProps) =>
	dataContentManifest[name] ? dataContentManifest[name](props) : [];
