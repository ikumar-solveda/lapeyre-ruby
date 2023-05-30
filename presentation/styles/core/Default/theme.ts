/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { palette } from '@/styles/Default/palette';
import { CssBaseline } from '@/styles/Default/CssBaseline';
import { Button } from '@/styles/Default/Button';
import { Paper } from '@/styles/Default/Paper';
import { TextField } from '@/styles/Default/TextField';
import { Checkbox } from '@/styles/Default/Checkbox';
import { typography } from '@/styles/Default/type';
import { breakpoints } from '@/styles/Default/breakpoints';
import { shape } from '@/styles/Default/shape';
import { Accordion } from '@/styles/Default/Accordion';
import { Link } from '@/styles/Default/Link';
import * as additives from '@/styles/Default/additives';
import { dimensions } from '@/styles/Default/dimensions';
import { fonts } from '@/styles/Default/fonts';
import { ThemeManifestTheme } from '@/styles/manifest';

export const DefaultTheme: ThemeManifestTheme = {
	components: [
		palette,
		typography,
		breakpoints,
		dimensions,
		fonts,
		shape,
		CssBaseline,
		Paper,
		TextField,
		Checkbox,
		Button,
		Accordion,
		Link,
	],
	additives,
};
