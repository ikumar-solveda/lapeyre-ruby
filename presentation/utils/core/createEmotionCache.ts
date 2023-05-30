/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import createCache from '@emotion/cache';

export const createEmotionCache = () => createCache({ key: 'css', prepend: true });
