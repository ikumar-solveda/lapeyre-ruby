/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { contentManifestCustom } from '@/components/content/manifestCustom';
import { ID } from '@/data/types/Basic';
import { WidgetProperties } from '@/data/types/Slot';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

export const contentManifest: Record<
	string,
	ComponentType<{ id: ID; properties?: WidgetProperties }>
> = {
	Header: dynamic(() => import('@/components/content/Header').then((mod) => mod.Header)),
	Footer: dynamic(() => import('@/components/content/Footer').then((mod) => mod.Footer)),
	ContentRecommendation: dynamic(() =>
		import('@/components/content/ContentRecommendation').then((mod) => mod.ContentRecommendation)
	),
	CategoryRecommendation: dynamic(() =>
		import('@/components/content/CategoryRecommendation').then((mod) => mod.CategoryRecommendation)
	),
	FeaturedProductRecommendation: dynamic(() =>
		import('@/components/content/FeaturedProductRecommendation').then(
			(mod) => mod.FeaturedProductRecommendation
		)
	),
	CatalogEntryRecommendation: dynamic(() =>
		import('@/components/content/CatalogEntryRecommendation').then(
			(mod) => mod.CatalogEntryRecommendation
		)
	),
	ContentCarousel: dynamic(() =>
		import('@/components/content/ContentCarousel').then((mod) => mod.ContentCarousel)
	),
	FacetNavigation: dynamic(() =>
		import('@/components/content/FacetNavigation').then((mod) => mod.FacetNavigation)
	),
	CatalogEntryList: dynamic(() =>
		import('@/components/content/CatalogEntryList').then((mod) => mod.CatalogEntryList)
	),
	BreadcrumbTrail: dynamic(() =>
		import('@/components/content/BreadcrumbTrail').then((mod) => mod.BreadcrumbTrail)
	),
	EMarketingSpot: dynamic(() =>
		import('@/components/content/EMarketingSpot').then((mod) => mod.EMarketingSpot)
	),
	ChildCategoryGrid: dynamic(() =>
		import('@/components/content/ChildCategoryGrid').then((mod) => mod.ChildCategoryGrid)
	),
	ProductDetails: dynamic(() =>
		import('@/components/content/ProductDetails').then((mod) => mod.ProductDetails)
	),
	Bundle: dynamic(() => import('@/components/content/Bundle').then((mod) => mod.Bundle)),
	Kit: dynamic(() => import('@/components/content/Kit').then((mod) => mod.Kit)),
	MerchandisingAssociation: dynamic(() =>
		import('@/components/content/MerchandisingAssociation').then(
			(mod) => mod.MerchandisingAssociation
		)
	),
	Cart: dynamic(() => import('@/components/content/Cart').then((mod) => mod.Cart)),
	Login: dynamic(() => import('@/components/content/Login').then((mod) => mod.Login)),
	Register: dynamic(() => import('@/components/content/Register').then((mod) => mod.Register)),
	ForgotPassword: dynamic(() =>
		import('@/components/content/ForgotPassword').then((mod) => mod.ForgotPassword)
	),
	ResetPassword: dynamic(() =>
		import('@/components/content/ResetPassword').then((mod) => mod.ResetPassword)
	),
	CheckOut: dynamic(() => import('@/components/content/CheckOutV2').then((mod) => mod.CheckOutV2)),
	Account: dynamic(() => import('@/components/content/Account').then((mod) => mod.Account)),
	StoreLocator: dynamic(() =>
		import('@/components/content/StoreLocator').then((mod) => mod.StoreLocator)
	),
	AddressBook: dynamic(() =>
		import('@/components/content/AddressBook').then((mod) => mod.AddressBook)
	),
	WishLists: dynamic(() => import('@/components/content/WishLists').then((mod) => mod.WishLists)),
	CheckoutProfiles: dynamic(() =>
		import('@/components/content/CheckoutProfiles').then((mod) => mod.CheckoutProfiles)
	),
	RequisitionLists: dynamic(() =>
		import('@/components/content/RequisitionLists').then((mod) => mod.RequisitionLists)
	),
	AccountSidebar: dynamic(() =>
		import('@/components/content/AccountSidebar').then((mod) => mod.AccountSidebar)
	),
	OrderConfirmation: dynamic(() =>
		import('@/components/content/OrderConfirmation').then((mod) => mod.OrderConfirmation)
	),
	OrderHistory: dynamic(() =>
		import('@/components/content/OrderHistory').then((mod) => mod.OrderHistory)
	),
	OrderHistoryDetails: dynamic(() =>
		import('@/components/content/OrderHistoryDetails').then((mod) => mod.OrderHistoryDetails)
	),
	CompareProducts: dynamic(() =>
		import('@/components/content/CompareProducts').then((mod) => mod.CompareProducts)
	),
	SessionError: dynamic(() =>
		import('@/components/content/SessionError').then((mod) => mod.SessionError)
	),
	Error404: dynamic(() => import('@/components/content/Error404').then((mod) => mod.Error404)),
	Error500: dynamic(() => import('@/components/content/Error500').then((mod) => mod.Error500)),
	BuyerUserRegistration: dynamic(() =>
		import('@/components/content/BuyerUserRegistration').then((mod) => mod.BuyerUserRegistration)
	),
	BuyerOrganizationRegistration: dynamic(() =>
		import('@/components/content/BuyerOrganizationRegistration').then(
			(mod) => mod.BuyerOrganizationRegistration
		)
	),
	ProductInformation: dynamic(() =>
		import('@/components/content/ProductInformation').then((mod) => mod.ProductInformation)
	),
	AttributeFilter: dynamic(() =>
		import('@/components/content/AttributeFilter').then((mod) => mod.AttributeFilter)
	),
	SkuList: dynamic(() => import('@/components/content/SkuList').then((mod) => mod.SkuList)),
	RequisitionListsTable: dynamic(() =>
		import('@/components/content/RequisitionListsTable').then((mod) => mod.RequisitionListsTable)
	),
	RequisitionListDetails: dynamic(() =>
		import('@/components/content/RequisitionListDetails').then((mod) => mod.RequisitionListDetails)
	),
	RequisitionListsUploadLogs: dynamic(() =>
		import('@/components/content/RequisitionListsUploadLogs').then(
			(mod) => mod.RequisitionListsUploadLogs
		)
	),
	RecurringOrders: dynamic(() =>
		import('@/components/content/RecurringOrders').then((mod) => mod.RecurringOrders)
	),
	AdminApprovalsManagement: dynamic(() =>
		import('@/components/content/AdminApprovalsManagement').then(
			(mod) => mod.AdminApprovalsManagement
		)
	),
	AdminBuyerManagementEdit: dynamic(() =>
		import('@/components/content/AdminBuyerManagement/BuyerDetails').then(
			(mod) => mod.AdminBuyerManagementBuyerDetails
		)
	),
	AdminBuyerManagementCreate: dynamic(() =>
		import('@/components/content/AdminBuyerManagement/AddBuyer').then(
			(mod) => mod.AdminBuyerManagementAddBuyer
		)
	),
	AdminBuyerManagement: dynamic(() =>
		import('@/components/content/AdminBuyerManagement').then((mod) => mod.AdminBuyerManagement)
	),
	AdminOrganizationManagement: dynamic(() =>
		import('@/components/content/AdminOrganizationManagement').then(
			(mod) => mod.AdminOrganizationManagement
		)
	),
	AdminOrganizationManagementCreate: dynamic(() =>
		import('@/components/content/AdminOrganizationManagement/Create').then(
			(mod) => mod.AdminOrganizationManagementCreate
		)
	),
	AdminOrganizationManagementEdit: dynamic(() =>
		import('@/components/content/AdminOrganizationManagement/Edit').then(
			(mod) => mod.AdminOrganizationManagementEdit
		)
	),
	AdminBuyerApprovalDetails: dynamic(() =>
		import('@/components/content/AdminBuyerApprovalDetails').then(
			(mod) => mod.AdminBuyerApprovalDetails
		)
	),
	AdminOrderApprovalDetails: dynamic(() =>
		import('@/components/content/AdminOrderApprovalDetails').then(
			(mod) => mod.AdminOrderApprovalDetails
		)
	),
	QuickOrder: dynamic(() =>
		import('@/components/content/QuickOrder').then((mod) => mod.QuickOrder)
	),
	...contentManifestCustom,
};
