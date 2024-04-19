/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import {
	DataDMSubstitutionManifestProps,
	dataDMSubstitutionsManifest,
} from '@/data/DM_Substitution/manifest';
import { DM_SUBSTITUTION_DEFAULT_KEY } from '@/data/constants/marketing';
import { ID } from '@/data/types/Basic';

export const getDMSubstitutions = (emsName: ID, props: DataDMSubstitutionManifestProps) => [
	...dataDMSubstitutionsManifest[DM_SUBSTITUTION_DEFAULT_KEY](props),
	...((emsName !== DM_SUBSTITUTION_DEFAULT_KEY &&
		dataDMSubstitutionsManifest[emsName] &&
		dataDMSubstitutionsManifest[emsName](props)) ||
		[]),
];
