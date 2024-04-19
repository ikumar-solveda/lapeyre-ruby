/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { DataDMSubstitutionManifestProps } from '@/data/DM_Substitution/manifest';
import { DM_SubstitutionProps } from '@/data/types/Marketing';

export const getDefaultDMSubstitutions = ({
	settings,
}: DataDMSubstitutionManifestProps): DM_SubstitutionProps[] => [
	{ name: '[storeName]', value: settings.storeName },
];
