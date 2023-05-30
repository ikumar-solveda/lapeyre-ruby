/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SellerInfo } from '@/data/types/Product';
import { FC } from 'react';

type Props = {
	sellerInfo: SellerInfo;
};
export const SellerLink: FC<Props> = (props: Props) => {
	const { sellerInfo } = props;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { name: label, id: seller } = sellerInfo ?? {};

	/*
	// TODO: implement
	const { breadcrumbs } = useBreadcrumbTrail();
	const category = breadcrumbs?.at(-2);
	const categoryId = category ? Number(category.value) : undefined;
	*/

	return null;
};
