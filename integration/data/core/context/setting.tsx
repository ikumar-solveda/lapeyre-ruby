/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Settings } from '@/data/Settings';
import { createContext } from 'react';

export const EMPTY_SETTINGS = {} as Settings;
export const SettingContext = createContext<Settings>(EMPTY_SETTINGS);
export const SettingProvider = SettingContext.Provider;
