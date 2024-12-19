/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { getAdmin_BuyerManagementAddBuyer } from '@/data/Content/Admin_BuyerManagementAddBuyer';
import { getAdmin_BuyerManagementBuyerDetails } from '@/data/Content/Admin_BuyerManagementBuyerDetails';
import { getAssociatedPromotion } from '@/data/Content/AssociatedPromotion';
import { getBreadcrumbTrail } from '@/data/Content/BreadcrumbTrail';
import { getBundleDetailsTable } from '@/data/Content/BundleDetailsTable-Server';
import { getBuyerOrganizationRegistration } from '@/data/Content/BuyerOrganizationRegistration';
import { getBuyerSelfRegistration } from '@/data/Content/BuyerSelfRegistration';
import { getCart } from '@/data/Content/Cart';
import { getCatalogEntryList } from '@/data/Content/CatalogEntryList';
import { getCatalogEntryRecommendation } from '@/data/Content/CatalogEntryRecommendation';
import { getCategoryRecommendation } from '@/data/Content/CategoryRecommendation';
import { getCheckOut } from '@/data/Content/CheckOut';
import { getChildCategoryGrid } from '@/data/Content/ChildCategoryGrid';
import { getCompareProducts } from '@/data/Content/CompareProducts';
import { getContentCarousel } from '@/data/Content/ContentCarousel';
import { getContentRecommendation } from '@/data/Content/ContentRecommendation';
import { getEMarketingSpot } from '@/data/Content/EMarketingSpot';
import { getFeaturedProductRecommendation } from '@/data/Content/FeaturedProductRecommendation';
import { getFooter } from '@/data/Content/Footer';
import { getForgotPassword } from '@/data/Content/ForgotPassword';
import { getHeader } from '@/data/Content/Header';
import { getLogin } from '@/data/Content/Login';
import { dataContentManifestCustom } from '@/data/Content/manifestCustom';
import { getMerchandisingAssociation } from '@/data/Content/MerchandisingAssociation';
import { getProductDetails } from '@/data/Content/ProductDetails';
import { getQuickOrder } from '@/data/Content/QuickOrder';
import { getRegistration } from '@/data/Content/Registration';
import { getRequisitionListDetails } from '@/data/Content/RequisitionListDetails';
import { getResetPassword } from '@/data/Content/ResetPassword';
import { getSkuListTable } from '@/data/Content/SkuListTable-Server';
import { ContentProps } from '@/data/types/ContentProps';

export const dataContentManifest: {
	[key: string]: (props: ContentProps) => Promise<any>;
} = {
	CheckOut: getCheckOut,
	Cart: getCart,
	Header: getHeader,
	Footer: getFooter,
	ContentRecommendation: getContentRecommendation,
	CategoryRecommendation: getCategoryRecommendation,
	FeaturedProductRecommendation: getFeaturedProductRecommendation,
	CatalogEntryRecommendation: getCatalogEntryRecommendation,
	ContentCarousel: getContentCarousel,
	BreadcrumbTrail: getBreadcrumbTrail,
	EMarketingSpot: getEMarketingSpot,
	ChildCategoryGrid: getChildCategoryGrid,
	CatalogEntryList: getCatalogEntryList,
	ProductDetails: getProductDetails,
	ProductInformation: getProductDetails,
	SkuList: getSkuListTable,
	Bundle: getBundleDetailsTable,
	Kit: getProductDetails,
	MerchandisingAssociation: getMerchandisingAssociation,
	CompareProducts: getCompareProducts,
	Register: getRegistration,
	Login: getLogin,
	AdminBuyerManagementEdit: getAdmin_BuyerManagementBuyerDetails,
	AdminBuyerManagementCreate: getAdmin_BuyerManagementAddBuyer,
	ForgotPassword: getForgotPassword,
	ResetPassword: getResetPassword,
	BuyerUserRegistration: getBuyerSelfRegistration,
	BuyerOrganizationRegistration: getBuyerOrganizationRegistration,
	RequisitionLists: getRequisitionListDetails,
	RequisitionListDetails: getRequisitionListDetails,
	RequisitionListsUploadLogs: getRequisitionListDetails,
	QuickOrder: getQuickOrder,
	AssociatedPromotion: getAssociatedPromotion,
	...dataContentManifestCustom,
};
