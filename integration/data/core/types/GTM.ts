/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { Settings } from '@/data/Settings';
import { CategoryType } from '@/data/types/Category';
import { ESpotActivityContainer } from '@/data/types/Marketing';
import { Order } from '@/data/types/Order';
import { ProductType, Selection } from '@/data/types/Product';

export type GTMCartViewContextData = {
	product: ProductType;
	category: CategoryType;
};

type GTMCartAndCatalogContextData = {
	cart: Order;
	contextData: Record<string, GTMCartViewContextData>;
};

export type GTMAddToCartPayload = {
	selection: Selection;
	category?: CategoryType;
	quantity: number;
	orgName: string;
	orgId: string;
	storeName: string;
	settings: Settings;
};

export type GTMProductViewPayload = {
	product: ProductType;
	listerFlag?: boolean;
	storeName: string;
	settings: Settings;
};

export type GTMProductClickPayload = {
	product: ProductType;
	listerFlag: boolean;
	storeName: string;
	settings: Settings;
	listName?: string;
	listId?: string;
};

export type GTMCheckoutPayload = GTMCartAndCatalogContextData & {
	orgName: string;
	orgId: string;
	storeName: string;
	settings: Settings;
};

export type GTMPromotionClickPayload = {
	activity: Required<ESpotActivityContainer>;
	type: 'product' | 'category' | 'content';
	position?: string;
	settings: Settings;
};

export type GTMRecommendationCatalogEntry = {
	item_id: string;
	item_name: string;
};

export type GTMPromotionViewPayload = {
	activity: Required<ESpotActivityContainer>;
	position?: string;
	settings: Settings;
};

export type GTMSearchResultsViewPayload = {
	searchTerm: string;
	numberOfResults: number;
	settings: Settings;
};

export type GTMItemListViewPayload = {
	products: ProductType[];
	listPageName: string;
	listId?: string;
	storeName: string;
	settings: Settings;
};

export type GTMCartPageViewPayload = {
	pagePath: string;
	isLoggedIn: boolean;
	userId: string;
	orgName: string;
	orgId: string;
	storeName: string;
	pageSubCategory?: string;
	listerResults?: string;
	settings: Settings;
};

export type GTMCartViewPayload = GTMCartAndCatalogContextData & {
	orgName: string;
	orgId: string;
	storeName: string;
	settings: Settings;
};

export type GTMRemoveFromCartPayload = {
	partNumber: string;
	name: string;
	currency: string;
	price: string;
	quantity: string;
	sellerId: string;
	seller: string;
	orgName: string;
	orgId: string;
	storeName: string;
	settings: Settings;
};

export type GTMCheckoutPageViewPayload = GTMCartAndCatalogContextData & {
	pagePath: string;
	pageTitle?: string;
	isLoggedIn: boolean;
	userId: string;
	storeName: string;
	orgName: string;
	orgId: string;
	pageSubCategory?: string;
	listerResults?: string;
	settings: Settings;
};

export type GTMPurchasePayload = GTMCartAndCatalogContextData & {
	orgName: string;
	orgId: string;
	storeName: string;
	settings: Settings;
};

export type GTMContainerListType = {
	productListData: {
		listId?: string;
		listName?: string;
	};
};
