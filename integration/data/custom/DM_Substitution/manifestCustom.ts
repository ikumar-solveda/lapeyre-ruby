/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { DataDMSubstitutionManifestProps } from '@/data/DM_Substitution/manifest';
import { ID } from '@/data/types/Basic';
import { DM_SubstitutionProps } from '@/data/types/Marketing';

export const dataDMSubstitutionManifestCustom: {
	[emsName: ID]: (props: DataDMSubstitutionManifestProps) => DM_SubstitutionProps[];
} = {};
