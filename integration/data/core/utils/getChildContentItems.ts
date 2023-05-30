/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { childContentManifest } from '@/data/childContent/manifest';
import { ID } from '@/data/types/Basic';

/**
 * For Header and Footer content items.
 * @param name
 * @returns
 */
export const getChildContentItems = (name: ID) => childContentManifest[name] || [];
