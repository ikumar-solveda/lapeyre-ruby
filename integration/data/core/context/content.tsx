/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { createContext } from 'react';
export const ContentContext = createContext<unknown>({});
export const ContentProvider = ContentContext.Provider;
