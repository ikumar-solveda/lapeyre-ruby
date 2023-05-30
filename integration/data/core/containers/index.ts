/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { dataContainerManifest } from '@/data/containers/manifest';
import { IncomingContent } from '@/data/types/IncomingContent';

export const getLayoutForContainer = (name: string, props: IncomingContent) =>
	dataContainerManifest[name] ? dataContainerManifest[name](props) : undefined;
