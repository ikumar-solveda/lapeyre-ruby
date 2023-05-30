/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Aside } from '@/components/layouts/Aside';
import { AsideExtended } from '@/components/layouts/AsideExtended';
import { AsideExtendedPlp } from '@/components/layouts/AsideExtendedPlp';
import { DoubleStack } from '@/components/layouts/DoubleStack';
import { layoutManifestCustom } from '@/components/layouts/manifestCustom';
import { TripleStack } from '@/components/layouts/TripleStack';
import { Layout } from '@/data/types/Layout';
import { FC } from 'react';

export const layoutManifest: {
	[key: string]: FC<{ layout: Layout }>;
} = {
	DoubleStack,
	TripleStack,
	Aside,
	AsideExtended,
	AsideExtendedPlp,
	...layoutManifestCustom,
};
