/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { getBreadcrumbTrail } from '@/data/Content/BreadcrumbTrail';
import { getCart } from '@/data/Content/Cart';
import { getCatalogEntryList } from '@/data/Content/CatalogEntryList';
import { getCatalogEntryRecommendation } from '@/data/Content/CatalogEntryRecommendation';
import { getContentCarousel } from '@/data/Content/ContentCarousel';
import { getCategoryRecommendation } from '@/data/Content/CategoryRecommendation';
import { getChildCategoryGrid } from '@/data/Content/ChildCategoryGrid';
import { getContentRecommendation } from '@/data/Content/ContentRecommendation';
import { getEMarketingSpot } from '@/data/Content/EMarketingSpot';
import { getFeaturedProductRecommendation } from '@/data/Content/FeaturedProductRecommendation';
import { getFooter } from '@/data/Content/Footer';
import { getHeader } from '@/data/Content/Header';
import { getCheckOut } from '@/data/Content/CheckOut';
import { dataContentManifestCustom } from '@/data/Content/manifestCustom';
import { getMerchandisingAssociation } from '@/data/Content/MerchandisingAssociation';
import { getProductDetails } from '@/data/Content/ProductDetails';
import { ContentProps } from '@/data/types/ContentProps';
import { getCompareProducts } from '@/data/Content/CompareProducts';
import { getRegistration } from '@/data/Content/Registration';
import { getLogin } from '@/data/Content/Login';
import { getForgotPassword } from '@/data/Content/ForgotPassword';
import { getResetPassword } from '@/data/Content/ResetPassword';

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
	MerchandisingAssociation: getMerchandisingAssociation,
	CompareProducts: getCompareProducts,
	Register: getRegistration,
	Login: getLogin,
	ForgotPassword: getForgotPassword,
	ResetPassword: getResetPassword,
	...dataContentManifestCustom,
};
