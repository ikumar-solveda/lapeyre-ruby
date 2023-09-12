/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SELECTED_PROFILE } from '@/data/constants/checkoutProfile';
import { getInitState } from '@/data/state/provider';
import { SelectedProfile } from '@/data/types/CheckoutProfiles';

// TODO: remove this post 9.1.14.0
/**
 * @deprecated Global state `selectedProfile` is deprecated in 9.1.14.0, will be removed in future release.
 */
export const SELECTED_PROFILE_BASE_STATE: SelectedProfile = getInitState(SELECTED_PROFILE, {
	profile: '',
});
