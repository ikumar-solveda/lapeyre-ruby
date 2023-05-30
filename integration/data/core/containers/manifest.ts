/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import {
	dataContainerManifestCustom,
	dataRouteManifestCustom,
	dataRouteProtectionCustom,
} from '@/data/containers/manifestCustom';
import { IncomingContent } from '@/data/types/IncomingContent';
import { Layout } from '@/data/types/Layout';
import { TranslationTable } from 'integration/generated/translations';
import { User } from '@/data/User';
import { getAccountPage } from '@/data/containers/AccountPage';
import { getAddressBookPage } from '@/data/containers/AddressBookPage';
import { getCartPage } from '@/data/containers/CartPage';
import { getCategoryLandingPage } from '@/data/containers/CategoryLandingPage';
import { getCheckOutPage } from '@/data/containers/CheckOutPage';
import { getError404Page } from '@/data/containers/Error404Page';
import { getError500Page } from '@/data/containers/Error500Page';
import { getForgotPasswordPage } from '@/data/containers/ForgotPasswordPage';
import { getHomePage } from '@/data/containers/HomePage';
import { getLoginPage } from '@/data/containers/LoginPage';
import { getProductListingPage } from '@/data/containers/ProductListingPage';
import { getProductPage } from '@/data/containers/ProductPage';
import { getRegistrationPage } from '@/data/containers/RegistrationPage';
import { getResetPasswordPage } from '@/data/containers/ResetPasswordPage';
import { getSearchPage } from '@/data/containers/SearchPage';
import { getWishListsPage } from '@/data/containers/WishListsPage';
import { getOrderConfirmationPage } from '@/data/containers/OrderConfirmationPage';
import { getOrderHistoryPage } from '@/data/containers/OrderHistoryPage';
import { getOrderDetailsPage } from '@/data/containers/OrderDetailsPage';
import { getSessionErrorPage } from '@/data/containers/SessionErrorPage';
import { getStoreLocatorPage } from '@/data/containers/StoreLocatorPage';
import { getCheckoutProfilePage } from '@/data/containers/CheckoutProfilePage';
import { Order } from '@/data/types/Order';
import { getCompareProductsPage } from '@/data/containers/CompareProductsPage';

// these are indexed by the layout.containerName attr (Pascal'd)
const layoutManifest = {
	AccountPage: getAccountPage,
	AddressBookPage: getAddressBookPage,
	CartPage: getCartPage,
	CategoryLandingPage: getCategoryLandingPage,
	CheckOutPage: getCheckOutPage,
	Error404Page: getError404Page,
	Error500Page: getError500Page,
	ForgotPasswordPage: getForgotPasswordPage,
	HomePage: getHomePage,
	ItemPage: getProductPage,
	LoginPage: getLoginPage,
	ProductListingPage: getProductListingPage,
	ProductPage: getProductPage,
	RegistrationPage: getRegistrationPage,
	ResetPasswordPage: getResetPasswordPage,
	SearchPage: getSearchPage,
	WishListsPage: getWishListsPage,
	CheckoutProfilePage: getCheckoutProfilePage,
	OrderConfirmationPage: getOrderConfirmationPage,
	OrderHistoryPage: getOrderHistoryPage,
	OrderDetailsPage: getOrderDetailsPage,
	SessionErrorPage: getSessionErrorPage,
	StoreLocatorPage: getStoreLocatorPage,
	CompareProductsPage: getCompareProductsPage,
	...dataContainerManifestCustom,
};

export const dataContainerManifest: {
	[key: string]: (props: IncomingContent) => Layout;
} = layoutManifest;

type LayoutKeys = keyof typeof layoutManifest;
type LocalRoutes = TranslationTable['Routes'];
export type RouteProtection = {
	allowed: boolean;
	redirectToRoute?: keyof LocalRoutes;
	redirectToUrl?: string;
};

/**
 * Layout relationships with translation route name as the key and
 * the layoutManifest key as the value.
 */
export const dataRouteManifest: Partial<Record<keyof LocalRoutes, LayoutKeys>> = {
	Account: 'AccountPage',
	AddressBook: 'AddressBookPage',
	Error404: 'Error404Page',
	Error500: 'Error500Page',
	ForgotPassword: 'ForgotPasswordPage',
	Login: 'LoginPage',
	Registration: 'RegistrationPage',
	ResetPassword: 'ResetPasswordPage',
	Search: 'SearchPage',
	WishLists: 'WishListsPage',
	CheckoutProfiles: 'CheckoutProfilePage',
	OrderHistory: 'OrderHistoryPage',
	OrderDetails: 'OrderDetailsPage',
	SessionError: 'SessionErrorPage',
	Cart: 'CartPage',
	CheckOut: 'CheckOutPage',
	OrderConfirmation: 'OrderConfirmationPage',
	StoreLocator: 'StoreLocatorPage',
	CompareProducts: 'CompareProductsPage',
	...dataRouteManifestCustom,
};

/**
 * Map of routes that are dependent on the user status for conditional
 * redirection or other protection.
 */
export const dataRouteProtection: Partial<
	Record<keyof LocalRoutes, (user: Partial<User>, cart?: Order) => RouteProtection>
> = {
	Account: (user) => ({ allowed: !!user.isLoggedIn, redirectToRoute: 'Login' }),
	AddressBook: (user) => ({ allowed: !!user.isLoggedIn, redirectToRoute: 'Login' }),
	Login: (user) => ({ allowed: !user.isLoggedIn, redirectToRoute: 'Account' }),
	ForgotPassword: (user) => ({ allowed: !user.isLoggedIn, redirectToRoute: 'Account' }),
	Registration: (user) => ({ allowed: !user.isLoggedIn, redirectToRoute: 'Account' }),
	ResetPassword: (user) => ({ allowed: !user.isLoggedIn, redirectToRoute: 'Account' }),
	WishLists: (user) => ({ allowed: !!user.isLoggedIn, redirectToRoute: 'Login' }),
	CheckoutProfiles: (user) => ({ allowed: !!user.isLoggedIn, redirectToRoute: 'Login' }),
	OrderHistory: (user) => ({ allowed: !!user.isLoggedIn, redirectToRoute: 'Login' }),
	OrderDetails: (user) => ({ allowed: !!user.isLoggedIn, redirectToRoute: 'Login' }),
	CheckOut: (_user, cart) => ({ allowed: !!cart?.orderItem, redirectToRoute: 'Cart' }),
	...dataRouteProtectionCustom,
};
