/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { isB2BStore } from '@/data/Settings-Server';
import { Settings } from '@/data/_Settings';
import { User } from '@/data/_User';
import { RouteProtection } from '@/data/containers/manifest';
import { Order } from '@/data/types/Order';

export type ProtectRule =
	| 'login'
	| 'logout'
	| 'b2b'
	| 'cart'
	| 'buyerAdmin'
	| 'buyerApprover'
	| 'non-generic'
	| 'registeredShopper';

const isProtected = ({
	protect,
	settings,
	user,
	hasCart,
}: {
	protect: ProtectRule;
	settings?: Settings;
	user?: Partial<User>;
	hasCart: boolean;
}) => {
	switch (protect) {
		case 'b2b':
			return !isB2BStore(settings as Settings);
		case 'login':
			return !user?.isLoggedIn;
		case 'logout':
			return !!user?.isLoggedIn;
		case 'non-generic':
			return user?.isGeneric === true; // backward compatibility
		case 'buyerAdmin':
			return !user?.buyerAdmin;
		case 'buyerApprover':
			return !user?.buyerAdmin && !user?.buyerApprover; // if it buyer admin, or buyer approver, resolve false
		case 'registeredShopper':
			return !user?.registeredShopper;
		case 'cart':
			return !hasCart;
		default:
			return false;
	}
};

const getRouteProtection = ({
	protectedFrom,
}: {
	protectedFrom?: ProtectRule;
}): RouteProtection => {
	switch (protectedFrom) {
		case 'b2b':
			return { allowed: false, redirectToRoute: 'Error404' };
		case 'cart':
			return { allowed: false, redirectToRoute: 'Cart' };
		case 'login':
		case 'non-generic':
			return { allowed: false, redirectToRoute: 'Login' };
		case 'logout':
		case 'buyerAdmin':
		case 'buyerApprover':
		case 'registeredShopper':
			return { allowed: false, redirectToRoute: 'Account' };
		default:
			return { allowed: true };
	}
};

/** helper function to validate route against protected rule */
export const validateProtectedRoute = (
	{
		user,
		cart,
		settings,
	}: {
		user?: Partial<User>;
		cart?: Order | boolean;
		settings?: Settings;
	},
	protects: ProtectRule[] | ProtectRule,
	isAllowed: () => boolean = () => true
): RouteProtection => {
	if (!isAllowed()) {
		return { allowed: false, redirectToRoute: 'Error404' };
	}
	const hasCart = typeof cart === 'boolean' ? cart : !!cart?.orderItem;
	const protectedFrom = [protects]
		.flat()
		.find((protect) => isProtected({ protect, settings, user, hasCart }));

	return getRouteProtection({ protectedFrom });
};
