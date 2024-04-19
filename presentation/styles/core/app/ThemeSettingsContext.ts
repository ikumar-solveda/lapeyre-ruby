/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
'use client';

import { ThemeManifestTheme } from '@/styles/manifest';
import { createContext } from 'react';

export const ThemeSettingsContext = createContext<{
	additives?: ThemeManifestTheme['additives'];
}>({});
export const ThemeSettingsProvider = ThemeSettingsContext.Provider;
