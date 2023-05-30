/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import footer from '@/data/childContent/footer';
import header from '@/data/childContent/header';
import { childContentManifestCustom } from '@/data/childContent/manifestCustom';
import { ContentItemProperties } from '@/data/types/Slot';

export const childContentManifest: {
	[key: string]: ContentItemProperties[];
} = {
	header,
	footer,
	...childContentManifestCustom,
};
