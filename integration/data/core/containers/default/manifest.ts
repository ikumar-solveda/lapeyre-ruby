/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import B2BProductPage from '@/data/containers/default/B2BProductPage';
import BundlePage from '@/data/containers/default/BundlePage';
import CartPage from '@/data/containers/default/CartPage';
import CategoryLandingPage from '@/data/containers/default/CategoryLandingPage';
import CheckOutPage from '@/data/containers/default/CheckOutPage';
import HomePage from '@/data/containers/default/HomePage';
import KitPage from '@/data/containers/default/KitPage';
import OrderConfirmationPage from '@/data/containers/default/OrderConfirmationPage';
import PrivacyPolicyPage from '@/data/containers/default/PrivacyPolicyPage';
import ProductListingPage from '@/data/containers/default/ProductListingPage';
import ProductPage from '@/data/containers/default/ProductPage';
import SearchPage from '@/data/containers/default/SearchPage';
import { defaultContainerLayoutManifestCustom } from '@/data/containers/default/manifestCustom';
import { DefaultContainerLayout } from '@/data/types/ContainerLayout';

export const defaultContainerLayoutManifest: {
	[pageType: string]: DefaultContainerLayout;
} = {
	CheckOutPage,
	OrderConfirmationPage,
	CartPage,
	CategoryPage: CategoryLandingPage,
	ProductListPage: ProductListingPage,
	SearchPage,
	HomePage,
	ProductPage,
	VariantPage: ProductPage,
	ItemPage: ProductPage,
	KitPage,
	BundlePage,
	B2BProductPage,
	PrivacyPolicyPage,
	...defaultContainerLayoutManifestCustom,
};
