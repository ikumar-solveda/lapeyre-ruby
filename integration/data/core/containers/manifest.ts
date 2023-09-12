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
import { getBuyerUserRegistrationPage } from '@/data/containers/BuyerUserRegistrationPage';
import { Settings } from '@/data/Settings';
import { getBuyerOrganizationRegistrationPage } from '@/data/containers/BuyerOrganizationRegistrationPage';
import { getB2BProductPage } from '@/data/containers/B2BProductPage';
import { getKitPage } from '@/data/containers/KitPage';
import { getBundlePage } from '@/data/containers/BundlePage';
import { getRequisitionListsPage } from '@/data/containers/RequisitionLists';
import { validateProtectedRoute } from '@/data/utils/validateProtectedRoute';
import { getRequisitionListDetailsPage } from '@/data/containers/RequisitionListDetails';
import { getRequisitionListsUploadLogsPage } from '@/data/containers/RequisitionListsUploadLogs';

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
	BundlePage: getBundlePage,
	LoginPage: getLoginPage,
	ProductListingPage: getProductListingPage,
	ProductPage: getProductPage,
	KitPage: getKitPage,
	RegistrationPage: getRegistrationPage,
	ResetPasswordPage: getResetPasswordPage,
	SearchPage: getSearchPage,
	WishListsPage: getWishListsPage,
	CheckoutProfilePage: getCheckoutProfilePage,
	RequisitionListsPage: getRequisitionListsPage,
	RequisitionListDetailsPage: getRequisitionListDetailsPage,
	RequisitionListsUploadLogsPage: getRequisitionListsUploadLogsPage,
	OrderConfirmationPage: getOrderConfirmationPage,
	OrderHistoryPage: getOrderHistoryPage,
	OrderDetailsPage: getOrderDetailsPage,
	SessionErrorPage: getSessionErrorPage,
	StoreLocatorPage: getStoreLocatorPage,
	CompareProductsPage: getCompareProductsPage,
	BuyerUserRegistrationPage: getBuyerUserRegistrationPage,
	BuyerOrganizationRegistrationPage: getBuyerOrganizationRegistrationPage,
	B2BProductPage: getB2BProductPage,
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
	RequisitionLists: 'RequisitionListsPage',
	RequisitionListDetails: 'RequisitionListDetailsPage',
	RequisitionListsUploadLogs: 'RequisitionListsUploadLogsPage',
	OrderHistory: 'OrderHistoryPage',
	OrderDetails: 'OrderDetailsPage',
	SessionError: 'SessionErrorPage',
	Cart: 'CartPage',
	CheckOut: 'CheckOutPage',
	OrderConfirmation: 'OrderConfirmationPage',
	StoreLocator: 'StoreLocatorPage',
	CompareProducts: 'CompareProductsPage',
	BuyerUserRegistration: 'BuyerUserRegistrationPage',
	BuyerOrganizationRegistration: 'BuyerOrganizationRegistrationPage',
	...dataRouteManifestCustom,
};

/**
 * Map of routes that are dependent on the user status for conditional
 * redirection or other protection.
 */
export const dataRouteProtection: Partial<
	Record<
		keyof LocalRoutes,
		(user: Partial<User>, cart?: Order, settings?: Settings) => RouteProtection
	>
> = {
	Account: (user) => validateProtectedRoute({ user }, 'login'),
	AddressBook: (user) => validateProtectedRoute({ user }, 'login'),
	Login: (user) => validateProtectedRoute({ user }, 'logout'),
	ForgotPassword: (user) => validateProtectedRoute({ user }, 'logout'),
	Registration: (user) => validateProtectedRoute({ user }, 'logout'),
	ResetPassword: (user) => validateProtectedRoute({ user }, 'logout'),
	WishLists: (user) => validateProtectedRoute({ user }, 'login'),
	CheckoutProfiles: (user) => validateProtectedRoute({ user }, 'login'),
	OrderHistory: (user) => validateProtectedRoute({ user }, 'login'),
	OrderDetails: (user) => validateProtectedRoute({ user }, 'login'),
	CheckOut: (_user, cart) => validateProtectedRoute({ cart }, 'cart'),
	BuyerUserRegistration: (_user, _cart, settings) => validateProtectedRoute({ settings }, 'b2b'),
	BuyerOrganizationRegistration: (_user, _cart, settings) =>
		validateProtectedRoute({ settings }, 'b2b'),
	RequisitionLists: (user, _cart, settings) =>
		validateProtectedRoute({ user, settings }, ['b2b', 'login']),
	RequisitionListDetails: (user, _cart, settings) =>
		validateProtectedRoute({ user, settings }, ['b2b', 'login']),
	RequisitionListsUploadLogs: (user, _cart, settings) =>
		validateProtectedRoute({ user, settings }, ['b2b', 'login']),
	...dataRouteProtectionCustom,
};
