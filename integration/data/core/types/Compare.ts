/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ID } from '@/data/types/Basic';
import { ProductType, ResponseProductAttribute } from '@/data/types/Product';

export type Edge = {
	width: string;
	left: string;
};

export type ComparePriceProps = {
	product: ProductType;
};

export type CompareCheckObj = {
	product: ProductType;
	seq: number;
};

export type CompareData = {
	max: number;
	disabled: boolean;
	checked: Record<string, CompareCheckObj>;
	storage: ProductType[];
	len: number;
	counter: number;
	pageId?: ID; // page that loaded the collector -- either categoryId or empty when searchTerm
};

export type CompareProductsData = {
	compareData: CompareData;
	initialized?: boolean;
};

export type CompareAttribute = {
	identifier: string;
	name: string;
	sequence: string;
};

export type ProductWithAttrMap = ProductType & {
	attrMap: Record<string, ResponseProductAttribute>;
};
