/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { User } from '@/data/User';
import { RouteProtection } from '@/data/containers/manifest';
import { IncomingContent } from '@/data/types/IncomingContent';
import { Layout } from '@/data/types/Layout';
import { TranslationTable } from 'integration/generated/translations';

const layoutManifest = {};

export const dataContainerManifestCustom: {
	[key: string]: (props: IncomingContent) => Layout;
} = layoutManifest;

type LayoutKeys = keyof typeof layoutManifest;
type LocalRoutes = TranslationTable['Routes'];

/**
 * Layout relationships with translation route name as the key and
 * the layoutManifest key as the value.
 */
export const dataRouteManifestCustom: Record<string, LayoutKeys> = {};

/**
 * Map of routes that are dependent on the user status for conditional
 * redirection or other protection. The method return dictates the
 * behavior:
 * 	- true: allow access
 * 	- false: do not load the route
 * 	- string: redirect to the route named in the string
 */
export const dataRouteProtectionCustom: Partial<
	Record<keyof LocalRoutes, (user: Partial<User>) => RouteProtection>
> = {};

export const dataRouteProtectionFlexFlowMapCustom: Partial<Record<keyof LocalRoutes, string>> = {};

export const notCDNCacheableRouteCustom: Partial<Record<keyof LocalRoutes, boolean>> = {};
