/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { getDefaultDMSubstitutions } from '@/data/DM_Substitution/default';
import { dataDMSubstitutionManifestCustom } from '@/data/DM_Substitution/manifestCustom';
import { Settings } from '@/data/Settings';
import { DM_SUBSTITUTION_DEFAULT_KEY } from '@/data/constants/marketing';
import { ID } from '@/data/types/Basic';
import { IncomingContent } from '@/data/types/IncomingContent';
import { DM_SubstitutionProps } from '@/data/types/Marketing';

export type DataDMSubstitutionManifestProps = {
	pageData?: IncomingContent;
	settings: Settings;
	langId: string;
} & Record<string, unknown>;

export const dataDMSubstitutionsManifest: {
	[emsName: ID]: (props: DataDMSubstitutionManifestProps) => DM_SubstitutionProps[];
} = {
	[DM_SUBSTITUTION_DEFAULT_KEY]: getDefaultDMSubstitutions,
	...dataDMSubstitutionManifestCustom,
};
