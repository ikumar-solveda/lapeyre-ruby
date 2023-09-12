/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { getInitState } from '@/data/state/provider';

export const GET_SESSION_BASE_STATE = (key: string): Record<string, any> => getInitState(key, {});
