/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SuggestOption } from '@/data/types/Search';

// suggest label could be duplicated with different href. Autocomplete will complain duplicated keys
export const comparator = (objA: SuggestOption, objB: SuggestOption) => objA.label === objB.label;
