/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { dimensions } from '@/styles/Base/dimensions';
import { fonts } from '@/styles/Base/fonts';
import { palette } from '@/styles/Base/palette';
import { ThemeManifestTheme } from '@/styles/manifest';
import { typography } from '@/styles/Base/type';

export const BaseTheme: ThemeManifestTheme = {
	inheritFrom: 'None',
	components: [palette, typography, dimensions, fonts],
	additives: {},
};
