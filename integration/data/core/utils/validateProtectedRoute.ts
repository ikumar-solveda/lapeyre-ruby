/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { Settings, isB2BStore } from '@/data/Settings';
import { User } from '@/data/User';
import { RouteProtection } from '@/data/containers/manifest';
import { Order } from '@/data/types/Order';

export type ProtectRule = 'login' | 'logout' | 'b2b' | 'cart';

/** helper function to validate route against protected rule */
export const validateProtectedRoute = (
	{ user, cart, settings }: { user?: Partial<User>; cart?: Order; settings?: Settings },
	protects: ProtectRule[] | ProtectRule
): RouteProtection => {
	const resolvedProtect = [protects]
		.flat()
		.find(
			(protect: ProtectRule) =>
				(protect === 'b2b' && !isB2BStore(settings as Settings)) ||
				(protect === 'login' && !user?.isLoggedIn) ||
				(protect === 'logout' && !!user?.isLoggedIn) ||
				(protect === 'cart' && !cart?.orderItem)
		);
	switch (resolvedProtect) {
		case 'b2b':
			return { allowed: false, redirectToRoute: 'Error404' };
		case 'cart':
			return { allowed: false, redirectToRoute: 'Cart' };
		case 'login':
			return { allowed: false, redirectToRoute: 'Login' };
		case 'logout':
			return { allowed: false, redirectToRoute: 'Account' };
		default:
			return { allowed: true };
	}
};
