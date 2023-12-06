/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { Settings } from '@/data/Settings';
import { User } from '@/data/User';
import { getAccountPage } from '@/data/containers/AccountPage';
import { getAddressBookPage } from '@/data/containers/AddressBookPage';
import { getAdminApprovalsManagementPage } from '@/data/containers/AdminApprovalsManagementPage';
import { getAdminBuyerApprovalDetailsPage } from '@/data/containers/AdminBuyerApprovalDetailsPage';
import { getAdminBuyerManagementCreatePage } from '@/data/containers/AdminBuyerManagementCreatePage';
import { getAdminBuyerManagementEditPage } from '@/data/containers/AdminBuyerManagementEditPage';
import { getAdminBuyerManagementPage } from '@/data/containers/AdminBuyerManagementPage';
import { getAdminOrderApprovalDetailsPage } from '@/data/containers/AdminOrderApprovalDetailsPage';
import { getAdminOrganizationManagementCreatePage } from '@/data/containers/AdminOrganizationManagementCreatePage';
import { getAdminOrganizationManagementEditPage } from '@/data/containers/AdminOrganizationManagementEditPage';
import { getAdminOrganizationManagementPage } from '@/data/containers/AdminOrganizationManagementPage';
import { getB2BProductPage } from '@/data/containers/B2BProductPage';
import { getBundlePage } from '@/data/containers/BundlePage';
import { getBuyerOrganizationRegistrationPage } from '@/data/containers/BuyerOrganizationRegistrationPage';
import { getBuyerUserRegistrationPage } from '@/data/containers/BuyerUserRegistrationPage';
import { getCartPage } from '@/data/containers/CartPage';
import { getCategoryLandingPage } from '@/data/containers/CategoryLandingPage';
import { getCheckOutPage } from '@/data/containers/CheckOutPage';
import { getCheckoutProfilePage } from '@/data/containers/CheckoutProfilePage';
import { getCompareProductsPage } from '@/data/containers/CompareProductsPage';
import { getError404Page } from '@/data/containers/Error404Page';
import { getError500Page } from '@/data/containers/Error500Page';
import { getForgotPasswordPage } from '@/data/containers/ForgotPasswordPage';
import { getHomePage } from '@/data/containers/HomePage';
import { getKitPage } from '@/data/containers/KitPage';
import { getLoginPage } from '@/data/containers/LoginPage';
import { getOrderConfirmationPage } from '@/data/containers/OrderConfirmationPage';
import { getOrderDetailsPage } from '@/data/containers/OrderDetailsPage';
import { getOrderHistoryPage } from '@/data/containers/OrderHistoryPage';
import { getProductListingPage } from '@/data/containers/ProductListingPage';
import { getProductPage } from '@/data/containers/ProductPage';
import { getRecurringOrdersPage } from '@/data/containers/RecurringOrdersPage';
import { getRegistrationPage } from '@/data/containers/RegistrationPage';
import { getRequisitionListDetailsPage } from '@/data/containers/RequisitionListDetails';
import { getRequisitionListsPage } from '@/data/containers/RequisitionLists';
import { getRequisitionListsUploadLogsPage } from '@/data/containers/RequisitionListsUploadLogs';
import { getResetPasswordPage } from '@/data/containers/ResetPasswordPage';
import { getSearchPage } from '@/data/containers/SearchPage';
import { getSessionErrorPage } from '@/data/containers/SessionErrorPage';
import { getStoreLocatorPage } from '@/data/containers/StoreLocatorPage';
import { getWishListsPage } from '@/data/containers/WishListsPage';
import {
	dataContainerManifestCustom,
	dataRouteManifestCustom,
	dataRouteProtectionCustom,
} from '@/data/containers/manifestCustom';
import { IncomingContent } from '@/data/types/IncomingContent';
import { Layout } from '@/data/types/Layout';
import { Order } from '@/data/types/Order';
import { validateProtectedRoute } from '@/data/utils/validateProtectedRoute';
import { TranslationTable } from 'integration/generated/translations';

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
	RecurringOrdersPage: getRecurringOrdersPage,
	AdminApprovalsManagementPage: getAdminApprovalsManagementPage,
	AdminBuyerManagementPage: getAdminBuyerManagementPage,
	AdminBuyerManagementEditPage: getAdminBuyerManagementEditPage,
	AdminBuyerManagementCreatePage: getAdminBuyerManagementCreatePage,
	AdminOrganizationManagementPage: getAdminOrganizationManagementPage,
	AdminOrganizationManagementEditPage: getAdminOrganizationManagementEditPage,
	AdminOrganizationManagementCreatePage: getAdminOrganizationManagementCreatePage,
	AdminBuyerApprovalDetailsPage: getAdminBuyerApprovalDetailsPage,
	AdminOrderApprovalDetailsPage: getAdminOrderApprovalDetailsPage,
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
	RecurringOrders: 'RecurringOrdersPage',
	ApprovalsManagement: 'AdminApprovalsManagementPage',
	BuyerManagement: 'AdminBuyerManagementPage',
	BuyerManagementEdit: 'AdminBuyerManagementEditPage',
	BuyerManagementCreate: 'AdminBuyerManagementCreatePage',
	OrganizationManagement: 'AdminOrganizationManagementPage',
	OrganizationManagementCreate: 'AdminOrganizationManagementCreatePage',
	OrganizationManagementEdit: 'AdminOrganizationManagementEditPage',
	BuyerApprovalDetails: 'AdminBuyerApprovalDetailsPage',
	OrderApprovalDetails: 'AdminOrderApprovalDetailsPage',
	...dataRouteManifestCustom,
};

/**
 * Map of routes that are dependent on the user status for conditional
 * redirection or other protection.
 */
export const dataRouteProtection: Partial<
	Record<
		keyof LocalRoutes,
		(user: Partial<User>, _cart?: Order | boolean, settings?: Settings) => RouteProtection
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
	RecurringOrders: (user, _cart, settings) =>
		validateProtectedRoute({ user, settings }, ['b2b', 'login']),
	ApprovalsManagement: (user, _cart, settings) =>
		validateProtectedRoute({ user, settings }, ['b2b', 'login', 'buyerApprover']),
	BuyerManagement: (user, _cart, settings) =>
		validateProtectedRoute({ user, settings }, ['b2b', 'login', 'buyerAdmin']),
	BuyerManagementEdit: (user, _cart, settings) =>
		validateProtectedRoute({ user, settings }, ['b2b', 'login', 'buyerAdmin']),
	BuyerManagementCreate: (user, _cart, settings) =>
		validateProtectedRoute({ user, settings }, ['b2b', 'login', 'buyerAdmin']),
	OrganizationManagement: (user, _cart, settings) =>
		validateProtectedRoute({ user, settings }, ['b2b', 'login', 'buyerAdmin']),
	OrganizationManagementCreate: (user, _cart, settings) =>
		validateProtectedRoute({ user, settings }, ['b2b', 'login', 'buyerAdmin']),
	OrganizationManagementEdit: (user, _cart, settings) =>
		validateProtectedRoute({ user, settings }, ['b2b', 'login', 'buyerAdmin']),
	BuyerApprovalDetails: (user, _cart, settings) =>
		validateProtectedRoute({ user, settings }, ['b2b', 'login', 'buyerAdmin']),
	OrderApprovalDetails: (user, _cart, settings) =>
		validateProtectedRoute({ user, settings }, ['b2b', 'login', 'buyerApprover']),
	...dataRouteProtectionCustom,
};
