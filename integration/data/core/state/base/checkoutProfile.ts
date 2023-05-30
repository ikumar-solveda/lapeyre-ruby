/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SELECTED_PROFILE } from '@/data/constants/checkoutProfile';
import { getInitState } from '@/data/state/provider';
import { SelectedProfile } from '@/data/types/CheckoutProfiles';

export const SELECTED_PROFILE_BASE_STATE: SelectedProfile = getInitState(SELECTED_PROFILE, {
	profile: '',
});
